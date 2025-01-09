import PropTypes from 'prop-types';

const DashboardData = ({ title, amount }) => {
  return (
    <div className='flex flex-col justify-center h-full items-center'>
      <p className='text-background-200 lg:text-sm text-base'>{title}</p>
      <p className='text-primary-50 lg:text-base xl:text-lg text-lg'>€{amount.toFixed(2)}</p>
    </div>
  );
};

DashboardData.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default DashboardData;
