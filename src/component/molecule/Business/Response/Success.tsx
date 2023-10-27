import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';
import CurvedHeader from '../../Header/CurvedHeader';
import TopHeaderContent from '../../Header/TopHeaderContent';
import {Button, Icon, Illustration} from '@atom';
import {headerInJourneyFontColour} from '@/style-dictionary-dist/momoStyle';
import {gpmsh, gpsh, gpsw} from '@/utils/parseTokenStyle';
import Illustrate from '@/constants/illustration';
import {fontFamily} from '@/style/theme';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const {Soxsex} = Illustrate;
export type propBtnTypes = {
  header?:string;
  body?:string;
  buttons?:{
    variant:'primary' | 'secondary';
    text:string;
    onPress?:() => any
  }[]
}
const Success = ({header,body,buttons}:propBtnTypes) => {
  const {goBack} = useNavigation();
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#00496a'} />
      <CurvedHeader name="BusinessResponseBg" h={268}>
        <TopHeaderContent
          containerStyle={{
            paddingVertical: gpsh('13'),
            alignItems: 'center',
          }}
          left={{
            leftComp: (
              <TouchableOpacity onPress={() => {
                console.log('Wpppppp')
              }}>
                  <Icon
                    onPress={() => {}}
                    name="BusinessBack"
                    color={headerInJourneyFontColour}
                    size={24}
                  />
              </TouchableOpacity>
            ),
          }}
          center={{
            centerComp: <Icon name="MomoIcon" size={40} />,
          }}
        />
      </CurvedHeader>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '-40%',
        }}>
        <Image
          source={require('./success.png')}
          style={{
            width: gpsw('240'),
            height: gpsh('230'),
          }}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: gpsw('24'),
          fontFamily: fontFamily('Bold'),
          //   marginTop: gpsh('12'),
          marginTop: '-2%',
          marginBottom: gpsh('8'),
          color: '#004F71',
        }}>
        {header ? header : 'Heading'}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: gpsw('14'),
          lineHeight: gpsh('18.2'),
          fontFamily: fontFamily('Regular'),
          marginBottom: gpsh('8'),
          paddingHorizontal: gpsw('25'),
          color: 'black',
        }}>
        {body ? body : 'Success status. It`s like this because of the environment it`s running in.'}
      </Text>
      {/* </View> */}
      {!buttons ? 
        <View style={{gap: gpmsh('12'), padding: gpsw('20'),flexGrow:1,justifyContent: 'flex-end'}}>
          <Button label="PRIMARY" />
          <Button label="SECONDARY" variant="secondary" />
        </View>
        :
        <View style={{gap: gpmsh('12'), padding: gpsw('20'),flexGrow:1,justifyContent: 'flex-end'}}>
          {buttons.map((item,i) => 
            <View key={i}>
              <Button label={item.text} variant={item.variant} onPress={item.onPress} />
            </View>
          )}
        </View>
      }
    </View>
  );
};

export default Success;
