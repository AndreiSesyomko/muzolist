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
            const newAuthor = await $authHost.post('api/authors/', {name: author});
            form.append('author_id', newAuthor.data.id);
            console.log('bsbs')
        }
        const {data} = await $authHost.post('api/tracks/', form);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getTracks = async () => {
    try {
        const {data} = await $host.get('api/tracks/');
        const res = data.map((track) => {
            console.log(track);
            return {...track, artist: track?.author?.name, album: track?.album?.name, src: track.audio, title: track.name};
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};