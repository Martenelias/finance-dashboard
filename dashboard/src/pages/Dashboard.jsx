import { Search, TrendingUp, TrendingDown, Calendar, ChevronDown } from'lucide-react';
import { NavLink } from 'react-router-dom';
import BudgetCard from '../components/Dashboard/BudgetCard';
import TransactionsCard from '../components/Dashboard/TransactionsCard';
import AnalyticsCard from '../components/Dashboard/AnalyticsCard';
import DashboardIncome from '../components/Dashboard/IncomeAndExpense/DashboardIncome';
import DashboardExpenses from '../components/Dashboard/IncomeAndExpense/DashboardExpense';
import DashboardBalance from '../components/Dashboard/IncomeAndExpense/DashboardBalance';

const Dashboard = () => {

  const month = new Date().getMonth()+1;
  const year = new Date().getFullYear();
  const day = new Date().getDate();
  const currentTime = day + '. ' + month + '. ' + year;

  return (
    <div className='p-4 w-full h-screen flex flex-col justify-between font-poppins overflow-y-auto'>
      <div className='flex justify-between items-center mb-4 mt-14'>
        <h1 className='text-lg text-primary-50'>Welcome back!</h1>
        <div className='bg-background-500 py-1 px-4 text-primary-50 lg:flex hidden items-center gap-4 rounded-md'>
          <input className='text-sm text-background-200 bg-transparent border-none w-full' placeholder='Searching for something...' />
          <Search width={16} />
        </div>
      </div>
      <div className='lg:grid flex flex-col justify-center items-center lg:grid-cols-6 lg:grid-rows-5 gap-4 md:mx-40 lg:mx-0'>
          <div className='lg:col-span-2 bg-background-500 lg:h-40 w-full h-40 rounded-xl'>
            <div className='p-4 flex justify-between items-center h-full'>
              <div className='bg-primary-500 text-primary-50 rounded-md p-2'>
                <TrendingUp size={40} />
              </div>
              <DashboardIncome />
              <div className='p-2 bg-primary-900 rounded-md text-primary-50'>
                <p>+1.35%</p>
              </div>
            </div>
          </div>
          <div className='lg:col-span-2 lg:col-start-3 bg-background-500 w-full h-40 lg:h-full rounded-xl'>
            <div className='p-4 flex justify-between items-center h-full'>
              <div className='bg-secondary-500 text-primary-50 rounded-md p-2'>
                <TrendingDown size={40} />
              </div>
              <DashboardExpenses />
              <div className='p-2 bg-secondary-900 rounded-md text-primary-50'>
                <p>-1.05%</p>
              </div>
            </div>
          </div>
          <div className='lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:h-full bg-background-500 w-full h-64 rounded-xl'>
            <div className='p-4 flex flex-col justify-between items-center h-full'>
              <div className='flex justify-evenly items-center w-full'>
                <p className='text-primary-50 lg:text-base xl:text-lg text-lg'>My Card</p>
                <p className='flex justify-center items-center lg:text-base text-lg gap-2 text-background-200'><Calendar />{currentTime}</p>
              </div>
              <DashboardBalance />
              <div className=' flex justify-evenly items-center w-full'>
                <NavLink className='bg-primary-500 rounded-md py-2 px-4 lg:text-sm xl:text-base text-base text-primary-50 hover:bg-primary-700' to='/incomes'>Add Income</NavLink>
                <NavLink className='bg-secondary-500 rounded-md py-2 px-4 lg:text-sm xl:text-base text-base text-primary-50 hover:bg-secondary-700' to='/expenses'>Add Expense</NavLink>
              </div>
            </div>
          </div>
          <div className='lg:block lg:col-span-4 lg:row-span-2 lg:row-start-2 lg:h-full bg-background-500 hidden rounded-xl'>
            <div className='p-4 flex flex-col justify-between items-center h-full'>
              <div className='flex justify-evenly items-center w-full text-primary-50'>
                <p className='lg:text-base xl:text-lg text-lg w-full px-6'>Analytics</p>
                <div className='flex justify-evenly items-center w-full'>
                  <div className='flex justify-center items-center gap-2'>
                    <p className='bg-primary-500 w-2 h-2 rounded'></p>
                    <p>Income</p>
                  </div>
                  <div className='flex justify-center items-center gap-2'>
                    <p className='bg-secondary-500 w-2 h-2 rounded'></p>
                    <p>Expense</p>
                  </div>
                  <div className='text-background-200 flex justify-center items-center gap-2 border border-background-200 p-2 rounded-lg'>
                    <p>2024</p>
                    <ChevronDown />
                  </div>
                </div>
              </div>
              <div className='w-full h-full mt-2 flex flex-col justify-between items-center text-background-200'>
                <div className='flex justify-between items-center w-full h-full'>
                  <div className='flex flex-col justify-between items-end h-full'>
                    <p>5000</p>
                    <p>4000</p>
                    <p>3000</p>
                    <p>2000</p>
                    <p>0</p>
                  </div>
                  <div className='w-full h-full'>
                    <AnalyticsCard />
                  </div>
                </div>
                <div className='flex justify-evenly items-center w-full pl-12 pr-4'>
                  <p className='w-full'>May</p>
                  <p className='w-full'>Jun</p>
                  <p className='w-full'>Jul</p>
                  <p className='w-full'>Aug</p>
                  <p className='w-full'>Sept</p>
                  <p className='w-full'>Okt</p>
                  <p>Nov</p>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:block lg:col-span-4 lg:row-span-2 lg:col-start-1 lg:row-start-4 lg:h-full bg-background-500 hidden rounded-xl'>
            <div className='p-4 flex flex-col justify-between items-center h-full text-primary-50'>
              <div className='flex justify-evenly items-center w-full'>
                <p className='lg:text-base xl:text-lg text-lg'>Transactions</p>
                <div className='flex justify-center items-center bg-background-700 py-2 px-4 rounded-lg gap-2 text-background-200'>
                  <input className='bg-transparent' type='text' placeholder='Search transactions...' />
                  <Search />
                </div>
                <div className='flex justify-center items-center gap-2 text-background-200 border border-background-200 rounded-lg p-2'>
                  <Calendar />
                  <p>{currentTime}</p>
                  <ChevronDown />
                </div>
              </div>
              <div className='flex flex-col justify-between items-center w-full h-full pt-4 gap-4'>
                <div className=' p-2 flex justify-between items-center w-full text-background-200 border-b border-background-200'>
                  <p className='w-full'>Description</p>
                  <p className='w-full'>Amount</p>
                  <p>Date</p>
                </div>
                <div className='w-full h-full'>
                  <TransactionsCard />
                </div>
              </div>
            </div>
          </div>
          <div className='lg:block lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-3 lg:h-full bg-background-500 hidden rounded-xl'>
            <BudgetCard />
          </div>
          <div className='lg:col-span-2 lg:col-start-5 lg:row-start-5 bg-secondary-500 w-full h-40 rounded-xl'>
            <div className='p-4 flex justify-between flex-col items-center h-full'>
              <div className='flex justify-evenly items-center text-primary-50 text-base w-full'>
                <p>Pro Version</p>
                <p>€95.99</p>
              </div>
              <p className='text-primary-50 text-sm'>Upgrade today for discount!</p>
              <button className='lg:text-base xl:text-lg text-lg text-primary-50 bg-primary-500 hover:bg-primary-700 rounded-md py-2 px-4 lg:w-auto w-full'>Upgrade</button>
            </div>
          </div>
      </div>

    </div>
  );
};

export default Dashboard;
