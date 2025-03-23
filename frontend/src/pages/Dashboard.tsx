
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUp, Wallet, Phone, Wifi, Zap, CreditCard, History, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CurrencySelector from '@/components/dashboard/CurrencySelector';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import QuickActions from '@/components/dashboard/QuickActions';
import BalanceCards from '@/components/dashboard/BalanceCards';
import AnalyticsCard from '@/components/dashboard/AnalyticsCard';

const Dashboard = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');
  const [showBalances, setShowBalances] = useState(true);

  // Toggle balance visibility
  const toggleBalanceVisibility = () => {
    setShowBalances(!showBalances);
  };

  // Sample data
  const currencies = [
    { id: 'NGN', name: 'Nigerian Naira', symbol: '₦', balance: '250,000.00' },
    { id: 'GHC', name: 'Ghanaian Cedi', symbol: '₵', balance: '15,000.00' },
    { id: 'USDT', name: 'Tether USD', symbol: 'USDT', balance: '1,250.00' },
    { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', balance: '0.0125' },
    { id: 'BUSD', name: 'Binance USD', symbol: 'BUSD', balance: '2,500.00' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:px-6 lg:px-8 animate-fade-in">
        {/* Welcome and Currency Selector */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, User</h2>
            <p className="text-muted-foreground">Manage your accounts and transactions in one place.</p>
          </div>
          <CurrencySelector 
            currencies={currencies} 
            selected={selectedCurrency} 
            onSelect={setSelectedCurrency}
            showBalances={showBalances}
            onToggleBalances={toggleBalanceVisibility}
          />
        </div>

        {/* Balance Cards */}
        <BalanceCards 
          currencies={currencies} 
          showBalances={showBalances}
        />

        {/* Quick Actions */}
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <QuickActions />
        </div>

        {/* Recent Transactions and Analytics */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="animate-scale-in">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Link to="/wallet?tab=transactions">
                  <Button variant="ghost" size="sm" className="text-sm">
                    View All
                    <History className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <TransactionHistory limit={5} />
            </CardContent>
          </Card>

          <AnalyticsCard />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
