import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavListItem from '../components/NavListItem';
import SmallNavListItem from '../components/SmallNavListItem';
import PropTypes from 'prop-types';
import { Menu, X, House, BookmarkCheck, TrendingUp, TrendingDown, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';

const Nav = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  );

  const avatars = [
    'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  ];

  return (
    <>
      <div className='hidden lg:flex xl:flex lg:w-24 xl:w-80 w-screen min-h-screen p-4'>
        <nav className='flex flex-col justify-between items-center rounded-md bg-background-500 py-5 w-full'>
          <div className='flex flex-col justify-center lg:items-center xl:items-start w-full xl:px-5'>
            <img className='xl:flex hidden xl:h-7 mb-12 w-full' src='/logo_light.svg' alt='Pennywise light logo' />
            <img className='block xl:hidden lg:h-4 mb-12' src='/only_logo.svg' alt='Small Pennywise logo for finance tracker' />
            <ul className='text-primary-50 flex flex-col lg:justify-center xl:justify-start lg:gap xl:gap-2 xl:w-full'>
              <NavListItem to='/dashboard' Icon={House} label='Dashboard' />
              <NavListItem to='/budgets' Icon={BookmarkCheck} label='Budgets' />
              <NavListItem to='/incomes' Icon={TrendingUp} label='Incomes' />
              <NavListItem to='/expenses' Icon={TrendingDown} label='Expenses' />
              <NavListItem to='/reports' Icon={LayoutDashboard} label='Reports' />
              <hr className='my-5' />
              <li className='flex rounded items-center hover:bg-primary-50 hover:text-background-500'>
                <button className='lg:text-sm xl:text-base flex justify-center items-center gap-2 py-2 px-4' onClick={handleLogout}>
                  <LogOut width={16}/>
                  <p className='lg:hidden xl:block'>Logout</p>
                </button>
              </li>
            </ul>
          </div>
          <div className='relative flex items-center xl:gap-4 lg:gap lg:flex-col xl:flex-row'>
            {/* Current Avatar */}
            <img
              className='inline-block w-8 h-8 rounded-full ring-1'
              src={selectedAvatar}
              alt='Selected avatar'
            />
            <p className='text-sm text-primary-50 lg:hidden xl:block'>Maali Maasikas</p>

            {/* Chevron Button */}
            <button className='text-primary-50' onClick={() => setOptions(!options)}>
              <ChevronDown />
            </button>

            {/* Dropdown */}
            {options && (
              <div className='absolute left-0 top-[-100px] bg-background-700 rounded-md p-4 shadow-lg w-40'>
                <p className='text-primary-50 font-OpenSans mb-2'>Choose Avatar:</p>
                <div className='flex justify-center gap-2'>
                  {avatars.map((avatar, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setOptions(false);
                      }}
                      className='flex-shrink-0'
                    >
                      <img
                        className='w-6 h-6 rounded-full ring-1 ring-primary-50'
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
      

      <div className='flex justify-between items-center w-full bg-background-900 lg:hidden fixed p-2'>
        <button
          className=' top-4 left-4 z-50 p-2 rounded-md text-white'
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </button>
        <img src='/logo_light.svg' alt='Pennywise light logo' />
        <div></div>
      </div>
      

      <div
        className={`lg:hidden fixed top-0 left-0 w-full min-h-screen flex bg-background-500 p-4 space-y-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-40`}
      >
        <button
          className='absolute top-4 right-4 text-white'
          onClick={() => setIsOpen(false)}
        >
          <X />
        </button>
        <div className='flex flex-col justify-between py-5 w-full'>
          <ul className='text-primary-50 flex flex-col gap-4'>
            <SmallNavListItem to='/dashboard' Icon={House} label='Dashboard' />
            <SmallNavListItem to='/budgets' Icon={BookmarkCheck} label='Budgets' />
            <SmallNavListItem to='/incomes' Icon={TrendingUp} label='Incomes' />
            <SmallNavListItem to='/expenses' Icon={TrendingDown} label='Expenses' />
            <SmallNavListItem to='/reports' Icon={LayoutDashboard} label='Reports' />
            <hr className='my-5' />
            <li className='flex gap-2 mx-5 py-2 px-4 rounded items-center hover:bg-primary-50 hover:text-background-500'>
              <LogOut width={16}/>
              <NavLink className='text-sm' to='/login'>
                <button onClick={handleLogout}>Logout</button>
              </NavLink>
            </li>
          </ul>
          <div className='relative flex items-center gap-4 ml-5'>
            {/* Current Avatar */}
            <img
              className='inline-block w-10 h-10 rounded-full ring-1'
              src={selectedAvatar}
              alt='Selected avatar'
            />
            <p className='text-base text-primary-50'>Maali Maasikas</p>

            {/* Chevron Button */}
            <button className='text-primary-50' onClick={() => setOptions(!options)}>
              <ChevronDown />
            </button>

            {/* Dropdown */}
            {options && (
              <div className='absolute left-0 top-[-150px] bg-background-700 rounded-md p-4 shadow-lg'>
                <p className='text-primary-50 font-OpenSans mb-2'>Choose Avatar:</p>
                <div className='flex gap-2'>
                  {avatars.map((avatar, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setOptions(false);
                      }}
                      className='flex-shrink-0'
                    >
                      <img
                        className='w-12 h-12 rounded-full ring-2 ring-primary-50'
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
    
  );
};

Nav.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Nav;