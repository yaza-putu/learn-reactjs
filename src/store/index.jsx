import {configureStore} from "@reduxjs/toolkit";
import todoSlice from "./reducers/todoSlice.jsx";
import {persistStore} from "redux-persist";

export const store = configureStore({
    reducer: {
        todos : todoSlice
    },
    devTools: true
})
export const persist = persistStore(store)