import axios from 'axios';
import { useState, useEffect } from 'react';

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

const LimitedList = () => {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchIncomes = async () => {
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

        const response = await axios.get(`${API_URL}/incomes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allIncomes = response.data.incomes;

        const userIncomes = allIncomes
          .filter(income => income.user_id === currentUserId)
          .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));

        setIncomes(userIncomes);
      } catch (error) {
        console.error('Failed to fetch incomes:', error);
      }
    };

    fetchIncomes();
  }, []);

  const recentIncomes = incomes.slice(0, 4);

  return (
    <ul className='flex flex-col justify-evenly items-center w-full gap-2'>
      {recentIncomes.length > 0 ? (
        recentIncomes.map((income) => (
          <li key={income.id} className='flex justify-between w-full text-sm lg:text-base border-b py-2'>
            <p>{income.description}</p>
            <p>€{income.amount}</p>
            <p>{new Date(income.transaction_date).toLocaleDateString()}</p>
          </li>
        ))
      ) : (
        <p>No incomes available</p>
      )}
    </ul>
  );
};

export default LimitedList;