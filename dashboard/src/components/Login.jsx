import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const Login = ({ setToken, apiUrl}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const [loginSuccess, setLoginSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess === false) {
      const timer = setTimeout(() => {
        setLoginSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess]);

  const handleDismissPopup = () => {
    setLoginSuccess(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true); // Show loading state while processing
    setLoginSuccess(null); // Reset login success state

    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password});
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Login error:', error);
      setLoginSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-background-700 flex justify-end bg-[url("/bg_image.jpg")] bg-cover'>
      <div className='min-h-screen max-w-[800px] w-full bg-primary-50 flex flex-col justify-between items-center p-10'>
        <div>
          <h2 className='font-poppins text-xl text-background-500'>Sign in</h2>
        </div>
        <div>
          <form className='flex flex-col justify-center items-center gap-2' onSubmit={handleLogin}>
            <div className='flex flex-col justify-center items-start w-[300px]'>
              <label className='text-background-200 py-2' htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email@email.com'
                className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'   
              />
            </div>
            <div className='flex flex-col justify-center items-start w-[300px]'>
              <label className='text-background-200 py-2' htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='*******'
                className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'
              />
            </div>
            <div className='w-[300px]'>
              <button className='bg-primary-500 hover:bg-primary-700 text-primary-50 w-full py-2 px-4 rounded-md mt-6' type='submit' disabled={loading}>Log in</button>
              <div className='flex justify-center items-center mt-4 gap-2'>
                <p className='text-background-500'>Dont have an account?</p>
                <button className='underline hover:text-background-200' type='button' onClick={() => navigate('/signup')}>Sign up!</button>
              </div>
            </div>
          </form>
        </div>

        {/* Loading/Success Popup */}
        {loading && (
          <div className='fixed inset-0 bg-background-700 bg-opacity-75 flex justify-center items-center z-50'>
            <div className='bg-primary-50 p-6 rounded-md'>
              <p className='text-center text-xl'>Logging in...</p>
            </div>
          </div>
        )}

        {loginSuccess !== null && (
          <div onClick={handleDismissPopup} className='fixed inset-0 bg-background-700 bg-opacity-75 flex justify-center items-center z-50'>
            <div className='bg-primary-50 p-6 rounded-md'>
              <p className='text-center text-2xl text-primary-500'>
                {loginSuccess ? 'Login Successful!' : 'Login Failed! Please try again.'}
              </p>
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
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  apiUrl: PropTypes.string.isRequired,
};

export default Login;