import {
    UPDATE_POSITION,
    UPDATE_EMAIL,
    SUBSCRIBE_SUCCESS,
    SUBSCRIBE_FAILURE,
    UNSUBSCRIBE_SUCCESS,
    UNSUBSCRIBE_FAILURE,
    RESET_SUBSCRIBE_STATUS,
    RESET_UNSUBSCRIBE_STATUS,
} from '../../actions/signup/signup.js';

const signUpState = (state = {
    dancer: {
        mapLat: 52.237049,
        mapLng: 21.017532,
        email: '',
        distance: 15,
        danceStyles: [],
        signUpStatus: null,
        unsubscribeStatus: null,
    },
    teacher: {},
    danceFloorOwner: {}
}, action) => {
    switch (action.type) {
        case UPDATE_POSITION:
            state.dancer.mapLat = action.lat;
            state.dancer.mapLng = action.lng;
            return state;
        case UPDATE_EMAIL:
            state.dancer.email = action.email;
            return state;
        case SUBSCRIBE_SUCCESS:
            state.dancer.signUpStatus = SUBSCRIBE_SUCCESS;
            return state;
        case SUBSCRIBE_FAILURE:
            state.dancer.signUpStatus = SUBSCRIBE_FAILURE;
            return state;
        case RESET_SUBSCRIBE_STATUS:
            state.dancer.signUpStatus = null;
            return state;
        case UNSUBSCRIBE_SUCCESS:
            state.dancer.unsubscribeStatus = UNSUBSCRIBE_SUCCESS;
            return state;
        case UNSUBSCRIBE_FAILURE:
            state.dancer.unsubscribeStatus = UNSUBSCRIBE_FAILURE;
            return state;
        case RESET_UNSUBSCRIBE_STATUS:
            state.dancer.unsubscribeStatus = null;
            return state;
        default:
            return state;
    }
};

export default signUpState;
