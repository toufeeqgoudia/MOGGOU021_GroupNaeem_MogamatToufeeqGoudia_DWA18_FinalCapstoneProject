/* eslint-disable react/prop-types */
import { useState } from 'react';
import { supabase } from '../../supabase';
import { Button, TextField, Alert } from '@mui/material';

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
      if (error) {
        setFetchError(error.message)
      }
    } catch {
      setFetchError('Failed to sign in');
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <img src="/PodHub-nav-logo.png" alt="PodHub Logo" className="w-80 h-40 p-5 rounded-3xl" />
      </div>
      <form className="flex flex-col border-solid border-2 border-black rounded-xl m-0 mx-auto p-3" onSubmit={handleSubmit}>
        <h3 className="text-2xl mt-0 text-center">Sign In</h3>
        {fetchError && <Alert severity="error">{fetchError}</Alert>}
        <TextField
          label="Email"
          type="email"
          name="email"
          autoComplete="on"
          variant="outlined"
          size="small"
          margin="dense"
          className="w-72"
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
          className="w-72"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          className="w-36 self-center"
        >
          Sign In
        </Button>
      </form>
      <Button
        variant="text"
        className="p-5 bg-none underline cursor-pointer text-center"
        onClick={() => props.onFormSwitch('register')}
      >
        Don`t have an account? Register here.
      </Button>
    </div>
  );
}
