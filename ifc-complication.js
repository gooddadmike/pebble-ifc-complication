// ifc-complication.js
// Reusable International Fixed Calendar widget for Pebble watchfaces
// Usage: const ifc = require('pebble-ifc-complication');
//       textLayer.text = ifc.update({ useUTC: true });

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Sol', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Calculates the current IFC date and returns a formatted string.
 * @param {Object} [config] - Optional config
 * @param {boolean} [config.useUTC=false] - Use UTC time for date calculation
 * @returns {string} Formatted IFC date, e.g. "Mar 1 Sun" or "Jun 29 LPD"
 */
function update(config = {}) {
  const { useUTC = false } = config;

  const now = new Date();
  const date = useUTC ? new Date(now.toUTCString()) : now;

  const year = date.getFullYear();
  const isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

  // Day of year: Jan 1 = 1
  const doy = Math.round((date - new Date(year, 0, 1)) / 86400000) + 1;

  // Special days
  if (isLeap && doy === 169) {
    return 'Jun 29 LPD';
  }
  if (doy === (isLeap ? 366 : 365)) {
    return 'Dec 29 YRD';
  }

  // Normal days – offset after Leap Day
  const adjDoy = isLeap && doy > 169 ? doy - 1 : doy;

  const monthIndex = Math.floor((adjDoy - 1) / 28);
  const dayOfMonth = (adjDoy - 1) % 28 + 1;

  const month = months[monthIndex];
  const weekdayNum = ((dayOfMonth - 1) % 7) + 1;
  const weekday = weekdays[weekdayNum - 1];

  return `${month} ${dayOfMonth} ${weekday}`;
}

module.exports = { update };
