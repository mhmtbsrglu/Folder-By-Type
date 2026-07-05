import { createStore } from "redux";
import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools()
);

export function configureStore() {
    return store;
}

export type AppDispatch = typeof store.dispatch;