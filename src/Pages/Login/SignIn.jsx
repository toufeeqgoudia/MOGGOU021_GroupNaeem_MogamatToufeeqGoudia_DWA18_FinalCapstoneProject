/* eslint-disable react/prop-types */
import { useState } from 'react';
import { supabase } from '../../supabase';
import { Button, TextField, Alert } from '@mui/material';
import './Login.css';

export default function SignIn(props) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      console.log('data: ', data);
      console.log('data sesson: ', data.session);
      console.log('data user: ', data.user);
      console.log('error: ', error);
      console.log('error.name: ', error.name);
      console.log('error.message: ', error.message);

      if (error) {
        setFetchError(error.message)
      }
    } catch {
      setFetchError('Failed to sign in');
    }

    setLoading(false);
  }

  return (
    <div className="login-container">
      <div className="ph-container">
        <img src="/PodHub-nav-logo.png" alt="PodHub Logo" className="ph-logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="login-title">Sign In</h3>
        {fetchError && <Alert severity="error">{fetchError}</Alert>}
        <TextField
          label="Email"
          type="email"
          name="email"
          autoComplete="on"
          variant="outlined"
          size="small"
          margin="dense"
          className="form-input"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          autoComplete="off"
          variant="outlined"
          size="small"
          margin="dense"
          className="form-input"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          className="form-btn"
        >
          Sign In
        </Button>
      </form>
      <Button
        variant="text"
        className="link-btn"
        onClick={() => props.onFormSwitch('register')}
      >
        Don`t have an account? Register here.
      </Button>
    </div>
  );
}
