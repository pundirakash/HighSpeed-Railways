import {REG_REQUEST,SUCCESS, FAILURE} from './regTypes';

const initialState = {
    isRegistered: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case REG_REQUEST:
            return {
                ...state
            };
        case SUCCESS:
            return {
                isRegistered: action.payload
            };
        case FAILURE:
            return {
                isRegistered: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
