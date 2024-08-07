// 'use client'
// import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
// import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Link, Container, Divider } from '@mui/material';
// import Image from 'next/image';
// import { useFormStatus } from 'react-dom';
// import { RegisterUser } from '@/app/api/register/RegisterUser';
// import NotificationContext from "@/context/NotificationContext";
// import { Notification } from '../notification/Notification';

// interface UserData {
//   email: string;
//   password: string;
//   confirmPassword: string;
//   location: string;
//   phone: string;
// }

// const Register: React.FC = () => {
//   const [userData, setUserData] = useState<UserData>({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     location: "",
//     phone: "",
//   });

//   const { pending } = useFormStatus();
//   const notificationCtx = useContext(NotificationContext);
//   const [notification, setNotification] = useState<{ status: string, message: string }>({ status: 'none', message: '' });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUserData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     console.log("formData:", formData);

//     // Reset the notification state to an intermediate state
//     setNotification({ status: 'none', message: '' });

//     const result = await RegisterUser(formData);
//     console.log("result:", result); // Handle the response from the server action
//     console.log("error", result.error);
//     if (result.success) {
//       console.log("inside register");
//       setNotification({
//         status: "success",
//         message: result.message || "User successfully Registered.",
//       });
//     } else {
//       console.log("inside fail register");
//       setNotification({
//         status: "error",
//         // message: result.error as string || "User Registration failed.",
//         message: "User Registration failed.",
//       });
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           mt: 4,
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             width: '100%',
//           }}
//         >
//           <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
//             <Image
//               src='/logo/book.png'
//               width={60}
//               height={40}
//               alt='Logo'
//             />
//             <Typography variant="h4" component="h1" gutterBottom sx={{ ml: 2 }}>
//               Book Rent
//             </Typography>
//           </Box>
//           <Typography variant="h6" component="h2" gutterBottom sx={{ width: '100%' }}>
//             Signup into Book Rent
//           </Typography>
//           <Divider sx={{ width: '100%', mb: 2 }} />
//         </Box>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             mt: 1,
//             width: '100%',
//           }}
//         >
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             type="email"
//             autoComplete="email"
//             autoFocus
//             value={userData.email}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={userData.password}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             id="confirmPassword"
//             value={userData.confirmPassword}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="location"
//             label="Location"
//             id="location"
//             value={userData.location}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="phone"
//             label="Phone Number"
//             id="phone"
//             value={userData.phone}
//             onChange={handleChange}
//           />
//           <FormControlLabel
//             control={<Checkbox value="terms" color="primary" />}
//             label="I accept the Terms and Conditions"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3, mb: 2 }}
//             disabled={pending}
//           >
//             {pending ? 'Submitting...' : 'Sign Up'}
//           </Button>
//           <Typography variant="body2" color="textSecondary" align="center">
//             Already have an account?{' '}
//             <Link href="/login" variant="body2">
//               Login
//             </Link>
//           </Typography>
//         </Box>
//       </Box>
//       <Notification key={notification.status + notification.message} status={notification.status} message={notification.message} />
//     </Container>
//   );
// };

// export default Register;
'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Link, Container, Divider } from '@mui/material';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import { RegisterUser } from '@/app/api/register/RegisterUser';
import { useNotification } from '@/context/NotificationContext';
import { Notification } from '../notification/Notification';

interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
  phone: string;
}

const Register: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    phone: "",
  });

  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { pending } = useFormStatus();
  const { setNotification } = useNotification();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'terms') {
      setTermsAccepted(checked); 
    } else {
      setUserData(prevState => ({
        ...prevState,
        [name]: value, 
      }));
    }
    // Clear the error for the field that is being edited 
    setErrors(prevState => ({
      ...prevState,
      [name]: '',
    }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!userData.email) newErrors.email = 'Email is required';
    if (!userData.password) newErrors.password = 'Password is required';
    if (userData.password !== userData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!userData.location) newErrors.location = 'Location is required';
    if (!userData.phone) newErrors.phone = 'Phone number is required';

    // Regex validation for phone number
    if (userData.phone && !/^\d+$/.test(userData.phone)) {
      newErrors.phone = 'Phone number must contain only digits';
    }

    if (!termsAccepted) newErrors.terms = 'You must accept the Terms and Conditions';

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop submission if there are validation errors
    }
    
    // Reset the notification state
    setNotification({ status: 'none', message: '' });

    const formData = new FormData(e.currentTarget);
    const result = await RegisterUser(formData);
    console.log(result)
    if (result.success) {
      setNotification({
        status: 'success',
        message: result.message || 'User successfully Registered.',
      });
    } else {
      setNotification({
        status: 'error',
        message:  result.error as string || 'User Registration failed.',
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
            Signup into Book Rent
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
            // required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={userData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            name="location"
            label="Location"
            id="location"
            value={userData.location}
            onChange={handleChange}
            error={Boolean(errors.location)}
            helperText={errors.location}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            name="phone"
            label="Phone Number"
            id="phone"
            value={userData.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="terms"
                color="primary"
                checked={termsAccepted}
                onChange={handleChange}
              />
            }
            label="I accept the Terms and Conditions"
          />
          {errors.terms && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.terms}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={pending}
          >
            {pending ? 'Submitting...' : 'Sign Up'}
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            Already have an account?{' '}
            <Link href="/login" variant="body2">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
      <Notification />
    </Container>
  );
};

export default Register;
