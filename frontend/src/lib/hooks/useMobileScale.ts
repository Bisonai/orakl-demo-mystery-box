import { scaleMobile } from '../utils/scale';
import useWindowDimensions from './useWindowDimensions';

const useMobileScale = () => {
  const { width, height } = useWindowDimensions();
  const calSize = (elementWidth: number) =>
    `${scaleMobile(elementWidth, width)}px`;
  return {
    calSize,
    width,
    height,
  };
};

export default useMobileScale;
