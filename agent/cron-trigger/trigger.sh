#!/bin/sh
# Daily import trigger for fractional.quest
# This script is run by Railway cron and calls the import endpoint

echo "=== Fractional Quest Daily Import ==="
echo "Time: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
echo ""

# Call the combined import endpoint (jobs + news)
echo "Triggering import..."
RESPONSE=$(curl -s -X POST "https://agent.fractional.quest/import/daily" \
  -H "Content-Type: application/json" \
  --max-time 300)

echo "Response:"
echo "$RESPONSE"

# Check if successful
if echo "$RESPONSE" | grep -q '"status":"completed"'; then
  echo ""
  echo "Import completed successfully!"
  exit 0
else
  echo ""
  echo "Import may have failed - check logs"
  exit 1
fi
