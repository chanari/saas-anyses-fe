import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {callAPI} from "../controllers/api";
import {useNavigate} from "react-router-dom";
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {useEffect} from "react";
import {gapi} from "gapi-script";
import {useGlobalContext} from "../contexts/GlobalContext";
import {Avatar, Box, Grid, Paper} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {ReactComponent as LoginLogo} from "../login.svg"

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ""

const Login = () => {
  const {dispatch} = useGlobalContext()
  const navigate = useNavigate()

  const onSuccess = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('accessToken' in response ) {
      try {
        const resp = await callAPI({
          path: "/api/v1/users",
          method: "post",
          body: {
            user: {access_token: response.accessToken}
          },
        })
        dispatch({type: "SET_SNACKBAR", payload: {message: 'logged in', severity: 'success'}})
        if (resp) localStorage.setItem('authorization-token', resp.headers['authorization'] ?? '')
        navigate("/leaves")
      } catch (e) {
        console.error(e)
      }
    }
  }

  const onFailure = (err: any) => {
    console.log('failed:', err)
  }

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "email profile",
      })
    }
    gapi.load('client:auth2', initClient);
  }, []);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{backgroundColor: "#EFEFEF"}}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 1 }}>
            <GoogleLogin
              clientId={CLIENT_ID}
              render={renderProps => (
                <button
                  style={{border: "none", marginTop: "1rem"}}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <LoginLogo />
                </button>
              )}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
