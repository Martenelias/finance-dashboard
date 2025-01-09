import { useFetchData } from '../../../utils/DashboardIncomeExpenseFetch';
import DashboardData from './DashboardIncomeExpenseData';

const DashboardIncome = () => {
  const { total } = useFetchData('incomes');
  return <DashboardData title='Total Income' amount={total} />;
};

export default DashboardIncome;
