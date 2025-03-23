
import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Currency {
  id: string;
  name: string;
  symbol: string;
  balance: string;
}

interface ConversionCalculatorProps {
  currencies: Currency[];
  showBalances: boolean;
}

// Sample exchange rates
const exchangeRates = {
  'NGN-GHC': 0.041,
  'NGN-USDT': 0.00067,
  'NGN-BTC': 0.00000002,
  'NGN-BUSD': 0.00067,
  'GHC-NGN': 24.39,
  'GHC-USDT': 0.016,
  'GHC-BTC': 0.00000049,
  'GHC-BUSD': 0.016,
  'USDT-NGN': 1489.25,
  'USDT-GHC': 61.11,
  'USDT-BTC': 0.00003,
  'USDT-BUSD': 1,
  'BTC-NGN': 49641667,
  'BTC-GHC': 2036958,
  'BTC-USDT': 33333,
  'BTC-BUSD': 33333,
  'BUSD-NGN': 1489.25,
  'BUSD-GHC': 61.11,
  'BUSD-USDT': 1,
  'BUSD-BTC': 0.00003,
};

const ConversionCalculator = ({ currencies, showBalances }: ConversionCalculatorProps) => {
  const [fromCurrency, setFromCurrency] = useState('NGN');
  const [toCurrency, setToCurrency] = useState('USDT');
  const [fromAmount, setFromAmount] = useState('1000');
  const [toAmount, setToAmount] = useState('0');
  const [rate, setRate] = useState(0);
  
  useEffect(() => {
    // Calculate conversion
    const rateKey = `${fromCurrency}-${toCurrency}`;
    const conversionRate = exchangeRates[rateKey as keyof typeof exchangeRates] || 0;
    setRate(conversionRate);
    
    const calculatedAmount = parseFloat(fromAmount) * conversionRate;
    setToAmount(calculatedAmount.toFixed(calculatedAmount < 0.01 ? 8 : 2));
  }, [fromCurrency, toCurrency, fromAmount]);
  
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
  };
  
  const getSymbolForCurrency = (currencyId: string) => {
    const currency = currencies.find(c => c.id === currencyId);
    return currency ? currency.symbol : '';
  };
  
  const getBalanceForCurrency = (currencyId: string) => {
    const currency = currencies.find(c => c.id === currencyId);
    return currency ? currency.balance : '0';
  };

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle>Convert Currency</CardTitle>
        <CardDescription>Exchange between currencies at real-time rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* From Currency */}
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-sm font-medium">From</label>
            <div className="text-sm text-muted-foreground">
              Balance: {showBalances ? 
                `${getSymbolForCurrency(fromCurrency)} ${getBalanceForCurrency(fromCurrency)}` : 
                `${getSymbolForCurrency(fromCurrency)} ******`}
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(currency => (
                  <SelectItem key={`from-${currency.id}`} value={currency.id}>
                    <div className="flex items-center gap-2">
                      <span>{currency.symbol}</span>
                      <span>{currency.id}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1"
            />
          </div>
        </div>
        
        {/* Swap Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleSwapCurrencies}
            className="rounded-full h-10 w-10"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        {/* To Currency */}
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-sm font-medium">To</label>
            <div className="text-sm text-muted-foreground">
              Balance: {showBalances ? 
                `${getSymbolForCurrency(toCurrency)} ${getBalanceForCurrency(toCurrency)}` : 
                `${getSymbolForCurrency(toCurrency)} ******`}
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(currency => (
                  <SelectItem key={`to-${currency.id}`} value={currency.id}>
                    <div className="flex items-center gap-2">
                      <span>{currency.symbol}</span>
                      <span>{currency.id}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              value={toAmount}
              readOnly
              className="flex-1 bg-muted"
            />
          </div>
        </div>
        
        {/* Exchange Rate Info */}
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Exchange Rate</div>
            <div className="flex items-center gap-2">
              <div>
                <span className="font-medium">1 {fromCurrency}</span>
                <ArrowRight className="inline mx-2 h-3 w-3" />
                <span className="font-medium">{rate.toFixed(rate < 0.01 ? 8 : 4)} {toCurrency}</span>
              </div>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t text-sm text-muted-foreground flex justify-between">
            <span>Fee</span>
            <span>0.5%</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full">Convert Now</Button>
      </CardFooter>
    </Card>
  );
};

export default ConversionCalculator;
