import {getFontSizeByWindowHeight, getFontSizeByWindowWidth} from '@/style/theme';
import {Box} from '@atom';
import {StyleSheet, View} from 'react-native';

type HorizontalCardSeparatorType = {
  w?: any;
  color?:string
};

const HorizontalCardSeparator = ({
  w = StyleSheet.hairlineWidth,
  color
}: HorizontalCardSeparatorType) => (
  <View style={{backgroundColor: (color ? color : '#e8e8e8'),height:getFontSizeByWindowHeight(w)}}/>
);

export default HorizontalCardSeparator;
