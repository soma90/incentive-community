import { createSlice } from "@reduxjs/toolkit";

const userInfoInit = {
  id: 0,
  nickname: "",
  tokenAmount: 0,
  ethAmount: 0,
  createdAt: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: userInfoInit },
  reducers: {
    setUserInfo(state, actions) {      
      state.userInfo = { ...state.userInfo, ...actions.payload };
    },
    resetUserInfo(state) {
      state.userInfo = userInfoInit;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
