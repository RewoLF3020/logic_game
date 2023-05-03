import { createSlice } from "@reduxjs/toolkit";
//import { settings } from "../config";

const daySlice = createSlice({
    name: 'game',
    initialState: {
        days: 1,
    },
    reducers: {
        setDays(state, action) {
            state.days = state.days + action.payload;
        },
    },
});

/* const moneySlice = createSlice({
    name: 'money',
    initialState: {
        money: settings.startMoney,
    },
    reducers: {
        setMoney(state, action) {
            state.money = state.money + action.payload.money;
        }
    }
}) */

export const {setDays} = daySlice.actions;

export default daySlice.reducer;