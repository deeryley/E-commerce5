import { configureStore } from "@reduxjs/toolkit";
import { AccountSlice } from "../../features/account/AccountSlice";
import {  TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
reducer: {
        
     account: AccountSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

 export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;