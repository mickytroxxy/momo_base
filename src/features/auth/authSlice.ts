// import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {persistReducer} from 'redux-persist';
// // import storage from 'redux-persist/lib/storage';
// import {PersistConfig} from 'redux-persist/lib/types';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {RootState} from '@/store/store';
// // import { AuthState } from './types';

// // const initialState: AuthState = {};
// type AuthState = {
//   user: any;
//   accessToken: any;
//   refreshToken: any;
//   sessionId: any;
//   userDetails: any;
// };

// const initialState: AuthState = {
//   user: null,
//   accessToken: null,
//   refreshToken: null,
//   sessionId: null,
//   userDetails: null,
// };

// export const authSlice = createSlice({
//   name: 'authSlice',
//   initialState,
//   reducers: {
//     updateToken(state, action: PayloadAction<any | undefined>) {
//       console.log('action', action.payload);
//       state.accessToken = action.payload?.accessToken;
//     },
//     updateSessionId(state, action: PayloadAction<any | undefined>) {
//       console.log('action', action.payload);
//       state.sessionId = action.payload?.sessionid;
//     },
//     updateUserDetails(
//       state,
//       action: PayloadAction<any | AuthState['userDetails']>,
//     ) {
//       console.log('action', action.payload);
//       state.userDetails = action.payload;
//     },
//     logOut: state => {
//       // state = initialState;
//       state.user = null;
//       state.accessToken = null;
//       state.sessionId = null;
//       state.userDetails = null;
//     },
//   },
// });

// export const {updateToken, logOut, updateSessionId, updateUserDetails} =
//   authSlice.actions;

// export const selectAccessToken = (state: RootState) => state.auth.accessToken;

// export const selectSessionId = (state: RootState) => state.auth.sessionId;

// export const selectUserDetails = (state: RootState) => state.auth.userDetails;

// const persistConfig: PersistConfig<any> = {
//   key: 'rtk:auth',
//   storage: AsyncStorage,
//   whitelist: ['accessToken', 'sessionId', 'userDetails'],
// };

// export const authReducer = persistReducer(persistConfig, authSlice.reducer);


import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import {RootState} from '@/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistConfig} from 'redux-persist/lib/types';
// import { AuthState } from './types';

// const initialState: AuthState = {};
type AuthState = {
  userLoggedIn: boolean | null;
  accessToken: any;
  refreshToken: any;
  sessionId: any;
  userDetails: any;
};

const initialState: AuthState = {
  userLoggedIn: null,
  accessToken: null,
  refreshToken: null,
  sessionId: null,
  userDetails: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    updateToken(state, action: PayloadAction<any | undefined>) {
      console.log('action', action.payload);
      state.accessToken = action.payload?.accessToken;
    },
    updateSessionId(state, action: PayloadAction<any | undefined>) {
      console.log('action', action.payload);
      state.sessionId = action.payload?.sessionid;
    },
    updateUserDetails(
      state,
      action: PayloadAction<any | AuthState['userDetails']>,
    ) {
      console.log('action', action.payload);
      state.userDetails = action.payload;
    },
    updateUserLoggedIn(
      state,
      action: PayloadAction<any | AuthState['userLoggedIn']>,
    ) {
      state.userLoggedIn = action.payload;
    },
    logOut: state => {
      // state = initialState;
      state.userLoggedIn = null;
      state.accessToken = null;
      state.sessionId = null;
      state.userDetails = null;
    },
    signOut: state => {
      state.sessionId = null;
    },
  },
});

export const {
  updateToken,
  logOut,
  updateSessionId,
  updateUserDetails,
  updateUserLoggedIn,
  signOut,
} = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectSessionId = (state: RootState) => state.auth.sessionId;

export const selectUserLoggedIn = (state: RootState) => state.auth.userLoggedIn;

export const selectUserDetails = (state: RootState) => state.auth.userDetails;

const persistConfig: PersistConfig<any> = {
  key: 'rtk:auth',
  storage: AsyncStorage,
  whitelist: ['accessToken', 'sessionId', 'userDetails', 'userLoggedIn'],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
