import {$authHost, $host} from "./index";

export const getRoles = async () =>{
    const {data} = await $host.get('api/role/')
    return data
}