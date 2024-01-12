import { FormControl, Input } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import FlipMove from "react-flip-move";
import Message from "./Message";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import "./Chat.css";
// import WifiIcon from '@material-ui/icons/Wifi';
// import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import { db, auth } from "../firebase";
import { signOut } from 'firebase/auth';
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
            username: username,
            timestamp: serverTimestamp()
        })
        setInput('');
    }

    useEffect(() => {
        onSnapshot(colQuery, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })));
        })
    }, [colQuery]);

    useEffect(() => {
        if (username == '') {
            navigate('/')
        }
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="body">
            <div className="header">
                <h3>Welcome {username}</h3>
                <h3>Messages</h3>
                <button className="cta" onClick={handleLogout}>Logout</button>
            </div>

            <div className="app__form">
                <FormControl className="app__formControl">
                    <Input className="app__input" variant='outlined' placeholder='Type a message...' value={input} onChange={event => setInput(event.target.value)} autoFocus />
                    <IconButton className="app__iconButton" disabled={!input || input == (" " * 5)} variant="contained" onClick={sendMessage}>
                        <SendIcon />
                    </IconButton>
                </FormControl>
            </div>

            <FlipMove>
                {
                    messages.map(({ id, message }) => (
                        <Message key={id} username={username} message={message} />
                    ))
                }
            </FlipMove>
        </div>
    );
}

export default Chat;
