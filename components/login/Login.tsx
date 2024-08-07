'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button, Typography, Link, Container, Divider } from '@mui/material';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import { LoginUser } from '@/app/api/login/LoginUser'; 
import { useNotification } from '@/context/NotificationContext';
import { Notification } from '../notification/Notification';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { pending } = useFormStatus();
  const { setNotification } = useNotification();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value,
    }));

         // Clear the error for the field that is being edited
        setErrors(prevState => ({
      ...prevState,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!loginData.email) newErrors.email = 'Email is required';
    if (!loginData.password) newErrors.password = 'Password is required';

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setNotification({ status: 'none', message: '' });

    const formData = new FormData(e.currentTarget);
    const result = await LoginUser(formData);
    console.log("result:", result)
    if (result.success) {

      // let us save token to local storage 
      localStorage.setItem("bearer_token", JSON.stringify(result.token))
      setNotification({
        status: 'success',
        message: result.message || 'Login successful.',
      });
    } else {
      setNotification({
        status: 'error',
        message: 'Login failed.',
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
            <Image
              src='/logo/book.png'
              width={60}
              height={40}
              alt='Logo'
            />
            <Typography variant="h4" component="h1" gutterBottom sx={{ ml: 2 }}>
              Book Rent
            </Typography>
          </Box>
          <Typography variant="h6" component="h2" gutterBottom sx={{ width: '100%' }}>
            Login to Book Rent
          </Typography>
          <Divider sx={{ width: '100%', mb: 2 }} />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            width: '100%',
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={loginData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={pending}
          >
            {pending ? 'Submitting...' : 'Login'}
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            Don't have an account?{' '}
            <Link href="/register" variant="body2">
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
      <Notification />
    </Container>
  );
};

export default Login;
