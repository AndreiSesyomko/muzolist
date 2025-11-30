import {$authHost, $host} from "./index";

export const getCats = async () => {
    try {
        const {data} = await $host.get('api/categories/')
        return data
    } catch (e) {
        console.log(e)
    }
}

export const getPosts = async (search=null, catID=null) => {
    try {
        let query = 'api/posts/';
        if (catID && search) query += `?catID=${catID}&search=${search}`;
        else if (catID) query += `?catID=${catID}`;
        else if (search) query += `?search=${search}`;

        const {data} = await $host.get(query)
        return data.results
    } catch (e) {
        console.log(e)
    }
}

export const getOnePost = async (id) => {
    try {
        const {data} = await $host.get('api/posts/' + id);
        return data
    } catch (e) {
        console.log(e)
    }
}

export const createPost = async (post) => {
    try {
        const {data} = await $authHost.post('api/posts/', post)
        return data
    } catch (e) {
        console.log(e)
    }
}

export const patchPost = async (post) => {
    try {
        const {data} = await $authHost.patch('api/posts/', post)
        return data
    } catch (e) {
        console.log(e)
    }
}