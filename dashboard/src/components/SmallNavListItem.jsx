import { NavLink } from 'react-router-dom';

const SmallNavListItem = ({ to, Icon, label }) => {
  return (
    <li className='flex gap-2 mx-5 py-2 px-4 rounded items-center hover:bg-primary-50 hover:text-background-500'>
      <Icon width={16}/>
      <NavLink className='text-sm' to={to}>
        {label}
      </NavLink>
    </li>
  );
};

export default SmallNavListItem;