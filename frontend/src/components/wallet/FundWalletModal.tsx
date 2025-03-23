
import React, { useState, useEffect } from 'react';
import { QrCode, CreditCard, Wallet, Copy, Download, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger 
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Currency {
  id: string;
  name: string;
  symbol: string;
  isCrypto: boolean;
  depositMethods: DepositMethod[];
}

interface DepositMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  instructions: string[];
}

interface FundWalletModalProps {
  selectedCurrency: string;
  onSuccess?: () => void;
}

const FundWalletModal = ({ selectedCurrency, onSuccess }: FundWalletModalProps) => {
  const { toast } = useToast();
  const [currentCurrency, setCurrentCurrency] = useState<Currency | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  
  // Sample data for different currencies
  const currencies: Currency[] = [
    {
      id: 'NGN',
      name: 'Nigerian Naira',
      symbol: '₦',
      isCrypto: false,
      depositMethods: [
        {
          id: 'bank-transfer',
          name: 'Bank Transfer',
          description: 'Deposit via bank transfer to our Nigerian bank account',
          icon: <CreditCard className="h-5 w-5" />,
          instructions: [
            'Transfer the amount to the bank account details below',
            'Use your account number as reference',
            'Funds will be credited within 10-30 minutes'
          ]
        },
        {
          id: 'ussd',
          name: 'USSD Transfer',
          description: 'Use USSD code to transfer funds',
          icon: <Wallet className="h-5 w-5" />,
          instructions: [
            'Dial *737*000*AMOUNT# on your mobile phone',
            'Follow the prompts to complete the transfer',
            'Funds will be credited instantly'
          ]
        }
      ]
    },
    {
      id: 'GHC',
      name: 'Ghanaian Cedi',
      symbol: '₵',
      isCrypto: false,
      depositMethods: [
        {
          id: 'mobile-money',
          name: 'Mobile Money',
          description: 'Deposit via MTN MoMo, Vodafone Cash or AirtelTigo Money',
          icon: <Wallet className="h-5 w-5" />,
          instructions: [
            'Transfer to the mobile number: 0244123456',
            'Use your account number as reference',
            'Funds will be credited within 5-15 minutes'
          ]
        },
        {
          id: 'bank-transfer',
          name: 'Bank Transfer',
          description: 'Deposit via bank transfer to our Ghanaian bank account',
          icon: <CreditCard className="h-5 w-5" />,
          instructions: [
            'Transfer the amount to the bank account details below',
            'Use your account number as reference',
            'Funds will be credited within 10-30 minutes'
          ]
        }
      ]
    },
    {
      id: 'BTC',
      name: 'Bitcoin',
      symbol: '₿',
      isCrypto: true,
      depositMethods: [
        {
          id: 'crypto-transfer',
          name: 'Wallet Transfer',
          description: 'Send BTC to your dedicated wallet address',
          icon: <QrCode className="h-5 w-5" />,
          instructions: [
            'Send Bitcoin to the address shown below',
            'Scan the QR code or copy the address',
            'Funds will be credited after 1 network confirmation'
          ]
        }
      ]
    },
    {
      id: 'USDT',
      name: 'Tether USD',
      symbol: '$',
      isCrypto: true,
      depositMethods: [
        {
          id: 'crypto-transfer',
          name: 'Wallet Transfer (ERC-20)',
          description: 'Send USDT as ERC-20 token to your wallet address',
          icon: <QrCode className="h-5 w-5" />,
          instructions: [
            'Send USDT (ERC-20) to the address shown below',
            'Scan the QR code or copy the address',
            'Funds will be credited after 5 network confirmations'
          ]
        },
        {
          id: 'crypto-transfer-trc20',
          name: 'Wallet Transfer (TRC-20)',
          description: 'Send USDT as TRC-20 token to your wallet address (lower fees)',
          icon: <QrCode className="h-5 w-5" />,
          instructions: [
            'Send USDT (TRC-20) to the address shown below',
            'Scan the QR code or copy the address',
            'Funds will be credited after 1 network confirmation'
          ]
        }
      ]
    },
    {
      id: 'BUSD',
      name: 'Binance USD',
      symbol: '$',
      isCrypto: true,
      depositMethods: [
        {
          id: 'crypto-transfer-bep20',
          name: 'Wallet Transfer (BEP-20)',
          description: 'Send BUSD as BEP-20 token to your wallet address',
          icon: <QrCode className="h-5 w-5" />,
          instructions: [
            'Send BUSD (BEP-20) to the address shown below',
            'Scan the QR code or copy the address',
            'Funds will be credited after 1 network confirmation'
          ]
        }
      ]
    }
  ];
  
  // Find the current currency details
  useEffect(() => {
    const currency = currencies.find(c => c.id === selectedCurrency);
    setCurrentCurrency(currency || null);
    setSelectedMethod('');
    setShowInstructions(false);
    setIsSuccessful(false);
  }, [selectedCurrency]);
  
  // Handle method selection
  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod(methodId);
    setShowInstructions(true);
  };
  
  // Get current deposit method
  const getCurrentMethod = () => {
    if (!currentCurrency || !selectedMethod) return null;
    return currentCurrency.depositMethods.find(m => m.id === selectedMethod);
  };
  
  // Handle copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };
  
  // Handle deposit confirmation
  const handleConfirmDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccessful(true);
      
      toast({
        title: "Deposit initiated",
        description: `Your deposit of ${currentCurrency?.symbol}${amount} has been initiated`,
      });
      
      if (onSuccess) {
        onSuccess();
      }
    }, 2000);
  };
  
  // Generate mock wallet address for crypto
  const getWalletAddress = (currencyId: string) => {
    const addresses: Record<string, string> = {
      'BTC': '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
      'USDT': '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      'BUSD': '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
    };
    
    return addresses[currencyId] || '0x0000000000000000000000000000000000000000';
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Fund Wallet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Fund Your Wallet</DialogTitle>
          <DialogDescription>
            Choose how you want to deposit funds to your account
          </DialogDescription>
        </DialogHeader>
        
        {isSuccessful ? (
          <div className="py-4 space-y-4">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold">Deposit Initiated</h3>
              <p className="text-center text-muted-foreground mt-2">
                Your deposit of {currentCurrency?.symbol}{amount} via {getCurrentMethod()?.name} has been initiated
              </p>
            </div>
            
            <div className="bg-muted/40 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-medium">{currentCurrency?.symbol}{amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Method</span>
                <span className="font-medium">{getCurrentMethod()?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="font-medium text-amber-500">Pending</span>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 p-4 rounded-lg text-sm flex items-start gap-2">
              <Lightbulb className="h-5 w-5 flex-shrink-0" />
              <div>
                <p>Your deposit is now pending. Once confirmed, it will be credited to your wallet. 
                This typically takes {currentCurrency?.isCrypto ? 'a few blockchain confirmations' : '10-30 minutes'} to complete.</p>
              </div>
            </div>
            
            <Button className="w-full mt-4" onClick={() => setIsSuccessful(false)}>
              Make Another Deposit
            </Button>
          </div>
        ) : showInstructions ? (
          <div className="py-4 space-y-6">
            <Button 
              variant="outline" 
              className="mb-4"
              onClick={() => setShowInstructions(false)}
            >
              Back to Methods
            </Button>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {getCurrentMethod()?.icon}
                </div>
                <div>
                  <h3 className="font-medium">{getCurrentMethod()?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {getCurrentMethod()?.description}
                  </p>
                </div>
              </div>
              
              {currentCurrency?.isCrypto ? (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/20">
                    <div className="border p-4 rounded-lg bg-white mb-4">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${getWalletAddress(currentCurrency.id)}`} 
                        alt="QR Code" 
                        className="h-32 w-32"
                      />
                    </div>
                    <div className="flex items-center w-full mb-2">
                      <Input
                        value={getWalletAddress(currentCurrency.id)}
                        readOnly
                        className="text-xs font-mono"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="ml-2 flex-shrink-0"
                        onClick={() => handleCopy(getWalletAddress(currentCurrency.id))}
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="w-full space-y-3 mt-4">
                      <Label htmlFor="crypto-amount">Amount to deposit</Label>
                      <Input
                        id="crypto-amount"
                        placeholder={`Enter amount in ${currentCurrency.id}`}
                        type="number"
                        step="0.0001"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg space-y-2">
                    <p className="font-medium text-amber-800 dark:text-amber-200">Important:</p>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      {getCurrentMethod()?.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span>•</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleConfirmDeposit}
                    disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Deposit'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 space-y-4">
                    {currentCurrency?.id === 'GHC' && selectedMethod === 'mobile-money' ? (
                      <>
                        <div className="space-y-3">
                          <Label htmlFor="momo-amount">Amount (GHC)</Label>
                          <div className="flex">
                            <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted/30 text-muted-foreground">
                              ₵
                            </span>
                            <Input
                              id="momo-amount"
                              placeholder="0.00"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <Label>Mobile Money Provider</Label>
                          <div className="grid grid-cols-3 gap-3">
                            <Button variant="outline" className="h-auto py-2 justify-start flex gap-2">
                              <span className="p-1 rounded-full bg-yellow-100">
                                <span className="text-xs">M</span>
                              </span>
                              <span className="text-xs">MTN MoMo</span>
                            </Button>
                            <Button variant="outline" className="h-auto py-2 justify-start flex gap-2">
                              <span className="p-1 rounded-full bg-red-100">
                                <span className="text-xs">V</span>
                              </span>
                              <span className="text-xs">Vodafone</span>
                            </Button>
                            <Button variant="outline" className="h-auto py-2 justify-start flex gap-2">
                              <span className="p-1 rounded-full bg-blue-100">
                                <span className="text-xs">A</span>
                              </span>
                              <span className="text-xs">AirtelTigo</span>
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-3">
                          <Label htmlFor="bank-amount">Amount</Label>
                          <div className="flex">
                            <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted/30 text-muted-foreground">
                              {currentCurrency?.symbol}
                            </span>
                            <Input
                              id="bank-amount"
                              placeholder="0.00"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <Label>Bank Account Details</Label>
                          <div className="bg-muted/30 p-3 rounded-lg space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Account Name:</span>
                              <span className="font-medium">FlashLink Limited</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Account Number:</span>
                              <span className="font-medium">0123456789</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Bank:</span>
                              <span className="font-medium">
                                {currentCurrency?.id === 'NGN' ? 'Access Bank' : 'GCB Bank'}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Reference:</span>
                              <span className="font-medium">FL12345</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg space-y-2">
                    <p className="font-medium text-amber-800 dark:text-amber-200">Instructions:</p>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      {getCurrentMethod()?.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span>•</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleConfirmDeposit}
                    disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Deposit'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="space-y-4">
              <h3 className="font-medium text-center mb-4">
                Selected currency: <span className="text-primary">{currentCurrency?.name} ({currentCurrency?.symbol})</span>
              </h3>
              
              <div className="grid gap-3">
                {currentCurrency?.depositMethods.map((method) => (
                  <Button 
                    key={method.id} 
                    variant="outline" 
                    className="justify-start h-auto py-4"
                    onClick={() => handleSelectMethod(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        {method.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{method.name}</div>
                        <div className="text-xs text-muted-foreground">{method.description}</div>
                      </div>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FundWalletModal;
