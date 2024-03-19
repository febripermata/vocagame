import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    id: string;
    phone: string;
    username: string;
};

const initialState = {
    id: "",
    phone: "",
    username: "",
} as AuthState;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            return initialState;
        },
        login: (state, action: PayloadAction<AuthState>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
