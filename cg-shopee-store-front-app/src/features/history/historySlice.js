import {createSlice} from "@reduxjs/toolkit";
import {HOME_PAGE} from "../../constant/page";

export const historySlice = createSlice({
    name: "history",
    initialState: HOME_PAGE,
    reducers: {
        setHistory: (state, action) => {
            return action.payload;
        }
    },
});

export const { setHistory } = historySlice.actions;

export const selectHistory = (state) => state.history;


export default historySlice.reducer;