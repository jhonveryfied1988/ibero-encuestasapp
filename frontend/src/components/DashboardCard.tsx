import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;
