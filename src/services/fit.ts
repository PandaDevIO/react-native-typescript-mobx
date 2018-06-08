import { PixelRatio } from 'react-native';

export default (px: number) => {
    return PixelRatio.getPixelSizeForLayoutSize(px);
}