import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: "",
        localId: "",
        image: "",
        },
    reducers: {
        setUserEmail: (state, action) => {
            state.email = action.payload;
        },
        setLocalId: (state, action) => {
            state.localId = action.payload;
        },
        setImage: (state,action) => {
            state.image = action.payload
        },
         logout: (state) => {
      state.user = null;
      state.token = null;
      state.localId = null;
      state.image = null;
    }
    }})

export const {setUserEmail, setLocalId, setImage, logout } = userSlice.actions
export default userSlice.reducer