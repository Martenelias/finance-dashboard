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
}

const AnalyticsCard = () => {
  const [reports, setReports] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
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

        const response = await axios.get(`${API_URL}/reports/${currentUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allReports = response.data.reports;

        const filteredReports = allReports.filter((report) => {
          const [year, month] = report.month.split('-');
          return year === '2024' && ['05', '06', '07', '08', '09', '10', '11'].includes(month);
        });

        setReports(filteredReports);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    if (reports.length > 0) {
      const processedData = reports.map((report) => {
        const incomeHeight = Math.min((report.totalIncome / 5000) * 100, 100);
        const expenseHeight = Math.min((report.totalExpense / 5000) * 100, 100);
        return {
          incomeHeight,
          expenseHeight,
        };
      });
      setData(processedData);
    }
  }, [reports]);

  return (
    <div className='w-full flex justify-between h-full rounded-md p-4'>
      {data.map((item, index) => (
        <div key={index} className='flex items-end justify-end w-8 gap-2'>
          {/* Income Bar */}
          <div
            className='bg-primary-500 w-full rounded-t-md'
            style={{ height: `${item.incomeHeight}%` }} // Scale bar height
          ></div>

          {/* Expense Bar */}
          <div
            className='bg-secondary-500 w-full rounded-t-md mt-1'
            style={{ height: `${item.expenseHeight}%` }} // Scale bar height
          ></div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCard;
