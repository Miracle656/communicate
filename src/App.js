import { Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import SignUp from './AuthComponent/SignUp';
// import SignIn from './AuthComponent/SignIn';
import Chat from './ChatComponent/Chat';
import { ContextProvider } from './sharedstate';


function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Routes>
          <Route path='/' element={<SignUp />} />
          {/* <Route path='/sign_in' element={<SignIn />} /> */}
          <Route path='/chats' element={<Chat />} />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
