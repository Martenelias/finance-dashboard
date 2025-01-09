import { ReportsList, ReportsByMonth, SavingsReport, YearEndSummary } from '../utils/GetReports';

const Reports = () => {
  return (
    <div className='p-4 w-full flex flex-col justify-between font-poppins overflow-y-auto text-primary-50 '>
      <div className='flex flex-col justify-between items-center h-full gap-4'>
        <h1 className='text-xl w-full mb-6 mt-12 lg:mt-0'>Reports</h1>
        <div className='flex flex-col justify-center items-center gap-6 w-full bg-background-500 rounded-lg p-4'>
          <div className='flex flex-col justify-center items-center w-full gap-6'>
            <div className='flex justify-between items-center w-full text-base lg:text-lg text-background-200 border-b py-4 border-background-200'>
              <p className='w-full'>Month</p>
              <p className='w-full'>Total Income</p>
              <p className='w-full'>Total Expense</p>
              <p>Balance</p>
            </div>
            <div className='flex w-full'>
              <ReportsList />
            </div>
          </div>
        </div>
        <div className='h-full w-full'>
          <ReportsByMonth />
        </div>
        <div className='h-full w-full'>
          <SavingsReport />
        </div>
        <div className='h-full w-full'>
          <YearEndSummary />
        </div>
      </div>
    </div>
  );
};

export default Reports;