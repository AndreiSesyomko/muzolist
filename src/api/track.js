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
        const newAuthor = await $authHost.post('api/authors/', {name: author});
        const newAlbum = await $authHost.post('api/albums/', {name: album});
        form.append('author', newAuthor.data.id);
        form.append('album', newAlbum.data.id);
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
            return {...track, artist: track.author.name, album: track.album.name, src: track.audio};
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};