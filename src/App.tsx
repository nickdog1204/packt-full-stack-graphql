import React, {FormEvent, FormEventHandler, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {IPost} from "./models";
import {Helmet} from 'react-helmet-async';
import Feed from "./Feed";
import Chats from "./Chats";

function App() {
    return (
        <div className="container">
            <Helmet>
                <title>GraphBook - 新聞餵食</title>
                <meta
                    name="description"
                    content="你GraphBook上所有朋友的新聞餵食"
                />


            </Helmet>
            <Feed/>
            <Chats/>
        </div>
    );
}


export default App;
