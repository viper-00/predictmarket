export const countDigits = (number: number): number => {
  const numberString = Math.abs(number).toString();
  const digitCount = numberString.length;
  return digitCount;
};

export const addition = (arg1: number | string, arg2: number | string): number => {
  try {
    const arg1Fractional = String(arg1).split('.')[1];
    const arg2Fractional = String(arg2).split('.')[1];
    const arg1Length = (arg1Fractional && arg1Fractional.length) || 0;
    const arg2Length = (arg2Fractional && arg2Fractional.length) || 0;
    const expandedMultiplier = Math.pow(10, Math.max(arg1Length, arg2Length));
    return (multiply(arg1, expandedMultiplier) + multiply(arg2, expandedMultiplier)) / expandedMultiplier;
  } catch (e) {
    return NaN;
  }
};

export const subtraction = (arg1: number | string, arg2: number | string): number => {
  try {
    const arg1Fractional = String(arg1).split('.')[1];
    const arg2Fractional = String(arg2).split('.')[1];
    const arg1Length = (arg1Fractional && arg1Fractional.length) || 0;
    const arg2Length = (arg2Fractional && arg2Fractional.length) || 0;
    const expandedMultiplier = Math.pow(10, Math.max(arg1Length, arg2Length));
    return (multiply(arg1, expandedMultiplier) - multiply(arg2, expandedMultiplier)) / expandedMultiplier;
  } catch (e) {
    return NaN;
  }
};

export const multiply = (arg1: number | string, arg2: number | string): number => {
  let m = 0;
  try {
    const arg1Fractional = String(arg1).split('.')[1];
    const arg2Fractional = String(arg2).split('.')[1];
    m += (arg1Fractional && arg1Fractional.length) || 0;
    m += (arg2Fractional && arg2Fractional.length) || 0;
  } catch (e) {
    return NaN;
  }
  return (Number(String(arg1).replace('.', '')) * Number(String(arg2).replace('.', ''))) / Math.pow(10, m);
};

export const division = (arg1: number | string, arg2: number | string): number => {
  try {
    const arg1Fractional = String(arg1).split('.')[1];
    const arg2Fractional = String(arg2).split('.')[1];
    const arg1Length = (arg1Fractional && arg1Fractional.length) || 0;
    const arg2Length = (arg2Fractional && arg2Fractional.length) || 0;
    const differenceMultiple = Math.pow(10, arg2Length - arg1Length);
    return multiply(Number(String(arg1).replace('.', '')) / Number(String(arg2).replace('.', '')), differenceMultiple);
  } catch (e) {
    return NaN;
  }
};
