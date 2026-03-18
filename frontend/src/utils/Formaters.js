export const formatLatency = (latency) => {
  if (!latency) return "0 ms";
  // if in seconds (e.g. 0.2)
  if (latency < 10) {
    return `${(latency * 1000).toFixed(0)} ms`;
  }
  // already in ms
  return `${latency.toFixed(0)} ms`;
};

export const formatSuccessRate = (rate) => {
    const num = parseFloat(rate);
  if (isNaN(num)) return "0%";
  // if 0.98 is type value
  if (num <= 1) {
    return `${(num * 100).toFixed(1)}%`;
  }
  // if already percent 
  return `${num.toFixed(1)}%`;
};