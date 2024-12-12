import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loginStatus: false,
    },
    reducers: {
        userLogin: (state, { payload }) => {
            console.log("log")
            state.user = payload;
            state.loginStatus = true;
        },
        userLogout: (state, action) => {
            state.user = null;
            state.loginStatus = false;
        }
    }
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;