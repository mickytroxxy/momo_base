import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {PersistConfig} from 'redux-persist/lib/types';
import AsyncStorage from '@react-native-async-storage/async-storage';



const initialState:any= {
  accountTitle: "",
  fri:"",
};
export const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<any>) {
      state.accountTitle = action.payload?.accountType;
      state.fri = action.payload?.accountId;
    },
    

  },
});

export const {setAccounts} = accountSlice.actions;

const persistConfig: PersistConfig<any> = {
  key: 'rtk:auth',
  storage: AsyncStorage,
  whitelist: ['accessToken'],
};

export const accountsReducer = persistReducer(persistConfig, accountSlice.reducer);
