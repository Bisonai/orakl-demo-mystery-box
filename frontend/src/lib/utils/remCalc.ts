/**
 * Converts pixel size to rem and accepts the base as second argument. default base is 16px
 *
 * @param {number|string} px
 * @param {number} base
 * @return {string}
 */
const remCalc = (px: number | string, base: number = 16): string => {
  let tempPx = px;
  if (typeof tempPx === 'string') {
    tempPx = tempPx.replace('px', '');
    tempPx = parseInt(tempPx);
  }
  return (1 / base) * tempPx + 'rem';
};

export default remCalc;
