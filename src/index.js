import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/custom.scss'
import './styles/index.css';
import App from './App';
import UserStore from "./store/UserStore";
import AudioStore from "./store/AudioStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={
        {
            user: new UserStore(),
            audioPlayer: new AudioStore()
        }
    }>
        <App />
    </Context.Provider>
);