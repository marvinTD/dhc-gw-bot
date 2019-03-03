function convertToMs(timeStr) {
  if (timeStr === undefined) { return { ms: 43200000, text: '12h 0m' }; }

  let hours;
  let minutes;
  const t = timeStr.split(/h|m/);
  if (timeStr.includes('h')) {
    hours = parseInt(t[0], 10) || 0;
    minutes = parseInt(t[1], 10) || 0;
  } else {
    hours = 0;
    minutes = parseInt(t[0], 10);
  }
  return { ms: 3600000 * hours + 60000 * minutes, text: `${hours}h ${minutes}m` };
}
function msToTime(duration) {
  let seconds = parseInt((duration / 1000) % 60, 10);
  let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${hours}h:${minutes}m:${seconds}s`;
}

export default { convertToMs, msToTime };
