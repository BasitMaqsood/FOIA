import React, { useState } from 'react';
import Joi from 'joi-browser';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import { signInSchema } from 'utils/schema';

import { AuthService } from 'services';
import { toast } from 'react-toastify';

const toastTime = {
  autoClose: 2500,
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Nikist
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  let ref = React.useRef();
  const classes = useStyles();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(false);

  function validateProperty({ key, value }) {
    const obj = { [key]: value };

    const schema = { [key]: signInSchema[key] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  async function validate(loginObj) {
    const options = { abortEarly: false };
    const { error } = Joi.validate(loginObj, signInSchema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  const handleChanage = ({ target: { id: key, value } }) => {
    const errorMessage = validateProperty({ key, value });
    let tempError = { ...error };
    if (errorMessage) {
      if (
        key === 'email' &&
        !errorMessage.includes('"Email" is not allowed to be empty')
      ) {
        tempError[key] = 'Email is  Invalid';
      } else {
        tempError[key] = errorMessage;
      }
    } else {
      delete tempError[key];
    }
    setError(tempError);
    eval('set' + key + '(value)');
  };

  const handleSignIn = async () => {
    setDisabled(true);
    ref.current.complete();
    const loginObj = {
      username,
      password,
    };
    const error = await validate(loginObj);

    if (
      error &&
      error.email &&
      !error.email.includes('"Email" is not allowed to be empty')
    ) {
      error.email = 'Email is Invalid';
    }

    setError(error ? { ...error } : {});

    if (error) {
      return;
    }

    try {
      const response = await AuthService.login(loginObj);
      if (response.status === 200) {
        toast.info('You have successfully logged in', toastTime);
        props.setIsloggedin(true);
        setDisabled(false);
      }
    } catch (ex) {
      toast.error(ex.response.data, toastTime);
      setDisabled(false);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <LoadingBar height={3} color="#3A529C" ref={ref} />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={error.username ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            helperText={error.username ? error.username : null}
            autoFocus
            onChange={handleChanage}
          />
          <TextField
            error={error.password ? true : false}
            helperText={error.password ? error.password : null}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChanage}
          />
          <Button
            fullWidth
            onClick={handleSignIn}
            variant="contained"
            color="primary"
            disabled={disabled}
            className={classes.submit}>
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
