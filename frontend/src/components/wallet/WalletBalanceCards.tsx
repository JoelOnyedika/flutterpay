
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Wallet, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Currency {
  id: string;
  name: string;
  symbol: string;
  balance: string;
}

interface WalletBalanceCardsProps {
  currencies: Currency[];
  showBalances: boolean;
}

const WalletBalanceCards = ({ currencies, showBalances }: WalletBalanceCardsProps) => {
  const [displayCount, setDisplayCount] = useState(3);
  const visibleCurrencies = currencies.slice(0, displayCount);
  
  const handleShowAll = () => {
    setDisplayCount(currencies.length);
  };
  
  const isShowingAll = displayCount >= currencies.length;
  
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
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
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      Deposit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Deposit {currency.id}</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      <p className="text-center text-muted-foreground mb-4">
                        Choose a deposit method for {currency.name}
                      </p>
                      <div className="grid gap-3">
                        {currency.id === 'BTC' || currency.id === 'USDT' || currency.id === 'BUSD' ? (
                          <>
                            <Button variant="outline" className="justify-start">
                              <Wallet className="mr-2 h-4 w-4" />
                              External Wallet
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <ArrowDown className="mr-2 h-4 w-4" />
                              Buy Crypto
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" className="justify-start">
                              <ArrowDown className="mr-2 h-4 w-4" />
                              Bank Transfer
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <ArrowDown className="mr-2 h-4 w-4" />
                              Mobile Money
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <ArrowDown className="mr-2 h-4 w-4" />
                              Card Payment
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      Withdraw
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Withdraw {currency.id}</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      <p className="text-center text-muted-foreground mb-4">
                        Choose a withdrawal method for {currency.name}
                      </p>
                      <div className="grid gap-3">
                        {currency.id === 'BTC' || currency.id === 'USDT' || currency.id === 'BUSD' ? (
                          <>
                            <Button variant="outline" className="justify-start">
                              <Wallet className="mr-2 h-4 w-4" />
                              External Wallet
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <ArrowDown className="mr-2 h-4 w-4" />
                              Sell for Fiat
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" className="justify-start">
                              <ArrowUp className="mr-2 h-4 w-4" />
                              Bank Account
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <ArrowUp className="mr-2 h-4 w-4" />
                              Mobile Money
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="sm" className="w-full">
                  Transfer
                </Button>
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

export default WalletBalanceCards;
