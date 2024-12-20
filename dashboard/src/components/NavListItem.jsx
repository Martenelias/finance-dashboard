import { NavLink } from 'react-router-dom';

const NavListItem = ({ to, Icon, label }) => {
  return (
    <li className='flex rounded items-center hover:bg-primary-50 hover:text-background-500'>
      <NavLink
        className='lg:text-sm xl:text-base flex justify-center items-center gap-2 py-2 px-4'
        to={to}
      >
        <Icon width={16} />
        <p className='lg:hidden xl:block'>{label}</p>
      </NavLink>
    </li>
  );
};

export default NavListItem;
