import React, {forwardRef} from 'react';
import './Message.css';
import { IconButton } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
// import { db } from '../firebase';
// import { doc, deleteDoc } from 'firebase/firestore';

const Message = forwardRef(({message, username}, ref) => {

    const isUser = username === message.username;
    // const colRef = doc(db, 'messages', doc.id);

    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <div className={isUser ? "message__userCard" : "message__guestCard"}>
                {!isUser && `${message.username}: `} {message.message}
                <IconButton>
                    <DeleteSweepIcon onClick={() => alert("still working on this feature")} />
                </IconButton>
            </div>
        </div>
    );
})

export default Message;
