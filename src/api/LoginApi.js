import * as React from 'react';
import { useRef, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { tokens } from '../theme';
import { shadows } from '@mui/system';

// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import {Box, Typography, Grid, Link,Checkbox, FormControlLabel, TextField, CssBaseline, Button, Avatar, useTheme} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';

// import axios from "axios";
import axios from "./axios";
const LOGIN_URL = '/api/auth';

const LoginApi = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { setAuth, persist, setPersist } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        // console.log(user, pwd)

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({email:user, password:pwd}), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.token;
            const role = response?.data?.role;
            setAuth({ user, role, accessToken })
            setUser('')
            setPwd('')
            // setSuccess(true)
            // navigate(from, {replace: true});
            navigate('/');
        } catch (err) {
            if(!err?.response){
                setErrMsg('No Server Response')
            }else if(err.response?.status === 400){
                setErrMsg('Missing Username or Password')
            }else if(err.response?.status === 401){
                setErrMsg('Unauthorized')
            }else{
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        }        
    }

    const togglePersist = () => {
        setPersist(prev => !prev)
    }

    useEffect(() => {
        localStorage.setItem("persist", persist)
    }, [persist])

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box sx={{boxShadow: 3}} p="30px" borderRadius="5px" display="flex" flexDirection="column" alignItems="center" backgroundColor={colors.primary[400]} color={colors.grey[100]}>
            <Typography
            variant="p"
            fontWeight="600"
            color={colors.redAccent[100]}
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            >
            {errMsg}
            </Typography>
            {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
            <Typography variant='h2' fontWeight="bold">Connexion</Typography>
            {/* <h1>Sign In</h1> */}
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" alignItems="center">
                {/* <label htmlFor="username">Username :</label> */}
                <TextField 
                    sx={{ width:"368px", maxWidth:"368px"}}
                    fullWidth
                    margin="normal"
                    id="username"                    
                    label="Username"
                    ref={userRef}
                    autoComplete="off"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    autoFocus
                />
                {/* <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                /> */}
                {/* <label htmlFor="password">Password :</label> */}
                <TextField 
                    sx={{ width:"368px", maxWidth:"368px"}}
                    fullWidth
                    margin="normal"
                    id="password"
                    label="Password"
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                />
                {/* <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                /> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[600], fontSize: 16 }}
                    // backgroundColor={colors.greenAccent[300]}
                >
                    Connexion
                </Button>
                {/* <button>Sign In</button> */}
                <FormControlLabel
                    control={<Checkbox checked={persist} color="primary" onChange={togglePersist} />}
                    label="Trust This Device"                                        
                    />
                {/* <div className="persistCheck">
                    <input 
                        type="checkbox" 
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div> */}
            </Box>
            {/* <p> */}
                {/* Need an Account ?<br /> */}
                {/* <span className="line" > */}
                    {/* Put router link here */}
                    {/* <a href="#">Sign In</a> */}
                {/* </span> */}
            {/* </p> */}
        </Box>
    </Box>
  )
}

export default LoginApi