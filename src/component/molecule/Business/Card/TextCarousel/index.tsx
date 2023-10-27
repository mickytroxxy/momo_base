import { View, Dimensions, StyleSheet, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { Box, Button, Icon, Text } from '@atom'
import { fontFamily } from '@/style/theme'
import { globalBlack, globalGrey, globalMoMoBlue, globalSunshineYellow, globalWhite } from '@/style-dictionary-dist/momoStyle'
import Carousel, {Pagination} from 'react-native-snap-carousel';

export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
const {width} = Dimensions.get('screen');


const data = [
  {
    id: 1,
    title:'Get Paid',
    name: 'You can accept payments seamlessly by presenting your static QR Code'
  },
  {
    id: 2,
    title:'Account Summary',
    name: 'Manage your accounts more effectively by tracking money coming in...'
  }
];
const renderItem = ({item}:any,index:number,isCarousel:any) => {
  return (
    <View
      style={{
        padding: 10,
        alignItems: 'center',
        justifyContent:'center',
      }}>
        <Text style={{marginVertical: 10,fontFamily:fontFamily('Bold'),color:globalSunshineYellow,textAlign:'center'}}> {item.title}</Text>
        <Text numberOfLines={2} style={{marginTop: 10,fontFamily:fontFamily('Regular'),color:globalWhite,textAlign:'center'}}> {item.name}</Text>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          //@ts-ignore
          carouselRef={isCarousel}
          containerStyle={{padding:0}}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: -30,
            bottom:15,
            backgroundColor: globalSunshineYellow,
          }}
          tappableDots={true}
          inactiveDotStyle={{
            backgroundColor: 'white',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    </View>
  );
};
const TextCarousel = () => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <Box>
      <View style={{minHeight:277}}>
      <Carousel
        ref={isCarousel}
        data={data}
        renderItem={(e) => renderItem(e,index,isCarousel)}
        sliderWidth={width-48}
        itemWidth={width-48}
        onSnapToItem={index => setIndex(index)}
      />
    </View>
    </Box>
  )
}
export default TextCarousel