//CommonEmptyScreen
import {  Text } from '@/component/atom';
import { View } from 'react-native';

const CommonEmptyScreen = ({
  Title=''
}: {
    Title: string;
}) => {
  return (
<View style={{ display: 'flex', flexDirection: 'row',alignItems: 'center',justifyContent: 'center',padding:15}}>
<Text style={{justifyContent:'center'}} color={'momoBlue'} variant={'medium12'}>{Title}</Text>
</View> 
  );
};

export default CommonEmptyScreen;
