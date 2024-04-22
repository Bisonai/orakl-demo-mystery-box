import remCalc from './remCalc';

const MOBILE_DESIGN_WIDTH = 340;

export const scaleMobile = (
  elementWidth: number,
  actualScreenWidth?: number,
) => {
  return (
    (elementWidth / MOBILE_DESIGN_WIDTH) *
    (actualScreenWidth || MOBILE_DESIGN_WIDTH)
  );
};
