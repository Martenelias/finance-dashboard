import { IncomesList, AddIncomes } from '../utils/GetIncomes';

const Incomes = () => {
  return (
    <div className='p-4 w-full flex flex-col justify-between font-poppins overflow-y-auto text-primary-50 '>
      <div className='flex flex-col justify-between items-center h-full'>
        <h1 className='text-xl w-full mb-6 mt-12 lg:mt-0'>Incomes</h1>
        <div className='flex flex-col justify-center items-center gap-6 w-full bg-background-500 rounded-lg p-4'>
          <div className='flex flex-col justify-center items-center w-full gap-6'>
            <div className='flex justify-between items-center w-full text-base lg:text-lg text-background-200 border-b py-4 border-background-200'>
              <p className='w-full'>Description</p>
              <p className='w-full'>Amount</p>
              <p className='w-full'>Date</p>
              <p></p>
            </div>
            <div className='flex w-full'>
              <IncomesList />
            </div>
          </div>
        </div>
        <div className='h-full w-full'>
          <AddIncomes />
        </div>
      </div>
    </div>
  );
};

export default Incomes;