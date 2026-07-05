import { type CountAction, CountActionConstants } from "../actions/countAction";

const initialCountState = {
    count: 0
};

type CountState = typeof initialCountState;

export function countReducer(
    state: CountState = initialCountState, 
    action: CountAction
): CountState {
    switch (action.type) {
        case CountActionConstants.INCREMENT:
            return {
                ...state,
                count: state.count + (action.payload || 0) 
            };
        case CountActionConstants.DECREMENT:
            return {
                ...state,
                count: state.count - (action.payload || 0)
            };
        default:
            return state;
    }
}