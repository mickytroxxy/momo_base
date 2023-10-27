import { selectMessage } from '@/features/alert/alertSlice';
import { useTypedSelector } from '@/store/store';
import { MainStackParams } from '@/typings/navigation';
import { Alert } from '@molecule';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import EmptyScreen from '@/component/molecule/Business/Drawer/EmptyScreen';

const MainStack = createNativeStackNavigator<MainStackParams>();
const MainStackNavigator = () => {
  const message = useTypedSelector(selectMessage);
  console.log('message', message);
  return (
    <BottomSheetModalProvider>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name="AccountTransfer" component={EmptyScreen} />
      </MainStack.Navigator>
      {message.length !== 0 && <Alert />}
    </BottomSheetModalProvider>
  );
};

export default MainStackNavigator;
