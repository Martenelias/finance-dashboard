import { useFetchData } from '../../../utils/DashboardIncomeExpenseFetch';
import DashboardData from './DashboardIncomeExpenseData';

const DashboardExpenses = () => {
  const { total } = useFetchData('expenses');
  return <DashboardData title='Total Expenses' amount={total} />;
};

export default DashboardExpenses;
