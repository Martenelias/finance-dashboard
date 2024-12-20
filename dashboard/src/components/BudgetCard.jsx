import { ChevronDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const radius = 70;
const stroke = 20;
const normalizedRadius = radius - stroke * 0.5;
const circumference = normalizedRadius * 2 * Math.PI;
const progress = 75;
const offset = circumference - (progress / 100) * circumference;

const BudgetCard = () => {

  
  return (
    <div className='p-4 flex flex-col justify-between items-center h-full text-primary-50'>
      <div className='flex justify-evenly items-center w-full'>
        <p className='lg:text-base xl:text-lg text-lg'>Budget</p>
        <div className='flex justify-center items-center gap-2 text-background-200 border border-background-200 p-2 rounded-lg'>
          <p>Month</p>
          <ChevronDown />
        </div>
      </div>
      <div>
        <div className='flex justify-center items-center'>
        <svg height={radius * 2} width={radius * 2} className='relative'>
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill='transparent'
            stroke='#3EAC91'
            strokeWidth={stroke}
          />
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill='transparent'
            stroke='#8B79F1'
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap='round'
            transform={`rotate(-90 ${radius} ${radius})`}
          />
          <text
            x='50%'
            y='50%'
            textAnchor='middle'
            alignmentBaseline='middle'
            fontSize='30'
            fill='#ECF7F4'
          >
            {progress}%
          </text>
        </svg>
      </div>
      </div>
      <div className='flex justify-between items-center w-full'>
        <div className='flex justify-center items-center gap-2'>
          <p className='w-2 h-2 bg-primary-500 rounded'></p>
          <p className='text-sm'>Remaining Budget</p>
        </div>
        <NavLink className='bg-secondary-500 rounded-md py-2 px-4 lg:text-sm xl:text-base text-base text-primary-50 hover:bg-secondary-700' to='/budgets'>
          Change Budget
        </NavLink>
      </div>
    </div>
  );
};

export default BudgetCard;