import { FormControl, Input } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import FlipMove from "react-flip-move";
import Message from "./Message";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import "./Chat.css";
import WifiIcon from '@material-ui/icons/Wifi';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import { db } from "../firebase";
import { serverTimestamp, collection, onSnapshot, addDoc, orderBy, query } from "firebase/firestore";
import { Context } from "../sharedstate";
import './Chat.css';
import { useNavigate } from 'react-router-dom';


function Chat() {
    const navigate = useNavigate();

    // chatting functions and states
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const { username } = useContext(Context)

    const colRef = collection(db, 'messages');

    const colQuery = query(colRef, orderBy('timestamp'));

    const sendMessage = (event) => {
        addDoc(colRef, {
            message: input,
            //username: username,
            timestamp: serverTimestamp()
        })
        setInput('');
    }

    useEffect(() => {
        onSnapshot(colQuery, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data().message })));
        })
    }, [colQuery]);

    useEffect(() => {
        if (username == '') {
            navigate('/')
        }
    }, []);

    return (
        <div className="body">
            <div className="header">
                <h2>Welcome {username}</h2>
                <h1>Messags</h1>
            </div>

            <div className="app__form">
                <FormControl className="app__formControl">
                    <Input className="app__input" variant='outlined' placeholder='Type a message...' value={input} onChange={event => setInput(event.target.value)} autoFocus />
                    <IconButton className="app__iconButton" disabled={!input || input == (" " * 5)} variant="contained" onClick={sendMessage}>
                        <SendIcon />
                    </IconButton>
                </FormControl>
            </div>

            <div className="message__container">
                {
                    messages.map(message => (
                        <Message key={message.id} message={message} id={message.id} />
                    ))
                }
            </div>
        </div>
    );
}

export default Chat;
