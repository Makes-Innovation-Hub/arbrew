import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  subId: "",
  name: "",
  avatar: "",
  userDetails: {
    nativeLanguage: "",
    interests: [],
    yearOfBirth: "",
    nationality: "",
    address: "",
    gender: "",
    occupation: "",
    bio: "",
  },
};
export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    addDetail: (state, { payload }) => {
      const { field, value } = payload;
      state.userDetails[field] = value;
    },
    addAuth0Details: (state, { payload }) => {
      const { subId, name, avatar } = payload;
      state.subId = subId;
      state.name = name;
      state.avatar = avatar;
    },
    addAllDetailsConnectedUser: (state, { payload }) => {
      state = payload;
    },
    mergeDetails: (state, { payload }) => {
      console.log("state before", state);
      state = { ...state, ...payload };
      console.log("state after", state);
    },
  },
});
export const {
  addDetail,
  addAllDetailsConnectedUser,
  addAuth0Details,
  mergeDetails,
} = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
