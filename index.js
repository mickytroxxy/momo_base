/**
 * @format
 */
import 'react-native-gesture-handler';
import './shim.js'
import {AppRegistry, TouchableOpacity} from 'react-native';
import {name as appName} from './app.json';
import App from './src/base/App';
import messaging from '@react-native-firebase/messaging';

TouchableOpacity.defaultProps = {...(TouchableOpacity.defaultProps || {}), delayPressIn: 0, delayPressOut: 0};

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });


//export {default} from './.storybook'; 
//535105508 com.momo.business.app.dev
AppRegistry.registerComponent(appName, () => App);
