import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import apiCall from '../../utils/api'

const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false }

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}

const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => { // THE PROMISE USED FOR ROUTER REDIRECT IN LOGIN
            commit(AUTH_REQUEST)
            apiCall({url: 'auth', data: user, method: 'POST'})
            //axios({ url: 'auth', data: user, method: 'POST' })

            .then(resp => {
                // STORE THE TOKEN IN LOCAL STORAGE
                localStorage.setItem('user-token', resp.token)
                // const token = resp.data.token
                // SET THE HEADER OF YOUR AJAX LIBRARY TO THE TOKEN VALUE
                // ADD THIS LINE FOR AXIOS
                // axios.defaults.headers.common['Authorization'] = token
                commit(AUTH_SUCCESS, resp)
                // HERE'S THE TOKEN! NOW LOG IN YOUR USER :-)
                dispatch(USER_REQUEST)
                resolve(resp)
            })

            .catch(err => {
                commit(AUTH_ERROR, err)
                localStorage.removeItem('user-token') // IF REQUEST FAILS, REMOVE ANY POSSIBLE USER TOKEN IF POSSIBLE
                reject(err)
            })
        })
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT)
            // CLEAR USER TOKEN FROM localStorage
            localStorage.removeItem('user-token')
            // REMOVE THE AXIOS DEFAULT HEADER
            // delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
}

const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    //[AUTH_SUCCESS]: (state, token) => {
    [AUTH_SUCCESS]: (state, resp) => {
        state.status = 'success'
        //state.token = token
        state.token = resp.token
        state.hasLoadedOnce = true
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
        state.hasLoadedOnce = true
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = ''
    }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
