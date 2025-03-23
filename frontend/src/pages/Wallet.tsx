import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDown, ArrowUp, Banknote, CreditCard, 
  Calendar, Filter, Search, Download, History, 
  RefreshCw, Shield, Settings, Wallet as WalletIcon, 
  ChevronRight, CheckCircle, AlertCircle, Moon, Sun
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CurrencySelector from '@/components/dashboard/CurrencySelector';
import WalletBalanceCards from '@/components/wallet/WalletBalanceCards';
import TransactionFilters from '@/components/wallet/TransactionFilters';
import ConversionCalculator from '@/components/wallet/ConversionCalculator';
import WalletSecuritySettings from '@/components/wallet/WalletSecuritySettings';
import FundWalletModal from '@/components/wallet/FundWalletModal';
import SendMoneySheet from '@/components/wallet/SendMoneySheet';
import ReceiveMoneySheet from '@/components/wallet/ReceiveMoneySheet';

const Wallet = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');
  const [showBalances, setShowBalances] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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

  // Sample transactions for history
  const transactions = [
    {
      id: 'tx1',
      type: 'deposit',
      title: 'Wallet Funding',
      amount: '₦100,000.00',
      date: '2023-10-13',
      time: '16:20',
      status: 'success',
      currency: 'NGN',
      recipient: 'Bank Transfer',
      description: 'Deposit via Access Bank',
      icon: <ArrowDown className="h-4 w-4" />,
      color: 'bg-green-500/10 text-green-500',
      direction: 'incoming',
    },
    {
      id: 'tx2',
      type: 'withdrawal',
      title: 'Withdrawal to Bank',
      amount: '₦50,000.00',
      date: '2023-10-12',
      time: '14:30',
      status: 'success',
      currency: 'NGN',
      recipient: 'GTBank - 0123456789',
      description: 'Withdrawal to GTBank account',
      icon: <ArrowUp className="h-4 w-4" />,
      color: 'bg-blue-500/10 text-blue-500',
      direction: 'outgoing',
    },
    {
      id: 'tx3',
      type: 'conversion',
      title: 'Currency Exchange',
      amount: '₦200,000.00 → $400.00',
      date: '2023-10-11',
      time: '10:15',
      status: 'success',
      currency: 'NGN',
      recipient: 'USDT',
      description: 'Converted NGN to USDT',
      icon: <RefreshCw className="h-4 w-4" />,
      color: 'bg-purple-500/10 text-purple-500',
      direction: 'outgoing',
    },
    {
      id: 'tx4',
      type: 'airtime',
      title: 'Airtime Recharge',
      amount: '₦5,000.00',
      date: '2023-10-10',
      time: '08:45',
      status: 'success',
      currency: 'NGN',
      recipient: '+234 812 345 6789',
      description: 'Airtime purchase for MTN',
      icon: <WalletIcon className="h-4 w-4" />,
      color: 'bg-yellow-500/10 text-yellow-500',
      direction: 'outgoing',
    },
    {
      id: 'tx5',
      type: 'cryptocurrency',
      title: 'BTC Purchase',
      amount: 'USDT 500.00 → BTC 0.015',
      date: '2023-10-09',
      time: '21:30',
      status: 'success',
      currency: 'USDT',
      recipient: 'Internal Wallet',
      description: 'Purchased BTC with USDT',
      icon: <RefreshCw className="h-4 w-4" />,
      color: 'bg-orange-500/10 text-orange-500',
      direction: 'outgoing',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">FL</span>
            </div>
            <h1 className="text-xl font-semibold">FlashLink</h1>
          </Link>
          <div className="flex items-center gap-2 rounded-full bg-muted px-2 py-1">
            <WalletIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Wallet</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            US
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:px-6 lg:px-8 animate-fade-in">
        {/* Page Title and Currency Selector */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Wallet</h2>
            <p className="text-muted-foreground">Manage your balances, transactions, and payments</p>
          </div>
          <CurrencySelector 
            currencies={currencies} 
            selected={selectedCurrency} 
            onSelect={setSelectedCurrency}
            showBalances={showBalances}
            onToggleBalances={toggleBalanceVisibility}
          />
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <FundWalletModal selectedCurrency={selectedCurrency} />
          
          <SendMoneySheet 
            currencies={currencies} 
            selectedCurrency={selectedCurrency}
            showBalances={showBalances}
          />
          
          <ReceiveMoneySheet
            currencies={currencies}
            selectedCurrency={selectedCurrency}
          />
          
          <Button variant="outline" className="gap-2">
            <History className="h-4 w-4" />
            History
          </Button>
        </div>

        {/* Wallet Tabs */}
        <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deposit">Deposit & Withdraw</TabsTrigger>
            <TabsTrigger value="convert">Convert Currency</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Balance Cards */}
            <WalletBalanceCards 
              currencies={currencies} 
              showBalances={showBalances}
            />

            {/* Recent Transactions */}
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
                <div className="space-y-4">
                  {transactions.slice(0, 3).map((transaction, index) => (
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
                          <p className="text-xs text-muted-foreground">{transaction.description}</p>
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
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Link to="/wallet?tab=transactions" className="w-full">
                  <Button variant="outline" className="w-full">View All Transactions</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Deposit & Withdraw Tab */}
          <TabsContent value="deposit" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Deposit Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Deposit Funds</CardTitle>
                  <CardDescription>Select method to add funds to your wallet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <Button variant="outline" className="justify-start h-auto py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Bank Transfer</div>
                          <div className="text-xs text-muted-foreground">Deposit via bank transfer</div>
                        </div>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" className="justify-start h-auto py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                          <Banknote className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Mobile Money</div>
                          <div className="text-xs text-muted-foreground">Deposit via mobile money transfer</div>
                        </div>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" className="justify-start h-auto py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-yellow-500/10 text-yellow-500">
                          <WalletIcon className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Crypto Deposit</div>
                          <div className="text-xs text-muted-foreground">Deposit cryptocurrency to your wallet</div>
                        </div>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Withdraw Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Withdraw Funds</CardTitle>
                  <CardDescription>Select method to withdraw from your wallet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <Button variant="outline" className="justify-start h-auto py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Bank Account</div>
                          <div className="text-xs text-muted-foreground">Withdraw to linked bank account</div>
                        </div>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" className="justify-start h-auto py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
                          <Banknote className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Mobile Money</div>
                          <div className="text-xs text-muted-foreground">Withdraw to mobile money account</div>
                        </div>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" className="justify-start h-auto py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-orange-500/10 text-orange-500">
                          <WalletIcon className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Crypto Address</div>
                          <div className="text-xs text-muted-foreground">Withdraw to external crypto wallet</div>
                        </div>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Convert Tab */}
          <TabsContent value="convert" className="space-y-6">
            {/* Currency Conversion Calculator */}
            <ConversionCalculator currencies={currencies} showBalances={showBalances} />
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            {/* Transactions Filter */}
            <TransactionFilters />
            
            {/* Transactions Table */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Transaction History</CardTitle>
                  <Button variant="outline" size="sm" className="text-sm">
                    <Download className="mr-1 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id} className="animate-fade-in">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${transaction.color}`}>
                              {transaction.icon}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.title}</p>
                              <p className="text-xs text-muted-foreground">{transaction.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{transaction.date}</p>
                          <p className="text-xs text-muted-foreground">{transaction.time}</p>
                        </TableCell>
                        <TableCell>
                          <p className={`font-medium ${transaction.direction === 'incoming' ? 'text-green-500' : ''}`}>
                            {transaction.direction === 'outgoing' ? '-' : '+'}{transaction.amount}
                          </p>
                          <p className="text-xs text-muted-foreground">{transaction.currency}</p>
                        </TableCell>
                        <TableCell>
                          {transaction.status === 'success' ? (
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-sm font-medium">Success</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">Pending</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">View</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Transaction Details</DialogTitle>
                                <DialogDescription>
                                  Transaction ID: {transaction.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-3 py-4">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Type:</span>
                                  <span className="font-medium">{transaction.type}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Amount:</span>
                                  <span className="font-medium">{transaction.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Date:</span>
                                  <span className="font-medium">{transaction.date} {transaction.time}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Recipient:</span>
                                  <span className="font-medium">{transaction.recipient}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Status:</span>
                                  <span className="font-medium text-green-500">Success</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Description:</span>
                                  <span className="font-medium">{transaction.description}</span>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <WalletSecuritySettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Wallet;

