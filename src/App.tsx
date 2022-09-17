import React, {FormEvent, FormEventHandler, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {IPost} from "./models";
import {Helmet} from 'react-helmet-async';
import Feed from "./Feed";

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
        </div>
    );
}

const initialPosts: IPost[] = [
    {
        id: 2,
        text: 'Lorem ipsum',
        user: {
            avatar: '/uploads/avatar1.png',
            username: 'Test User'
        }
    },
    {
        id: 1,
        text: 'Lorem ipsum',
        user: {
            avatar: '/uploads/avatar2.png',
            username: 'Test User 2'
        }
    }

];

export default App;
