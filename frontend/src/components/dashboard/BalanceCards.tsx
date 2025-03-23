
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Wallet, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Currency {
  id: string;
  name: string;
  symbol: string;
  balance: string;
}

interface BalanceCardsProps {
  currencies: Currency[];
  showBalances: boolean;
}

const BalanceCards = ({ currencies, showBalances }: BalanceCardsProps) => {
  const [displayCount, setDisplayCount] = useState(3);
  const visibleCurrencies = currencies.slice(0, displayCount);
  
  const handleShowAll = () => {
    setDisplayCount(currencies.length);
  };
  
  const isShowingAll = displayCount >= currencies.length;
  
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {visibleCurrencies.map((currency, index) => (
          <Card key={currency.id} className={`overflow-hidden animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{currency.id}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className={`inline-flex items-center gap-1 ${currency.id === 'BTC' ? 'text-green-500' : ''}`}>
                    <ArrowUp className="h-4 w-4 text-green-500" />
                    2.5%
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{currency.symbol}</span>
                  {showBalances ? (
                    <span className="text-2xl font-bold">{currency.balance}</span>
                  ) : (
                    <span className="text-2xl font-bold">******</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{currency.name}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  <ArrowUp className="h-3 w-3" />
                  Send
                </button>
                <button className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  <ArrowDown className="h-3 w-3" />
                  Receive
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {!isShowingAll && currencies.length > displayCount && (
        <div className="flex justify-center mt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Show All Balances ({currencies.length - displayCount} more)
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <div className="grid gap-4 p-4">
                {currencies.slice(displayCount).map((currency) => (
                  <div key={currency.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{currency.id}</span>
                      <span className="text-xs text-muted-foreground">({currency.name})</span>
                    </div>
                    <div className="font-medium">
                      {showBalances ? `${currency.symbol} ${currency.balance}` : `${currency.symbol} ******`}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-4">
                <Button size="sm" onClick={handleShowAll}>Show All on Dashboard</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default BalanceCards;
