import EmptyScreen from '@/screens/EmptyScreen';
import {AuthStackParams} from '@/typings/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator<AuthStackParams>();
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Onboarding" component={EmptyScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;