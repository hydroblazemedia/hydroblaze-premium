
# Track CTA Source in Contact Form Submissions

## Overview
Modify the contact dialog system to accept a `source` parameter identifying which CTA button triggered it. This source will be included in both the WhatsApp message and the Google Sheets submission.

## Code Changes

### 1. Update `src/components/ContactFormDialog.tsx`
- Change the context type from `{ open: () => void }` to `{ open: (source?: string) => void }`
- Update the `open` callback to accept and store a `source` string in component state
- Include the source in the WhatsApp message text (e.g., "Source: Ignite Your Brand")
- Include the source in the Google Sheets POST body
- Add a "Source" column to the Google Sheet schema (Timestamp | Name | Email | Phone | Message | Source)

### 2. Update CTA callers to pass source labels

- **`src/components/Hero.tsx`**: `open("Ignite Your Brand")`
- **`src/components/Navbar.tsx`**: `openContact("Start Project")` (both desktop and mobile)
- **`src/components/PricingSection.tsx`**: `open("Get Started - Pricing")`
- **`src/components/ServicesSection.tsx`**: `open("Book a Discovery Call")`

### 3. Google Apps Script update
- The Apps Script will read the `source` field from the POST body and write it to a dedicated column in the sheet

## Files Modified
- `src/components/ContactFormDialog.tsx` -- add `source` state + include in submissions
- `src/components/Hero.tsx` -- pass source string
- `src/components/Navbar.tsx` -- pass source string
- `src/components/PricingSection.tsx` -- pass source string
- `src/components/ServicesSection.tsx` -- pass source string
