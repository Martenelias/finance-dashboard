import { useFetchData } from '../../../utils/DashboardIncomeExpenseFetch';
import DashboardData from './DashboardIncomeExpenseData';

const DashboardBalance = () => {
  const { total: incomeTotal } = useFetchData('incomes');
  const { total: expensesTotal } = useFetchData('expenses');
  const balance = incomeTotal - expensesTotal;

  return <DashboardData title='Current Balance' amount={balance} />;
};

export default DashboardBalance;
