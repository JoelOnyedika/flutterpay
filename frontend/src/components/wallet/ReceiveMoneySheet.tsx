
import React, { useState } from 'react';
import { QrCode, Copy, Download, CheckCircle, Share2, Wallet, ClipboardCopy } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';

interface ReceiveMoneySheetProps {
  currencies: Array<{
    id: string;
    name: string;
    symbol: string;
    balance: string;
    isCrypto?: boolean;
  }>;
  selectedCurrency: string;
}

const ReceiveMoneySheet = ({ currencies, selectedCurrency }: ReceiveMoneySheetProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'account' | 'qr'>('account');
  
  // Get current currency
  const getCurrentCurrency = () => {
    const currency = currencies.find(c => c.id === selectedCurrency);
    return {
      ...currency,
      isCrypto: ['BTC', 'USDT', 'BUSD'].includes(currency?.id || '')
    };
  };
  
  // Handle copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Account details have been copied",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Generate account details
  const getAccountDetails = () => {
    const currency = getCurrentCurrency();
    
    if (currency?.isCrypto) {
      const addresses: Record<string, string> = {
        'BTC': '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
        'USDT': '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        'BUSD': '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
      };
      
      return {
        accountNumber: addresses[currency.id || ''] || '',
        accountName: `${currency.id} Wallet`,
        bankName: currency.id === 'USDT' ? 'ERC-20 Network' : 
                  currency.id === 'BUSD' ? 'BEP-20 Network' : 'Bitcoin Network'
      };
    } else {
      return {
        accountNumber: 'FL' + Math.random().toString().substring(2, 10),
        accountName: 'FlashLink Account',
        bankName: 'FlashLink'
      };
    }
  };
  
  const accountDetails = getAccountDetails();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Wallet className="h-4 w-4" />
          Receive
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle>Receive Money</SheetTitle>
          <SheetDescription>
            Share your account details to receive money
          </SheetDescription>
        </SheetHeader>
        
        <Tabs defaultValue="account" onValueChange={(value) => setActiveTab(value as 'account' | 'qr')}>
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="account">Account Details</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-sm text-muted-foreground">Currency</span>
                  <span className="font-medium">{getCurrentCurrency()?.name} ({getCurrentCurrency()?.id})</span>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <div className="flex">
                      <Input
                        value={accountDetails.accountNumber}
                        readOnly
                        className={getCurrentCurrency()?.isCrypto ? 'text-xs font-mono' : ''}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="ml-2 flex-shrink-0"
                        onClick={() => handleCopy(accountDetails.accountNumber)}
                      >
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Account Name</Label>
                    <Input value={accountDetails.accountName} readOnly />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{getCurrentCurrency()?.isCrypto ? 'Network' : 'Bank'}</Label>
                    <Input value={accountDetails.bankName} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                {getCurrentCurrency()?.isCrypto ? (
                  <>
                    <span className="font-medium">Important: </span>
                    Only send {getCurrentCurrency()?.id} to this address. Sending any other cryptocurrency may result in permanent loss.
                  </>
                ) : (
                  <>
                    <span className="font-medium">Note: </span>
                    Share these details with anyone who wants to send you money. Transfers between FlashLink accounts are instant and free.
                  </>
                )}
              </p>
            </div>
            
            <Button 
              className="w-full"
              onClick={() => {
                handleCopy(`
Account Number: ${accountDetails.accountNumber}
Account Name: ${accountDetails.accountName}
${getCurrentCurrency()?.isCrypto ? 'Network' : 'Bank'}: ${accountDetails.bankName}
                `.trim());
              }}
            >
              <ClipboardCopy className="mr-2 h-4 w-4" />
              Copy All Details
            </Button>
          </TabsContent>
          
          <TabsContent value="qr" className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="border p-6 rounded-lg bg-white">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${accountDetails.accountNumber}`} 
                  alt="QR Code" 
                  className="h-48 w-48"
                />
              </div>
              
              <div className="text-center mt-4">
                <p className="font-medium">{getCurrentCurrency()?.name} ({getCurrentCurrency()?.id})</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Scan this QR code to receive {getCurrentCurrency()?.id}
                </p>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                {getCurrentCurrency()?.isCrypto ? (
                  <>
                    <span className="font-medium">Important: </span>
                    Only send {getCurrentCurrency()?.id} to this address. Sending any other cryptocurrency may result in permanent loss.
                  </>
                ) : (
                  <>
                    <span className="font-medium">Note: </span>
                    Share this QR code with anyone who wants to send you money using the FlashLink app.
                  </>
                )}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default ReceiveMoneySheet;
