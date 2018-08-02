import {store} from "../../store";

export const UPDATE_POSITION = 'UPDATE_POSITION';
export const SIGN_UP_DANCER = 'SIGNUP_DANCER';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS';
export const SUBSCRIBE_FAILURE = 'SUBSCRIBE_FAILURE';
export const UNSUBSCRIBE_SUCCESS = 'UNSUBSCRIBE_SUCCESS';
export const UNSUBSCRIBE_FAILURE = 'UNSUBSCRIBE_FAILURE';
export const RESET_SUBSCRIBE_STATUS = 'RESET_SUBSCRIBE_STATUS';
export const RESET_UNSUBSCRIBE_STATUS = 'RESET_UNSUBSCRIBE_STATUS';

export const updateDancerPreferredPosition = (lat, lng) => (dispatch) => {
    dispatch(
        {
            type: UPDATE_POSITION,
            lat: lat,
            lng: lng
        }
    )
};

export const updateEmail = (email) => (dispatch) => {
    dispatch(
        {
            type: UPDATE_EMAIL,
            email: email
        }
    )
};

export const signUpDancer = (email, lat, lng, distance, chosenDanceStyles) => (dispatch, getState) => {
    let url = getState().app.backendServerAddress + '/rest/public/signUp';
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });
    fetch(url, {
        method: 'put',
        body: JSON.stringify({
            email: email,
            lat: lat,
            lng: lng,
            distance: distance,
            chosenDanceStyles: chosenDanceStyles
        }),
        headers: headers,
        mode: 'cors',
        cache: 'default'
    }).catch(function () {
        dispatch({type: SUBSCRIBE_FAILURE});
    }).then(function (response) {
        if (response !== undefined && 200 === response.status) {
            dispatch({type: SUBSCRIBE_SUCCESS});
        } else {
            dispatch({type: SUBSCRIBE_FAILURE});
        }
    }).finally(function () {
        setTimeout(function () {
            dispatch({type: RESET_SUBSCRIBE_STATUS});
        }, 4000);
    })
};

export const unsubscribe = (email) => (dispatch, getState) => {
    let url = getState().app.backendServerAddress + '/rest/public/unSubscribe/' + email;
    let token = '';
    let csrfHeader = '';
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Charset': 'UTF-8'
    });
    fetch(url, {
        method: 'delete',
        headers: headers
        // ,
        // credentials: 'include'
    }).catch(function () {
        dispatch({type: UNSUBSCRIBE_FAILURE});
    }).then(function (response) {
        if (response !== undefined && 200 === response.status) {
            dispatch({type: UNSUBSCRIBE_SUCCESS});
        } else {
            dispatch({type: UNSUBSCRIBE_FAILURE});
        }
    }).finally(function () {
        setTimeout(function () {
            store.dispatch({type: RESET_UNSUBSCRIBE_STATUS});
        }, 4000);
    })
};
