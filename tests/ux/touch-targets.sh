#!/bin/bash
# Touch Target Verification Script
# Checks that all interactive elements meet 44x44px minimum

set -e

echo "=== Touch Target Verification ==="

# Open homepage
agent-browser open http://localhost:3000

# Set mobile viewport
echo "Setting mobile viewport..."
agent-browser eval "Object.defineProperty(window, 'innerWidth', {value: 375, writable: true}); Object.defineProperty(window, 'innerHeight', {value: 812, writable: true}); window.dispatchEvent(new Event('resize'));"
agent-browser reload
agent-browser wait 1000

# Check touch targets
echo "Checking touch target sizes..."
agent-browser eval "
const elements = document.querySelectorAll('button, a, [role=button], input, select');
const smallTargets = [];
elements.forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
    smallTargets.push({
      tag: el.tagName,
      class: el.className.substring(0, 50),
      text: (el.textContent || '').substring(0, 30),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    });
  }
});
console.log('=== Small Touch Targets (' + smallTargets.length + ' found) ===');
smallTargets.slice(0, 20).forEach(t => {
  console.log(t.tag + ' [' + t.width + 'x' + t.height + '] ' + t.text);
});
if (smallTargets.length > 20) console.log('... and ' + (smallTargets.length - 20) + ' more');
"

echo "=== Touch Target Verification Complete ==="
