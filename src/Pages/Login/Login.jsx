import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Login() {
  const [currentForm, setCurrentForm] = useState('register');

  function toggleForm(formName) {
    setCurrentForm(formName);
  }

  return (
    <>
      {currentForm === 'register' ? (
        <SignUp onFormSwitch={toggleForm} />
      ) : (
        <SignIn onFormSwitch={toggleForm} />
      )}
    </>
  );
}
