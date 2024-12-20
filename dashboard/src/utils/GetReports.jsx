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
}

const ReportsList = () => {
  const [reports, setReports] = useState([]);

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

        setReports(allReports);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <ul className='flex flex-col justify-evenly items-center w-full gap-2'>
      {reports.length > 0 ? (
        reports.map((report) => (
          <li key={report.id} className='flex justify-between w-full text-sm lg:text-base border-b py-2'>
            <p>{report.month}</p>
            <p>€{report.totalIncome}</p>
            <p>€{report.totalExpense}</p>
            <p>€{report.balance}</p>
          </li>
        ))
      ) : (
          <p>No reports available</p>
      )}
    </ul>
  );
};

const ReportsByMonth = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState('');

  // Fetch all reports once
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
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

        if (response.data?.reports) {
          setReports(response.data.reports);
          setError(null);
        } else {
          setError('No reports available.');
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError(err.response?.data?.message || 'Failed to fetch reports.');
      }
    };

    fetchReports();
  }, []);

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);

    const report = reports.find((r) => r.month === selectedMonth);
    if (report) {
      setSelectedReport(report);
      setError(null);
    } else {
      setSelectedReport(null);
      setError(`No report found for ${selectedMonth}`);
    }
  };

  return (
    <div className='flex flex-col justify-between items-center gap-6 w-full bg-background-500 rounded-lg p-4'>
      <div className='flex flex-col justify-center items-center w-full gap-6'>
        <label htmlFor='month' className='text-lg font-semibold text-background-200'>
          Select Month (YYYY-MM):
        </label>
        <input
          type='month'
          id='month'
          value={month}
          onChange={handleMonthChange}
          placeholder='Month'
          className='p-2 rounded-lg bg-background-700 text-background-200'
        />
      </div>

      {error && <p className='text-red-500'>{error}</p>}

      {selectedReport ? (
        <div className='flex flex-col items-center w-full'>
          <div className='flex justify-between w-full text-base lg:text-lg text-background-200 border-b py-4 border-background-200'>
            <p>Month</p>
            <p>Total Income</p>
            <p>Total Expense</p>
            <p>Balance</p>
          </div>
          <div className='flex justify-between w-full text-sm lg:text-base py-2'>
            <p>{selectedReport.month}</p>
            <p>€{selectedReport.totalIncome}</p>
            <p>€{selectedReport.totalExpense}</p>
            <p>€{selectedReport.balance}</p>
          </div>
        </div>
      ) : (
        !error && <p className='text-background-200'>No report selected.</p>
      )}
    </div>
  );
};

const SavingsReport = () => {
  const [savings, setSavings] = useState([]); // All savings data
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    const fetchSavingsReport = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const payload = decodeToken(token);
        const currentUserId = payload?.id;

        if (!currentUserId) {
          setError('Current user ID not found in token.');
          return;
        }

        const response = await axios.get(`${API_URL}/reports/savings/${currentUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.report) {
          setSavings(response.data.report);
          setError(null);
        } else {
          setError('No savings report available.');
        }
      } catch (err) {
        console.error('Error fetching savings report:', err);
        setError(err.response?.data?.message || 'Failed to fetch savings report.');
      }
    };

    fetchSavingsReport();
  }, []);

  return (
    <div className='flex flex-col justify-between items-center gap-6 w-full bg-background-500 rounded-lg p-4'>
      <h2 className='text-lg font-semibold text-background-200'>Savings Report</h2>

      {error && <p className='text-red-500'>{error}</p>}

      {savings.length > 0 ? (
        <ul className='flex flex-col w-full gap-2'>
          <li className='flex justify-between w-full text-base lg:text-lg text-background-200 border-b py-2 border-background-200'>
            <p>Year</p>
            <p>Month</p>
            <p>Savings</p>
          </li>
          {savings.map((saving, index) => (
            <li key={index} className='flex justify-between w-full text-sm lg:text-base py-2'>
              <p>{saving.year}</p>
              <p>{saving.month.toString().padStart(2, '0')}</p>
              <p>€{saving.savings}</p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p className='text-background-200'>No savings data available.</p>
      )}
    </div>
  );
};

const YearEndSummary = () => {
  const [year, setYear] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchYearEndSummary = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const payload = decodeToken(token);
      const currentUserId = payload?.id;

      if (!currentUserId) {
        setError('Current user ID not found in token.');
        return;
      }

      const response = await axios.get(`${API_URL}/reports/year-summary/${currentUserId}/${year}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setReport(response.data);
      } else {
        setReport(null);
        setError(`No summary available for the year ${year}.`);
      }
    } catch (err) {
      console.error('Error fetching year-end summary:', err);
      setError(err.response?.data?.message || 'Failed to fetch year-end summary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-between items-center gap-6 w-full bg-background-500 rounded-lg p-4'>
      <div className='flex flex-col justify-center items-center w-full gap-6'>
        <label htmlFor='year' className='text-lg font-semibold text-background-200'>
          Select Year:
        </label>
        <input
          type='number'
          id='year'
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder='Enter Year'
          className='p-2 rounded-lg bg-background-700 text-background-200'
        />
        <button
          onClick={fetchYearEndSummary} className='bg-primary-500 text-primary-50 hover:bg-primary-700 p-2 rounded-lg'>
          {loading ? 'Loading...' : 'Get Summary'}
        </button>
      </div>

      {loading && <p className='text-blue-500'>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {report ? (
        <div className='flex flex-col items-center w-full'>
          <h2 className='text-lg font-semibold text-background-200'>Year-End Summary</h2>
          <div className='flex justify-between w-full text-base lg:text-lg text-background-200 border-b py-4 border-background-200'>
            <p>Year</p>
            <p>Total Income</p>
            <p>Total Expense</p>
            <p>Total Savings</p>
          </div>
          <div className='flex justify-between w-full text-sm lg:text-base py-2'>
            <p>{report.year}</p>
            <p>€{report.total_income}</p>
            <p>€{report.total_expense}</p>
            <p>€{report.total_savings}</p>
          </div>
        </div>
      ) : (
        !error && <p className='text-background-200'>No summary available for the selected year.</p>
      )}
    </div>
  );
};

export { ReportsList, ReportsByMonth, SavingsReport, YearEndSummary };