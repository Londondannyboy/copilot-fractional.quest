import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// OpenAI-compatible CLM endpoint for Hume EVI
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    // Get the last user message
    const userMessage = messages.filter((m: any) => m.role === 'user').pop();
    const query = userMessage?.content?.toLowerCase() || '';

    console.log('[CLM] Received:', query);

    // Extract role type from query
    let roleFilter = '';
    if (query.includes('cto') || query.includes('technology') || query.includes('tech')) {
      roleFilter = 'CTO';
    } else if (query.includes('cfo') || query.includes('finance') || query.includes('financial')) {
      roleFilter = 'CFO';
    } else if (query.includes('cmo') || query.includes('marketing')) {
      roleFilter = 'CMO';
    } else if (query.includes('coo') || query.includes('operations')) {
      roleFilter = 'COO';
    } else if (query.includes('chro') || query.includes('hr') || query.includes('people')) {
      roleFilter = 'CHRO';
    }

    let response = '';

    if (roleFilter || query.includes('job') || query.includes('role') || query.includes('position')) {
      // Search for jobs
      const jobs = roleFilter
        ? await sql`SELECT title, company, location, salary_min, salary_max, description FROM test_jobs WHERE role_type ILIKE ${`%${roleFilter}%`} OR title ILIKE ${`%${roleFilter}%`} LIMIT 5`
        : await sql`SELECT title, company, location, salary_min, salary_max, description FROM test_jobs LIMIT 5`;

      console.log('[CLM] Found jobs:', jobs.length);

      if (jobs.length > 0) {
        response = `I found ${jobs.length} ${roleFilter || 'fractional executive'} positions:\n\n`;
        jobs.forEach((job: any, i: number) => {
          const salary = job.salary_min && job.salary_max
            ? `£${Math.round(job.salary_min/1000)}k-£${Math.round(job.salary_max/1000)}k`
            : '';
          response += `${i + 1}. ${job.title} at ${job.company} in ${job.location}. ${salary ? `Salary: ${salary}.` : ''} ${job.description?.slice(0, 100) || ''}\n\n`;
        });
        response += 'Would you like more details on any of these positions?';
      } else {
        response = `I don't have any ${roleFilter || ''} jobs matching that criteria right now. Would you like me to search for something else?`;
      }
    } else if (query.includes('market') || query.includes('stats') || query.includes('overview')) {
      // Market stats
      const stats = await sql`SELECT role_type, COUNT(*) as count FROM test_jobs GROUP BY role_type ORDER BY count DESC`;
      const total = await sql`SELECT COUNT(*) as total FROM test_jobs`;

      response = `Here's the current market overview. We have ${total[0]?.total || 0} active fractional executive positions. `;
      response += `By role type: ${stats.map((s: any) => `${s.count} ${s.role_type}`).join(', ')}. `;
      response += 'What role are you interested in?';
    } else {
      // Default greeting
      response = `Hello! I'm your fractional executive job assistant. I can help you find CTO, CFO, CMO, COO, and CHRO positions. What type of role are you looking for?`;
    }

    // Return OpenAI-compatible response
    return NextResponse.json({
      id: `chatcmpl-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: 'fractional-clm',
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: response
        },
        finish_reason: 'stop'
      }],
      usage: {
        prompt_tokens: query.length,
        completion_tokens: response.length,
        total_tokens: query.length + response.length
      }
    });

  } catch (error: any) {
    console.error('[CLM] Error:', error);
    return NextResponse.json({
      id: `chatcmpl-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: 'fractional-clm',
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: 'I apologize, I encountered an error searching for jobs. Could you try again?'
        },
        finish_reason: 'stop'
      }]
    });
  }
}
