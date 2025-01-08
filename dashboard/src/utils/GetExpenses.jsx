import axios from 'axios';
import { useState, useEffect } from 'react';
import { Trash2, Plus  } from 'lucide-react';
import moment from 'moment';

const API_URL = 'https://pennywise-api-sb4s.onrender.com';

const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    console.log('fetching expenses');
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const payload = decodeToken(token);
        const currentUserId = payload?.id;

        if (!currentUserId) {
          console.error('Current user ID not found in token');
          return;
        }

        const response = await axios.get(`${API_URL}/expenses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allExpenses = response.data.expenses;
        const userExpenses = allExpenses.filter(expense => expense.user_id === currentUserId);

        setExpenses(userExpenses);
      } catch (error) {
        console.error('Failed to fetch Expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this income?');
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.delete(`${API_URL}/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error('Failed to delete expense:', error.response?.data || error.message);
    }
  };

  return (
    <ul className='flex flex-col justify-evenly items-center w-full gap-2'>
      {expenses.length > 0 ? (
        expenses.map((expense) => (
          <li key={expense.id} className='flex justify-between w-full text-sm lg:text-base border-b py-2'>
            <p className='w-full'>{expense.description}</p>
            <p className='w-full'>€{expense.amount}</p>
            <p className='w-full'>{new Date(expense.transaction_date).toLocaleDateString()}</p>
            <button onClick={() => handleDelete(expense.id)}><Trash2 color='#963c3c' /></button>
          </li>
        ))
      ) : (
          <p>No expenses available</p>
      )}
    </ul>
  );
};

const AddExpenses = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddExpense = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    setSuccess(false);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const payload = decodeToken(token);
      const currentUserId = payload?.id;
  
      if (!currentUserId) {
        console.error('Current user ID not found in token');
        return;
      }
  
      if (!transactionDate) {
        console.error('Transaction date is required');
        setLoading(false);
        return;
      }
  
      const isValidDate = moment(transactionDate, 'YYYY-MM-DD', true).isValid();
      if (!isValidDate) {
        console.error('Invalid date format');
        setLoading(false);
        return;
      }
  
      const formattedDate = moment(transactionDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  
      const newExpense = {
        userId: currentUserId,
        categoryId: Number(category),
        amount: Number(amount),
        transactionDate: formattedDate,
        description,
        type: 'expense',
      };
  
      const response = await axios.post(`${API_URL}/expenses`, newExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        setSuccess(true);
        setDescription('');
        setAmount(0);
        setCategory('');
        setTransactionDate('');
        setTimeout(() => {}, 2000);
      } else {
        console.error('Failed to add expense:', response.data);
        setSuccess(false);
      }
    } catch (error) {
      console.error('Failed to add expense:', error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className='flex flex-col justify-between w-full pb-5'>
      <h2 className='text-xl w-full mb-6 mt-12 flex items-center gap-2'><Plus size={26}/>Add New Expense</h2>
      <div className=' flex flex-col justify-center items-start bg-background-500 p-4 rounded-lg'>
      <form className='flex flex-col justify-center items-center gap-2' onSubmit={handleAddExpense}>
        <div className='flex flex-col justify-center items-start w-[300px]'>
          <label className='text-background-200 py-2' htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Salary'
            className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'   
          />
        </div>
        <div className='flex flex-col justify-center items-start w-[300px]'>
          <label className='text-background-200 py-2' htmlFor='amount'>Amount</label>
          <input
            type='number'
            name='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='1000'
            className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'
          />
        </div>
        <div className='flex flex-col justify-center items-start w-[300px]'>
          <label className='text-background-200 py-2' htmlFor='category'>Category</label>
          <select
            name='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'
          >
            <option className='bg-background-500 hover:bg-background-700' value='1'>Salary</option>
            <option className='bg-background-500 hover:bg-background-700' value='2'>Groceries</option>
            <option className='bg-background-500 hover:bg-background-700' value='3'>Rent</option>
            <option className='bg-background-500 hover:bg-background-700' value='4'>Investment</option>
            <option className='bg-background-500 hover:bg-background-700' value='5'>Utilities</option>
            <option className='bg-background-500 hover:bg-background-700' value='6'>Dining Out</option>
            <option className='bg-background-500 hover:bg-background-700' value='7'>Freelance</option>
            <option className='bg-background-500 hover:bg-background-700' value='8'>Savings</option>
          </select>
        </div>
        <div className='flex flex-col justify-center items-start w-[300px]'>
          <label className='text-background-200 py-2' htmlFor='transactionDate'>Date</label>
          <input
            type='date'
            name='transactionDate'
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'
          />
        </div>
        <button className='bg-primary-500 hover:bg-primary-700 text-primary-50 w-full py-2 px-4 rounded-md mt-6' type='submit' disabled={loading}>
          {loading ? 'Adding expense...' : 'Add expense'}
        </button>
      </form>
      
        {/* Loading/Success Popup */}
        {loading && (
          <div className='fixed inset-0 bg-background-700 bg-opacity-75 flex justify-center items-center z-50'>
            <div className='bg-primary-50 p-6 rounded-md'>
              <p className='text-center text-xl text-background-500'>Adding Expense...</p>
            </div>
          </div>
        )}

        {success && (
          <div className='fixed inset-0 bg-background-700 bg-opacity-75 flex justify-center items-center z-50'>
            <div className='bg-primary-50 p-6 rounded-md'>
              <p className='text-center text-2xl text-primary-500'>Expense added successfully!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { ExpensesList, AddExpenses };
