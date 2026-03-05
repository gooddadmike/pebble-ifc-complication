# pebble-ifc-complication

A lightweight, reusable International Fixed Calendar (IFC) widget / complication for Pebble watchfaces.

This package provides a simple `update()` function that returns the current IFC date as a short string, ready to display in a text layer (e.g., "Mar 1 Sun" or "Jun 29 LPD").

Published as a [Pebble Package](https://developer.repebble.com/guides/pebble-packages/using-packages/) so watchface developers can easily integrate it with:

```bash
pebble package install pebble-ifc-complication
```

## Features

 - Accurate International Fixed Calendar calculation
 - Handles leap years and Year Day / Leap Day correctly
 - Option to use UTC time for global sync (date rollover at 00:00 UTC)
 - Short, watch-friendly output strings
 - No dependencies — pure JavaScript, tiny footprint

## International Fixed Calendar Rules (Important – Do Not Change Lightly)

This implementation follows the standard Cotsworth/Eastman IFC rules:

 - 13 months × 28 days = 364 days base
 - Months: Jan, Feb, Mar, Apr, May, Jun, Sol, Jul, Aug, Sep, Oct, Nov, Dec
 - Every month starts on Sunday and ends on Saturday (perpetual calendar)
 - Leap Day: Inserted as an extra day after June 28 (in leap years only) — shown as "Jun 29 LPD"
 - Year Day: Extra day after December 28 — shown as "Dec 29 YRD"
 - Both Leap Day and Year Day have no weekday (they are holidays outside the week)
 - Leap year rule: same as Gregorian (div by 4, but not 100 unless 400)
 - Day numbering: normal days 1–28 per month; specials are "29" visually for calendar flow

### Why 3-character codes for specials (LPD / YRD)?

 - Most Pebble watchfaces render complications in very small text areas.
 - Weekdays are almost always abbreviated to 3 letters ("Sun", "Mon", "Tue", etc.) to avoid ambiguity (T = Tue or Thu? S = Sat or Sun?).
 - Using "LPD" (Leap Day) and "YRD" (Year Day) keeps the same 3-character width and visual rhythm — it looks like a weekday abbreviation but clearly isn't.
 - This prevents layout breaks when the complication is placed where a normal weekday would go.
 - One-letter ("L"/"Y") or two-letter ("LD"/"YD") options may exist in some watchfaces but are less common and can cause alignment issues.
 - Do not change the output format to full words ("Leap Day", "Year Day") without a config option — it will break many faces. If someone wants longer text, they can fork or wrap the output.

## Installation

```bash
pebble package install pebble-ifc-complication
```

## Usage

```JavaScript
const ifc = require('pebble-ifc-complication')

// Basic Usage (local time)
var ifcText = ifc.update();    // e.g. "Mar 1 Sun"

// With UTC for global sync
var ifcTextUTC = ifc.update({ useUTC: true });   // date calculated from UTC

// In a tick handler (example)
watch.addEventListener('minutechange', function(e) {
  textLayer.text = ifc.update({ useUTC: false });
});
```

## Output Examples

| Date (Gregorian) | IFC Output | Notes                |
| ---------------- | ---------- | -------------------- |
| 2026-02-27       | Mar 1 Sun  | Normal Day           |
| 2024-06-28       | Jun 28 Sat | Last day of June     |
| 2024-06-29       | Jun 29 LPD | Leap Day (leap year) |
| 2024-06-30       | Sol 1 Sun  | First day of Sol     |
| 2024-12-31       | Dec 29 YRD | Year Day             |

## Testing the Package Locally

 1. In your package folder: `npm link`
 2. In a test CloudPebble watchface project:
 ```bash
pebble package install pebble-ifc-complication
 ```
 3. Require and call in your code (as shown above).
 4. Build and run in emulator to verify output on real dates (try 2024-06-29 for Leap Day)

## Contributing

 - Keep output to *short strings* (3-char weekdays or LPD/YRD)
 - Do not alter the core IFC rules (month order, leap insertion, Sunday starts, etc.) as they are standard and intentional.
 - Add new config options (e.g., { format: 'long' }) instead of breaking the default.
 - PRs welcome for bug fixes, better error handling, or more config flags.

## License

MIT
