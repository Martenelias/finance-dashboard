import { useEffect, useState } from 'react';
import axios from 'axios';

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

export const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
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

        const response = await axios.get(`${API_URL}/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allData = response.data[endpoint] || [];
        const userData = allData.filter((item) => item.user_id === currentUserId);

        // Filter data for the current month
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // January = 0
        const currentYear = currentDate.getFullYear();

        const currentMonthData = userData.filter((item) => {
          const itemDate = new Date(item.transaction_date);
          return (
            itemDate.getMonth() === currentMonth &&
            itemDate.getFullYear() === currentYear
          );
        });

        // Calculate total
        const totalAmount = currentMonthData.reduce((sum, item) => {
          return sum + parseFloat(item.amount);
        }, 0);

        setData(currentMonthData);
        setTotal(totalAmount);
      } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, total };
};
