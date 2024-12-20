import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const Register = ({ apiUrl }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    setRegistrationSuccess(false);

    try {
      const adminLoginResponse = await axios.post(`${apiUrl}/login`, {
        email: 'maali@maasikas.ee',
        password: 'maali',
      });

      const adminToken = adminLoginResponse.data.token;
      if (!adminToken) {
        throw new Error('Failed to authenticate as admin');
      }

      const response = await axios.post(
        `${apiUrl}/users`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: 'user',
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.data.success) {
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setRegistrationSuccess(false);
      }
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message);
      alert('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className='min-h-screen bg-background-700 flex justify-end bg-[url("/bg_image.jpg")]'>
      <div className='min-h-screen max-w-[800px] w-full bg-primary-50 flex flex-col justify-between items-center p-10'>
        <div>
          <h2 className='font-poppins text-xl text-background-500'>Create Account</h2>
        </div>
        <div>
          <form className='flex flex-col justify-center items-center gap-2' onSubmit={handleRegister}>
            <div className='flex flex-col justify-center items-start w-[300px]'>
              <label className='text-background-200 py-2' htmlFor='firstName'>First Name</label>
              <input
                type='firstName'
                name='firstName'
                value={formData.first_name}
                onChange={handleChange}
                placeholder='Maali'
                className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'   
              />
            </div>
            <div className='flex flex-col justify-center items-start w-[300px]'>
              <label className='text-background-200 py-2' htmlFor='lastName'>Last Name</label>
              <input
                type='lastName'
                name='lastName'
                value={formData.last_name}
                onChange={handleChange}
                placeholder='Maasikas'
                className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'   
              />
            </div>
            <div className='flex flex-col justify-center items-start w-[300px]'>
              <label className='text-background-200 py-2' htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='email@email.com'
                className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'   
              />
            </div>
            <div className='flex flex-col justify-center items-start w-[300px]'>
              <label className='text-background-200 py-2' htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange} 
                placeholder='*******'
                className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'
              />
            </div>
            <div className='w-[300px]'>
              <button className='bg-primary-500 hover:bg-primary-700 text-primary-50 w-full py-2 px-4 rounded-md mt-6' type='submit' disabled={loading}>{loading ? 'Registering...' : 'Sign up'}</button>
              <div className='flex justify-center items-center mt-4 gap-2'>
                <p className='text-background-500'>Dont have an account?</p>
                <button className='underline hover:text-background-200' type='button' onClick={() => navigate('/')}>Log in!</button>
              </div>
            </div>
          </form>
        </div>

        {loading && (
          <div className='fixed inset-0 bg-background-700 bg-opacity-75 flex justify-center items-center z-50'>
            <div className='bg-primary-50 p-6 rounded-md'>
              <p className='text-center text-xl text-background-500'>Registering...</p>
            </div>
          </div>
        )}

        {registrationSuccess && (
          <div className='fixed inset-0 bg-background-700 bg-opacity-75 flex justify-center items-center z-50'>
            <div className='bg-primary-50 p-6 rounded-md'>
              <p className='text-center text-2xl text-primary-500'>Registration Successful!</p>
            </div>
          </div>
        )}

        <div>
          <img src='/logo_dark.svg' alt='Pennywise finance tracker application' />
        </div>
      </div>
    </div>
  );
};
Register.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default Register;