import { combineReducers } from "redux";
import { countReducer } from "./reducers/counterReducer";

export const rootReducer = combineReducers({
    countState: countReducer
})

export type RootState = ReturnType<typeof rootReducer>;