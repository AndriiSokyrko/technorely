import {$authHost, $host} from "./index";

export const editCompany = async (company) => {
    const res = Object.fromEntries(company.entries());
    const {data} = await $authHost.patch(`api/company/${res.id}`, company)
    return data
}
export const createCompany = async (company) => {
    const {data} = await $authHost.post('api/company', company)
    return data
}
export const deleteCompany = async (id) => {
    const {data} = await $authHost.delete(`api/company/${id}`)
    return data
}


export const fetchCompany = async ( startDate, endDate, valueMin, valueMax, userId,role, page, limit, nameSort, typeSort) => {
    const {data} = await $host.get('api/company', {params: {
            startDate, endDate, valueMin, valueMax, userId,role, page, limit,nameSort, typeSort
        }})
    return data
}

export const fetchCompanyById = async (id) => {
    const {data} = await $host.get(`api/company/${id}`)
    return data
}
