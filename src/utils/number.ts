export const countDigits = (number: number): number => {
  const numberString = Math.abs(number).toString();
  const digitCount = numberString.length;
  return digitCount;
};
