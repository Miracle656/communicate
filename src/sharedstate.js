import React, { useState } from 'react';

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [image, setImage] = useState('')

    const value = { username, setUsername, image, setImage }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}