
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Wifi, Zap, CreditCard, Wallet, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const actions = [
  {
    id: 'airtime',
    name: 'Airtime',
    icon: <Phone className="h-5 w-5" />,
    color: 'text-primary bg-primary/10',
    link: '/airtime',
  },
  {
    id: 'data',
    name: 'Data Bundle',
    icon: <Wifi className="h-5 w-5" />,
    color: 'text-secondary bg-secondary/10',
    link: '/dashboard',
  },
  {
    id: 'electricity',
    name: 'Electricity',
    icon: <Zap className="h-5 w-5" />,
    color: 'text-yellow-500 bg-yellow-500/10',
    link: '/dashboard',
  },
  {
    id: 'tv',
    name: 'TV & Cable',
    icon: <CreditCard className="h-5 w-5" />,
    color: 'text-purple-500 bg-purple-500/10',
    link: '/dashboard',
  },
  {
    id: 'wallet',
    name: 'Fund Wallet',
    icon: <Wallet className="h-5 w-5" />,
    color: 'text-green-500 bg-green-500/10',
    link: '/wallet',
  },
  {
    id: 'send',
    name: 'Send Money',
    icon: <ArrowUp className="h-5 w-5" />,
    color: 'text-blue-500 bg-blue-500/10',
    link: '/wallet',
  },
  {
    id: 'receive',
    name: 'Receive',
    icon: <ArrowDown className="h-5 w-5" />,
    color: 'text-red-500 bg-red-500/10',
    link: '/wallet',
  },
];

const QuickActions = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
      {actions.map((action, index) => (
        <Link to={action.link} key={action.id}>
          <Card 
            className="hover:-translate-y-1 transition-transform duration-200 animate-fade-in cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
              <div className={`p-2 rounded-full ${action.color}`}>
                {action.icon}
              </div>
              <span className="text-sm font-medium">{action.name}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;
