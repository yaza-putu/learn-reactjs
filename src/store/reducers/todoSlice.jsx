import {createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import {persistReducer} from "redux-persist";

const initialState = {
    total : 0
}

const persist = {
    key: 'todos',
    storage
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        add(state, action) {
            console.log(state.total)
            state.total += 1
        },
        remove(state) {
            if (state.total == 0) {
                return
            }
            state.total -= 1
        }
    }
})

export const {add,remove} = todoSlice.actions
export default persistReducer(persist, todoSlice.reducer)