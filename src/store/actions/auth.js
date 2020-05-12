import * as actionTypes from './actionsTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiresIn) => {
    return disptach => {
        setTimeout(() => {
            disptach(logout())
        }, expiresIn * 1000)
    }
}
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        console.log({ email, password })
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDaMXm-5VQppDP-ZeySpxq1uvunbh__p1Q'
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDaMXm-5VQppDP-ZeySpxq1uvunbh__p1Q'
        }
        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_ATUH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        }
        const expirationTime = new Date(localStorage.getItem('expirationDate'))
        const userId = localStorage.getItem('userId')
        if (expirationTime <= new Date()) {
            dispatch(logout())
        } else {
            dispatch(authSuccess(token, userId))
            dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000))
        }
    }
}