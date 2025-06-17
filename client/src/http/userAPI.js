import {$authHost, $host} from "./index";
import {jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const resetPassword = async (email, password) => {
    const {data} = await $host.post('api/user/reset', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}


export const createAdmin = async (user) =>{
    const {data} = await $host.post('api/user/admin', user)
    return data
}

export const getUsers = async (page, limit) =>{
    const {data} = await $authHost.get('api/user/',{params: {page, limit}})
    return data
}
export const deleteUser = async (id) =>{
    const {data} = await $authHost.delete(`api/user/${id}`)
    return data
}
export const getUserById = async (id) => {
    const {data} = await $authHost.get(`api/user/${id}`)
    return data
}
export const updateUser = async (formData) => {

    const {data} = await $authHost.patch(`api/user/update`, formData,
         {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
         }
    )
    return data
}