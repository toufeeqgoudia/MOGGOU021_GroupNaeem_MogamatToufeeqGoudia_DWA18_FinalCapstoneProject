import { useState } from "react";
import { supabase } from "../../Config/supabase";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Alert } from "@mui/material";
import PropTypes from "prop-types";

const SignIn = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setFetchError(error.message);
      }

      console.log(data);

      if (data.session !== null && data.user !== null) {
        navigate("/");
      }
    } catch {
      setFetchError("Failed to sign in");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <img
          src="/PodHub-nav-logo.png"
          alt="PodHub Logo"
          className="w-80 h-40 p-5 rounded-3xl"
        />
      </div>
      <form
        className="flex flex-col border-solid border-2 border-black rounded-xl m-0 mx-auto p-3"
        onSubmit={handleSubmit}
      >
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
        onClick={() => props.onFormSwitch("register")}
      >
        Don`t have an account? Register here.
      </Button>
    </div>
  );
};

SignIn.propTypes = {
  onFormSwitch: PropTypes.func,
};

export default SignIn;

// import { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, TextField, Alert } from '@mui/material';
// import PropTypes from 'prop-types'
// import useAuth from '../../Hooks/useAuth';

// const SignIn = (props) => {
//   const emailRef = useRef()
//   const passwordRef = useRef()
//   const { signin } = useAuth()
//   const [loading, setLoading] = useState(false);
//   const [fetchError, setFetchError] = useState('');
//   const navigate = useNavigate()

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);
//       setFetchError('')

//       await signin(emailRef.current.value, passwordRef.current.value);

//       navigate('/')

//     } catch {
//       setFetchError('Failed to sign in');
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="flex items-center justify-center">
//         <img src="/PodHub-nav-logo.png" alt="PodHub Logo" className="w-80 h-40 p-5 rounded-3xl" />
//       </div>
//       <form className="flex flex-col border-solid border-2 border-black rounded-xl m-0 mx-auto p-3" onSubmit={handleSubmit}>
//         <h3 className="text-2xl mt-0 text-center">Sign In</h3>
//         {fetchError && <Alert severity="error">{fetchError}</Alert>}
//         <TextField
//           label="Email"
//           type="email"
//           name="email"
//           autoComplete="on"
//           variant="outlined"
//           size="small"
//           margin="dense"
//           className="w-72"
//         />
//         <TextField
//           label="Password"
//           type="password"
//           name="password"
//           autoComplete="off"
//           variant="outlined"
//           size="small"
//           margin="dense"
//           className="w-72"
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           disabled={loading}
//           className="w-36 self-center"
//         >
//           Sign In
//         </Button>
//       </form>
//       <Button
//         variant="text"
//         className="p-5 bg-none underline cursor-pointer text-center"
//         onClick={() => props.onFormSwitch('register')}
//       >
//         Don`t have an account? Register here.
//       </Button>
//     </div>
//   );
// }

// SignIn.propTypes = {
//   onFormSwitch: PropTypes.func
// }

// export default SignIn
