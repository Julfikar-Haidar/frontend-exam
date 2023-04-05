import { configureStore } from "@reduxjs/toolkit";
import crudReucer from "../features/crud/crudSlice";

export const store = configureStore({
    reducer: {
        crud: crudReucer,
    },
});
