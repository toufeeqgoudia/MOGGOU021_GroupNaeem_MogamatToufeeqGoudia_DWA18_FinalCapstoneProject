/* eslint-disable react/prop-types */
import { Button, TextField } from '@mui/material';
import './Login.css';

export default function SignUp(props) {
  return (
    <div className="login-container">
      <div className="ph-container">
        <img
          src="/android-chrome-384x384.png"
          alt="PodHub Logo"
          className="ph-logo"
        />
      </div>
      <form className="login-form">
        <h3 className="login-title">Sign Up</h3>
        <TextField
          label="First Name"
          variant="outlined"
          size="small"
          margin="dense"
          className="form-input"
        />
        <TextField
          label="Last Name"
          variant="outlined"
          size="small"
          margin="dense"
          className="form-input"
        />
        <TextField
          label="Email"
          variant="outlined"
          size="small"
          margin="dense"
          className="form-input"
        />
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          margin="dense"
          className="form-input"
        />
        <Button variant="contained" className='form-btn'>Sign In</Button>
      </form>
      <Button
        variant="text"
        className="link-btn"
        onClick={() => props.onFormSwitch('login')}
      >
        Already have an account? Login here.
      </Button>
    </div>
  );
}
