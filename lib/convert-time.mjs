export default (timeStr) => {
  if (timeStr === undefined) { return { ms: 43200000, text: '12h 0m' }; }
  const t = timeStr.split(/h|m/);
  const hours = parseInt(t[0], 10);
  const minutes = parseInt(t[1], 10);
  return { ms: 3600000 * hours + 60000 * minutes, text: `${hours}h ${minutes}m` };
};
