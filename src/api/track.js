import {$authHost, $host} from "./index.js";
import {getCookie} from "../utils";
import {jwtDecode} from "jwt-decode";

export const getGenres = async () => {
    try {
        const {data} = await $host.get('api/genres/');
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const createTrack = async (form, author, album) => {
    try {
        if(album) {
            const newAlbum = await $authHost.post('api/albums/', {name: album});
            form.append('album_id', newAlbum.data.id);
            console.log('asas')
        }
        if(author) {
            const newAuthor = await $authHost.post('api/authors/', {name: author}) ?? {};
            console.log(newAuthor.data.id);
            form.append('author_id', newAuthor?.data?.id);
            console.log('bsbs')
        }
        const response = await $authHost.post('api/tracks/', form);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTracks = async (search=null, favourites_of=null, sort_by=null) => {
    try {
        let query = 'api/tracks/?';
        const params = new URLSearchParams();
        if(search) {
            params.append('search', search);
        }
        if(favourites_of) {
            params.append('favourites_of', favourites_of);
        }
        if(sort_by) {
            params.append('sort_by', sort_by);
        }
        query = query + params.toString();
        const {data} = await $host.get(query);
        const res = data.map((track) => {
            console.log(track);
            return {...track, artist: track?.author?.name, album: track?.album?.name, src: track.audio, title: track.name};
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addToFavourites = async (user_id, track_id) => {
    const res = await $authHost.post('/api/tracks/' + track_id + '/add_favorite/')
    return res;
}

export const getRecomendations = async (user_id) => {
    const {data} = await $authHost.get('/api/tracks/favourite_genre_distribution/?user_id=' + user_id)
    const res = data.map((track) => {
            console.log(track);
            return {...track, artist: track?.author?.name, album: track?.album?.name, src: track.audio, title: track.name};
        });
    return res;
}

export const addListen = async (user_id, track_id) => {
    const data = await $authHost.post('api/tracks/' + track_id + '/add_listen/')
    return data;
}