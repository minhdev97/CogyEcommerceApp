import {createSlice} from "@reduxjs/toolkit";

export const titleSlice = createSlice({
    name: "title",
    initialState: '',
    reducers: {
        setTitle: (state, action) => {
            return action.payload;
        }
    },
});

export const { setTitle } = titleSlice.actions;

export const selectTitle = (state) => state.title;


export default titleSlice.reducer;