#!/bin/bash
# Content Reflow Test Script
# Tests responsive layout at different viewports

set -e

echo "=== Content Reflow Test ==="

# Test page (can be overridden with argument)
PAGE=${1:-"http://localhost:3000/fractional-jobs-uk"}

# Open page
agent-browser open "$PAGE"
agent-browser wait 1000

# Desktop (1440px)
echo "Testing desktop viewport (1440px)..."
agent-browser eval "Object.defineProperty(window, 'innerWidth', {value: 1440, writable: true}); window.dispatchEvent(new Event('resize'));"
agent-browser reload
agent-browser wait 1000
agent-browser screenshot tests/results/reflow-desktop.png

# Tablet (768px)
echo "Testing tablet viewport (768px)..."
agent-browser eval "Object.defineProperty(window, 'innerWidth', {value: 768, writable: true}); window.dispatchEvent(new Event('resize'));"
agent-browser reload
agent-browser wait 1000
agent-browser screenshot tests/results/reflow-tablet.png

# Mobile (375px)
echo "Testing mobile viewport (375px)..."
agent-browser eval "Object.defineProperty(window, 'innerWidth', {value: 375, writable: true}); window.dispatchEvent(new Event('resize'));"
agent-browser reload
agent-browser wait 1000
agent-browser screenshot tests/results/reflow-mobile.png

# Check for horizontal overflow
echo "Checking for horizontal overflow..."
agent-browser eval "
const hasOverflow = document.body.scrollWidth > window.innerWidth;
if (hasOverflow) {
  console.log('WARNING: Horizontal overflow detected!');
  console.log('Body width: ' + document.body.scrollWidth + 'px');
  console.log('Window width: ' + window.innerWidth + 'px');
} else {
  console.log('No horizontal overflow detected.');
}
"

echo "=== Content Reflow Test Complete ==="
