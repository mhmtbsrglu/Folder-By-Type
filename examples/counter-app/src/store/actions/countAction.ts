import { type Action } from "redux";

export enum CountActionConstants {
    INCREMENT = "COUNT/INCREMENT",
    DECREMENT = "COUNT/DECREMENT"
}


export interface CountAction extends Action<CountActionConstants> {
    type: CountActionConstants;
    payload?: number; 
}

export function increment(count: number): CountAction {
    return {
        type: CountActionConstants.INCREMENT,
        payload: count
    };
}