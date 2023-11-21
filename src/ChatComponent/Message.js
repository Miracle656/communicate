import React from 'react';
import './Message.css';
import { IconButton } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

function Message(props) {

    const colRef = doc(db, 'messages', props.message.id);

    return (
        <div className='messages'>
            <div>
                {props.message.message}
                <IconButton onClick={event => deleteDoc(colRef)}>
                    <DeleteSweepIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default Message;
