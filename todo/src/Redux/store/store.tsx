import { createStore } from "redux";
import listReducer from "../reducers/listReducer";

export const store = createStore(listReducer);
