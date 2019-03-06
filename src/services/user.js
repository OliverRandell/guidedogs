import Vue from 'vue'
import { apiUrl } from '@/utils/api.js';
import { authHeader } from '../utils/auth-header';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    // const requestOptions = {
    //     // method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: { 'Username': username, 'Password': password, 'Email': username }
    // };
    const config = { headers: { 'Content-Type': 'application/json' } }
    const body = { Username: username, Password: password, Email: username }
    // console.log(requestOptions)
    return Vue.http.post(`${apiUrl}/authentication`, body, config)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                // assign headers with token for future api calls
                Vue.http.headers.common['Authorization'] = `Bearer ${user.token}`;
            }

            return user;
        });
}

function logout() {
    // REMOVE USER FROM LOCAL STORAGE TO LOG USER OUT
    localStorage.removeItem('user');
    delete Vue.http.headers.common['Authorization']
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
