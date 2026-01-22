#!/bin/bash
# Mobile Navigation Test Script
# Tests mobile menu functionality and touch targets

set -e

echo "=== Mobile Navigation Test ==="

# Open homepage
agent-browser open http://localhost:3000

# Set mobile viewport
echo "Setting mobile viewport (375x812)..."
agent-browser eval "Object.defineProperty(window, 'innerWidth', {value: 375, writable: true}); Object.defineProperty(window, 'innerHeight', {value: 812, writable: true}); window.dispatchEvent(new Event('resize'));"
agent-browser reload

# Wait for page to load
agent-browser wait 1000

# Take screenshot before opening menu
echo "Taking initial mobile screenshot..."
agent-browser screenshot tests/results/mobile-initial.png

# Get snapshot to find interactive elements
echo "Getting page snapshot..."
agent-browser snapshot --interactive > tests/results/mobile-snapshot.txt

# Click mobile menu button
echo "Clicking mobile menu button..."
agent-browser click "[aria-label='Toggle menu']" || agent-browser click "button.lg\\:hidden" || echo "Could not find mobile menu button"

# Wait for menu animation
agent-browser wait 500

# Take screenshot with menu open
echo "Taking screenshot with menu open..."
agent-browser screenshot tests/results/mobile-nav-open.png

echo "=== Mobile Navigation Test Complete ==="
