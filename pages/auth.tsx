import React, { useCallback } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { auth, provider } from 'firebase';
import { signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface AuthProps {
  redirectUrl?: string;
}

const Auth: React.FC<AuthProps> = ({ redirectUrl }) => {
  const { replace } = useRouter();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      await signInWithPopup(auth, provider);
      replace(redirectUrl ?? "/");
    } catch (err) {
      window.alert("Sorry, but you are not an authorized user!");
    }
  }, [redirectUrl, replace]);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }} maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        User Login
      </Typography>
      <Button
        startIcon={<Image src="/google_logo.png" height={30} width={30} alt="Google Icon" />}
        onClick={handleGoogleSignIn}
        variant="outlined"
        sx={{ mt: 2 }}
      >
        <Typography sx={{ ml: 1 }}>Sign In With Google</Typography>
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        By signing in, you agree to our Terms and Conditions.
      </Typography>
    </Container>
  );
};

export default Auth;
