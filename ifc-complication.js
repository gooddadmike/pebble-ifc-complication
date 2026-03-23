// ifc-complication.js
// Reusable International Fixed Calendar widget for Pebble watchfaces
// Usage: const ifc = require('pebble-ifc-complication');
//        textLayer.text = ifc.update();
//        textLayer.text = ifc.update('2024-06-17');

const { toIFC } = require('@gooddadmike/ifc-js');

const IFC_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Sol',
                   'Jul','Aug','Sep','Oct','Nov','Dec'];
const WEEKDAYS  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/**
 * Returns an IFC date as a watch-friendly string.
 * @param {string} [date] - ISO date string e.g. '2024-06-17'. Omit for today.
 * @returns {string} e.g. "Mar 1 Sun", "Jun 29 LPD", "Dec 29 YRD"
 */
function update(date) {
  const ifc = toIFC(date);

  if (ifc.isLeapDay) return 'Jun 29 LPD';
  if (ifc.isYearDay) return 'Dec 29 YRD';

  const month   = IFC_SHORT[ifc.month - 1];
  const weekday = WEEKDAYS[ifc.weekday];
  return `${month} ${ifc.day} ${weekday}`;
}

module.exports = { update };

