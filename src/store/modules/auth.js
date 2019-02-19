const state = { token: localStorage.getItem('user-token') || '', status: '', }

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}

const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => { // THE PROMISE USED FOR ROUTER REDIRECT IN LOGIN
            commit(AUTH_REQUEST)
            axios({ url: 'auth', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token
                    // STORE THE TOKEN IN LOCAL STORAGE
                    localStorage.setItem('user-token', token)
                    // ADD THIS LINE FOR AXIOS
                    axios.defaults.headers.common['Authorization'] = token
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
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
}

const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success'
        state.token = token
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    }
}
