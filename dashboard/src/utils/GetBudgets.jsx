import axios from 'axios';
import { useState, useEffect } from 'react';
import { Trash2, Plus  } from 'lucide-react';

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

const BudgetsList = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
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

        const response = await axios.get(`${API_URL}/budgets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allBudgets = response.data.budgets;
        const userBudgets = allBudgets.filter(budget => budget.user_id === currentUserId);

        setBudgets(userBudgets);
      } catch (error) {
        console.error('Failed to fetch budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  const handleDelete = async (id, year, month) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this budget?');
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      await axios.delete(`${API_URL}/budgets/${year}/${month}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setBudgets((prev) => prev.filter((budget) => budget.id !== id));
    } catch (error) {
      console.error('Failed to delete budget:', error);
    }
  };
  

  return (
    <ul className='flex flex-col justify-evenly items-center w-full gap-2'>
      {budgets.length > 0 ? (
        budgets.map((budget) => (
          <li key={budget.id} className='flex justify-between w-full text-sm lg:text-base border-b py-2'>
            <p>{budget.year}</p>
            <p>{budget.month}</p>
            <p>€{budget.monthly_limit}</p>
            <button onClick={() => handleDelete(budget.id, budget.year, budget.month)}><Trash2 color='#963c3c' /></button>
          </li>
        ))
      ) : (
          <p>No budgets available</p>
      )}
    </ul>
  );

};

const AddBudgets = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddBudget = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      console.log('Token:', token);

      const payload = decodeToken(token);
      const currentUserId = payload?.id;
      console.log('Current User ID:', currentUserId);

      if (!currentUserId) {
        console.error('Current user ID not found in token');
        return;
      }

      const newBudget = {
        year: Number(year),
        month: Number(month),
        monthly_limit: Number(monthlyLimit),
        userId: currentUserId,
      };
      
      console.log('New budget:', newBudget);

      const response = await axios.post(`${API_URL}/budgets`, newBudget, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setYear('');
        setMonth('');
        setMonthlyLimit('');
      }
    } catch (error) {
      console.error('Failed to create budget:', error);
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
      <h2 className='text-xl w-full mb-6 mt-12 flex items-center gap-2'><Plus size={26}/>Add New Budget</h2>
      <div className=' flex flex-col justify-center items-start bg-background-500 p-4 rounded-lg'>
      <form className='flex flex-col justify-center items-center gap-2' onSubmit={handleAddBudget}>
        <div className='flex flex-col justify-center items-start w-[300px]'>
          <label className='text-background-200 py-2' htmlFor='description'>Year</label>
          <input
            type='text'
            name='year'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder='2024'
            className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'   
          />
        </div>
        <div className='flex flex-col justify-center items-start w-[300px]'>
          <label className='text-background-200 py-2' htmlFor='month'>Month</label>
          <input
            type='number'
            name='month'
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder='11'
            className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'
          />
        </div>
        <div className='flex flex-col justify-center items-start w-[300px]'>
          <label className='text-background-200 py-2' htmlFor='monthlyLimit'>Monthly Limit</label>
          <input
            type='text'
            name='monthlyLimit'
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
            placeholder='1200'
            className='border border-background-200 bg-transparent rounded-md py-2 px-4 w-full'
          />
        </div>
        <button className='bg-primary-500 hover:bg-primary-700 text-primary-50 w-full py-2 px-4 rounded-md mt-6' type='submit' disabled={loading}>
          {loading ? 'Adding budget...' : 'Add budget'}
        </button>
      </form>
      
        {/* Loading/Success Popup */}
        {loading && (
          <div className='fixed inset-0 bg-background-700 bg-opacity-75 flex justify-center items-center z-50'>
            <div className='bg-primary-50 p-6 rounded-md'>
              <p className='text-center text-xl text-background-500'>Adding Budget...</p>
            </div>
          </div>
        )}

        {success && (
          <div className='fixed inset-0 bg-background-700 bg-opacity-75 flex justify-center items-center z-50'>
            <div className='bg-primary-50 p-6 rounded-md'>
              <p className='text-center text-2xl text-primary-500'>Budget added successfully!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { BudgetsList, AddBudgets };