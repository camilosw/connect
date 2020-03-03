import React, { useState } from 'react';
import { useUser } from 'components/AuthProvider';
import { auth, uiConfig } from 'helpers/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Modal from 'components/Modal';
import Button from './Button';

const AuthButton = () => {
  const user = useUser();
  const [showSignin, setShowSignin] = useState(false);

  const logout = () => {
    setShowSignin(false);
    auth.signOut();
  };

  if (user) {
    return <Button onClick={logout}>Logout</Button>;
  }

  return (
    <>
      <Button onClick={() => setShowSignin(true)}>Login</Button>
      {showSignin && (
        <Modal onHide={() => setShowSignin(false)}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </Modal>
      )}
    </>
  );
};

export default AuthButton;
