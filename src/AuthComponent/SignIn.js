import { Button, FormControl, IconButton, Input, InputLabel } from '@material-ui/core';
import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function SignIn() {
  const [icon, setIcon] = useState(<VisibilityOffIcon />)

  const [password, setPassword] = useState('');
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

  return (
    <section className='container'>
      <div className='form'>
        <div className='form__content'>
          <header>Sign In</header>
          <div id='form'>
            <FormControl className='field'>
              <InputLabel>Email</InputLabel>
              <Input type='email' className='input' value={email} onChange={event => setEmail(event.target.value)} />
            </FormControl>
            <FormControl className='field'>
              <InputLabel>Password</InputLabel>
              <Input type={type} className='password' value={password} onChange={event => setPassword(event.target.value)} />
            </FormControl>
            <IconButton onClick={view} className='button'>
              {icon}
            </IconButton>
            <br></br>
            <FormControl className='field'>
              <Button variant='contained' color='primary' size='small'>Sign In</Button>
            </FormControl>
          </div>

          <div className='form__link'>
            <span>Don't have an account? <Link to='/' className='link login-link'>Sign Up</Link></span>
          </div>
        </div>
        <div className='line'></div>
        <div className='media__options'>
          <FormControl>
            <GoogleButton type='light' />
          </FormControl>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
