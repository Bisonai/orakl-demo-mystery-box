import remCalc from './remCalc';

const DESIGN_WIDTH_DIMENSION = 1920;
const RESIZE_WIDTH_DIMENSION = 1440;
const MOBILE_DESIGN_WIDTH = 340;
const RATIO = RESIZE_WIDTH_DIMENSION / DESIGN_WIDTH_DIMENSION;

export const scale = (size: number) => `${size * RATIO}px`;

export const scaleByWidth = (size: number, defaultOnLg?: number) => {
  return {
    lg: defaultOnLg ? `${defaultOnLg}px` : scale(size),
    '2xl': remCalc(size),
  };
};

export const scaleMobile = (
  elementWidth: number,
  actualScreenWidth?: number,
) => {
  return (
    (elementWidth / MOBILE_DESIGN_WIDTH) *
    (actualScreenWidth || MOBILE_DESIGN_WIDTH)
  );
};
