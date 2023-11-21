import { Button, FormControl, IconButton, Input, InputLabel } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import './Auth.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { signInWithRedirect, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Context } from "../sharedstate";


function SignUp() {
    const { setUsername } = useContext(Context)

    const navigate = useNavigate();
    const [icon, setIcon] = useState(<VisibilityOffIcon />)

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [type, setType] = useState('password');

    const [email, setEmail] = useState('');

    const view = () => {
        if (type == 'password') {
            setType('text');
            setIcon(<VisibilityIcon />)
        } else {
            setType('password');
            setIcon(<VisibilityOffIcon />)
        }
    }

    const provider = new GoogleAuthProvider();

    const signUp = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/chats')

            } else {
                signInWithPopup(auth, provider)
                    .then(res => {
                        setUsername(res.user.displayName);
                    }).catch(e => {
                        console.log(e);
                    })
            }
        })
    }

    return (
        <section className='container'>
            <div className='form'>
                { <div className='form__content'>
                    <header>Sign Up</header>
                    <div id='form'>
                        <FormControl className='field'>
                            <InputLabel>Email</InputLabel>
                            <Input type='email' className='input' value={email} onChange={event => setEmail(event.target.value)} />
                        </FormControl>
                        <FormControl className='field'>
                            <InputLabel>Password</InputLabel>
                            <Input type={type} className='password' value={password} onChange={event => setPassword(event.target.value)} />
                        </FormControl>
                        <FormControl className='field'>
                            <InputLabel>Confirm Password</InputLabel>
                            <Input type={type} className='password' value={password2} onChange={event => setPassword2(event.target.value)} />
                        </FormControl>
                        <IconButton onClick={view} className='button'>
                            {icon}
                        </IconButton>
                        <br></br>
                        <FormControl className='field'>
                            <Button variant='contained' color='primary' size='small'>Sign Up</Button>
                        </FormControl>
                    </div>

                    <div className='form__link'>
                        <span>Already have an account? <Link to='/sign_in' className='link login-link'>Sign In</Link></span>
                    </div>
                </div>
                <div className='line'></div>}
                <div className='media__options'>
                    <FormControl>
                        <GoogleButton type='light' onClick={signUp} />
                    </FormControl>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
