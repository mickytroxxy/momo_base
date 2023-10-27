import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalMoMoBlue } from '@/style-dictionary-dist/momoStyle'
import { useDispatch } from 'react-redux'
import { updateToken } from '@/features/auth/authSlice'

const EmptyScreen = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(updateToken({accessToken:null}))
  }
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={logout} style={{backgroundColor:'tomato',padding:20,borderRadius:10}}>
        <Text style={{color:'white'}}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EmptyScreen