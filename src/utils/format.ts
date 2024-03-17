import { countDigits } from './number';

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const formatEllipsisTxt = (str?: string, n: number = 6): string => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return '';
};

export const formatTimestamp = (timestamp: number) => {
  const defaultNum = countDigits(timestamp);
  if (defaultNum !== 10 && defaultNum !== 13) {
    return '';
  }

  if (countDigits(timestamp) === 10) {
    timestamp = timestamp * 1000;
  }

  const date = new Date(timestamp);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`.toString();
};
