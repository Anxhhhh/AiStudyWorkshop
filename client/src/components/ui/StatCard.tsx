import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  value: string | number;
  label: string;
  trend?: { value: string; direction: 'up' | 'down' };
}

const StatCard: React.FC<StatCardProps> = ({ icon, iconBg, value, label, trend }) => {
  return (
    <motion.div
      className="stat-card"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="stat-icon" style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
      {trend && (
        <div className={`stat-trend ${trend.direction}`}>
          {trend.direction === 'up' ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}
          {trend.value}
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
