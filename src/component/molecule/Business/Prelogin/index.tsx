// import { View } from 'react-native'
// import React from 'react'
// import * as Animatable from 'react-native-animatable';
// import { Text } from '@atom';
// import { gpsh } from '@/utils/parseTokenStyle';
// const Prelogin = () => {
//   return (
//     <Animatable.View animation="zoomIn" duration={2000} useNativeDriver={true} style={{position:'absolute',gap:gpsh('10'),borderTopLeftRadius:gpsh('18'),borderTopRightRadius:gpsh('18'),bottom:0,backgroundColor:'white',width:'100%',padding:gpsh('20'),elevation:10, shadowColor: "#000",
//         shadowOffset: {
//         width: 10,
//         height: 10,
//         },
//         shadowOpacity: 1,
//         shadowRadius: 3.84
//     }}>
//       <Text>OrderSummarry</Text>
//       <Text>OrderSummarry</Text>
//       <Text>OrderSummarry</Text>
//     </Animatable.View>
//   )
// }

// export default Prelogin



import {useSignInDataMutation} from '@/api/nodeApi/SignIn/api';
import {
  Box,
  Button,
  Icon,
  SafeAreaContainer,
  Text,
  TextButton,
} from '@/component/atom';
import * as Animatable from 'react-native-animatable';
import {SvgIconType} from '@/constants/icon';
import {AlertMessageType, addMessage} from '@/features/alert/alertSlice';
import {selectUserDetails, updateSessionId, updateToken, updateUserDetails} from '@/features/auth/authSlice';
import useFetch from '@/hooks/useFetch';
import {RootState, useTypedDispatch, useTypedSelector} from '@/store/store';
import {fontFamily} from '@/style/theme';
import {SelectCountryScreenProps} from '@/typings/navigation';
import {gpsh, gpsw} from '@/utils/parseTokenStyle';
import {zodResolver} from '@hookform/resolvers/zod';
import {RHFInput} from '@molecule';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { useSelector } from 'react-redux';
import {z} from 'zod'

const sigininpinschema = z.object({
  pin: z
    .string()
    .nonempty({message: 'This field cannot be empty'})
    .min(4, {message: 'Enter a valid 4 digit pin'}),
});
const Prelogin = () => {
  const {
    control,
    handleSubmit,
    formState: {isValid},
    setError,
  } = useForm<any>({
    resolver: zodResolver(sigininpinschema),
    mode: 'onBlur',
    defaultValues: {
      pin: '',
    },
  });
  const dispatch = useTypedDispatch();
  const {fetchData} = useFetch();
  const {navigate,goBack}:{navigate:any,goBack:any} = useNavigation<SelectCountryScreenProps['navigation']>();
  const { mobileNumber = ''} = useTypedSelector(selectUserDetails);

  const errorMessage: AlertMessageType = {
    title: 'InCorrect PIN',
    message: 'Enter Correct PIN',
    duration: 2000,
    type: 'error',
  };

  const somethingMessage: AlertMessageType = {
    title: `Something Wen/'t Wrong`,
    message: `Something Wen/'t Wrong...`,
    duration: 2000,
    type: 'error',
  };
  const onSubmit = async (data: any) => {
    try {
      const payload = {"loginrequest": { "identity": mobileNumber, "credential": { "secret": data.pin, "type": "pincode" } } };
      const response = await fetchData('accessplatform/login','POST',payload);
      if(response?.result?.sessionId){
        dispatch(updateToken({ accessToken: response?.result?.sessionId }));
      }else{
        dispatch(addMessage(errorMessage));
        setError('pin', {type: 'custom', message: 'Incorrect PIN'});
      }
    } catch (error) {
      dispatch(addMessage(somethingMessage));
    }
  };


  return (
    <View style={{backgroundColor:'rgba(0,0,0,0.5)',width:'100%',height:'100%',flex:1,position:'absolute'}}>
        <Animatable.View animation="fadeInUpBig" duration={1000} useNativeDriver={true} style={{position:'absolute',gap:gpsh('10'),borderTopLeftRadius:gpsh('18'),borderTopRightRadius:gpsh('18'),bottom:0,backgroundColor:'white',width:'100%',padding:gpsh('20'),elevation:10, shadowColor: "#000",
            shadowOffset: {
            width: 10,
            height: 10,
            },
            shadowOpacity: 1,
            shadowRadius: 3.84
        }}>
            <View style={{alignItems:'flex-end'}}><TouchableOpacity onPress={() => goBack()}><Icon fill='green' name='OutlineCloseIcon' /></TouchableOpacity></View>
            <View style={{alignItems:'center',marginTop:gpsh('10')}}><Text style={{fontFamily:fontFamily('Medium'),fontSize:gpsh('16'),color:'black'}}>Log in to continue!</Text></View>
            <View style={{marginTop:gpsh('20')}}>
            <RHFInput
                label={'PIN'}
                name={'pin'}
                animationDuration={5}
                control={control}
                required={true}
                maxLength={4}
                keyboardType="numeric"
                isPassword
            />
            </View>
            <View
            style={{
                flexDirection: 'row',
                marginTop: gpsh(10),
                justifyContent: 'space-between',
            }}>
            <TextButton title="Forgot PIN" onPress={() => {}} />
            </View>
            <View style={{marginTop: gpsh(20)}}>
                <Button disabled={!isValid} label="CONTINUE" onPress={handleSubmit(onSubmit)}/>
            </View>
        </Animatable.View>
    </View>
  );
};


export default Prelogin;