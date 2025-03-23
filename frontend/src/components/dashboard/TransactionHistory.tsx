
import React from 'react';
import { ArrowDown, ArrowUp, CreditCard, Phone, Wallet, Wifi, Zap } from 'lucide-react';

interface TransactionHistoryProps {
  limit?: number;
}

// Sample transaction data
const transactions = [
  {
    id: 'tx1',
    type: 'airtime',
    title: 'Airtime Recharge',
    amount: '₦5,000.00',
    date: '2023-10-15',
    time: '14:30',
    status: 'success',
    recipient: '+234 812 345 6789',
    icon: <Phone className="h-4 w-4" />,
    color: 'bg-primary/10 text-primary',
    direction: 'outgoing',
  },
  {
    id: 'tx2',
    type: 'electricity',
    title: 'Electricity Bill',
    amount: '₦15,000.00',
    date: '2023-10-14',
    time: '10:15',
    status: 'success',
    recipient: 'IKEDC - 0100234567',
    icon: <Zap className="h-4 w-4" />,
    color: 'bg-yellow-500/10 text-yellow-500',
    direction: 'outgoing',
  },
  {
    id: 'tx3',
    type: 'data',
    title: 'Data Bundle',
    amount: '₦10,000.00',
    date: '2023-10-14',
    time: '08:45',
    status: 'success',
    recipient: '+234 812 345 6789',
    icon: <Wifi className="h-4 w-4" />,
    color: 'bg-secondary/10 text-secondary',
    direction: 'outgoing',
  },
  {
    id: 'tx4',
    type: 'deposit',
    title: 'Wallet Funding',
    amount: '₦100,000.00',
    date: '2023-10-13',
    time: '16:20',
    status: 'success',
    recipient: 'Bank Transfer',
    icon: <ArrowDown className="h-4 w-4" />,
    color: 'bg-green-500/10 text-green-500',
    direction: 'incoming',
  },
  {
    id: 'tx5',
    type: 'tv',
    title: 'DSTV Subscription',
    amount: '₦24,500.00',
    date: '2023-10-12',
    time: '12:10',
    status: 'success',
    recipient: 'DSTV - 4012345678',
    icon: <CreditCard className="h-4 w-4" />,
    color: 'bg-purple-500/10 text-purple-500',
    direction: 'outgoing',
  },
  {
    id: 'tx6',
    type: 'transfer',
    title: 'Money Transfer',
    amount: '₦50,000.00',
    date: '2023-10-11',
    time: '09:30',
    status: 'success',
    recipient: 'Jane Doe',
    icon: <ArrowUp className="h-4 w-4" />,
    color: 'bg-blue-500/10 text-blue-500',
    direction: 'outgoing',
  },
];

const TransactionHistory = ({ limit }: TransactionHistoryProps) => {
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="space-y-4">
      {displayTransactions.map((transaction, index) => (
        <div 
          key={transaction.id} 
          className="flex items-center justify-between py-2 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${transaction.color}`}>
              {transaction.icon}
            </div>
            <div>
              <p className="font-medium">{transaction.title}</p>
              <p className="text-xs text-muted-foreground">{transaction.recipient}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-medium ${transaction.direction === 'incoming' ? 'text-green-500' : ''}`}>
              {transaction.direction === 'outgoing' ? '-' : '+'}{transaction.amount}
            </p>
            <p className="text-xs text-muted-foreground">{transaction.date} • {transaction.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
