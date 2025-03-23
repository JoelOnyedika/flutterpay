
import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Wallet, 
  CreditCard, 
  Search, 
  QrCode, 
  ChevronRight, 
  Loader2, 
  CheckCircle, 
  ClipboardCheck,
  Contact,
  UserRound,
  PhoneCall,
  ChevronDown
} from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  accountNumber?: string;
  avatarUrl?: string;
  recentTransaction?: boolean;
}

interface SendMoneySheetProps {
  currencies: Array<{
    id: string;
    name: string;
    symbol: string;
    balance: string;
  }>;
  selectedCurrency: string;
  showBalances: boolean;
  onSuccess?: () => void;
}

const SendMoneySheet = ({ 
  currencies, 
  selectedCurrency,
  showBalances,
  onSuccess 
}: SendMoneySheetProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [recipientType, setRecipientType] = useState('account');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [step, setStep] = useState<'recipient' | 'amount' | 'confirm' | 'success'>('recipient');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  // Sample contacts for the demo
  const contacts: Contact[] = [
    { 
      id: '1', 
      name: 'Alex Johnson', 
      phoneNumber: '+233 50 123 4567', 
      accountNumber: 'FL78901234',
      avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex',
      recentTransaction: true
    },
    { 
      id: '2', 
      name: 'Sophia Chen', 
      phoneNumber: '+233 55 987 6543', 
      accountNumber: 'FL45678901',
      avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia',
      recentTransaction: true
    },
    { 
      id: '3', 
      name: 'Marcus Williams', 
      phoneNumber: '+233 24 555 7890', 
      accountNumber: 'FL12345678',
      avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus',
      recentTransaction: false
    },
    { 
      id: '4', 
      name: 'Liam Kumar', 
      phoneNumber: '+233 27 321 9876', 
      accountNumber: 'FL23456789',
      avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Liam',
      recentTransaction: false
    },
    { 
      id: '5', 
      name: 'Emma Wilson', 
      phoneNumber: '+233 20 456 7890', 
      accountNumber: 'FL34567890',
      avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma',
      recentTransaction: false
    }
  ];
  
  // Reset form when sheet opens
  useEffect(() => {
    if (open) {
      setRecipient('');
      setAmount('');
      setDescription('');
      setStep('recipient');
      setSelectedContact(null);
      setSearchQuery('');
    }
  }, [open]);
  
  // Get current currency info
  const getCurrentCurrency = () => {
    return currencies.find(c => c.id === selectedCurrency);
  };
  
  // Handle recipient selection and continue to amount
  const handleContinueToAmount = () => {
    if (recipientType === 'account' && !recipient) {
      toast({
        title: "Recipient required",
        description: "Please enter a recipient account number",
        variant: "destructive"
      });
      return;
    }
    
    if (recipientType === 'contact' && !selectedContact) {
      toast({
        title: "Contact required",
        description: "Please select a contact to send money to",
        variant: "destructive"
      });
      return;
    }
    
    setStep('amount');
  };
  
  // Handle amount input and continue to confirmation
  const handleContinueToConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    const balance = parseFloat(getCurrentCurrency()?.balance.replace(/,/g, '') || '0');
    
    if (parseFloat(amount) > balance) {
      toast({
        title: "Insufficient balance",
        description: `Your ${getCurrentCurrency()?.id} balance is too low for this transfer`,
        variant: "destructive"
      });
      return;
    }
    
    setStep('confirm');
  };
  
  // Handle transaction processing
  const handleSendMoney = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      
      toast({
        title: "Transfer successful",
        description: `You have sent ${getCurrentCurrency()?.symbol}${amount} to ${selectedContact ? selectedContact.name : recipient}`,
      });
      
      if (onSuccess) {
        onSuccess();
      }
    }, 2000);
  };
  
  // Filter contacts based on search query
  const filteredContacts = searchQuery 
    ? contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phoneNumber.includes(searchQuery) ||
        (contact.accountNumber && contact.accountNumber.includes(searchQuery))
      )
    : contacts;
  
  // Recent contacts first
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a.recentTransaction && !b.recentTransaction) return -1;
    if (!a.recentTransaction && b.recentTransaction) return 1;
    return 0;
  });
  
  // Format recipient name for display
  const getRecipientName = () => {
    if (selectedContact) {
      return selectedContact.name;
    }
    return recipient;
  };
  
  // Close sheet and reset
  const handleClose = () => {
    setOpen(false);
  };
  
  // Start a new transaction
  const handleNewTransaction = () => {
    setRecipient('');
    setAmount('');
    setDescription('');
    setStep('recipient');
    setSelectedContact(null);
    setSearchQuery('');
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <Send className="h-4 w-4" />
          Send
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>Send Money</SheetTitle>
            <SheetDescription>
              Transfer funds to another account
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto p-6">
            {step === 'recipient' && (
              <div className="space-y-6">
                <div className="bg-muted/20 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">From</span>
                    <span className="text-sm text-muted-foreground">Available Balance</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{getCurrentCurrency()?.id}</span>
                      <span className="text-sm text-muted-foreground">Wallet</span>
                    </div>
                    <div className="font-bold">
                      {showBalances ? (
                        `${getCurrentCurrency()?.symbol}${getCurrentCurrency()?.balance}`
                      ) : (
                        '******'
                      )}
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="contact" onValueChange={(value) => setRecipientType(value as 'contact' | 'account')}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="contact">Contacts</TabsTrigger>
                    <TabsTrigger value="account">Account Number</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="contact" className="space-y-4 mt-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search contacts..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    {sortedContacts.length > 0 ? (
                      <div className="space-y-2">
                        {sortedContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedContact?.id === contact.id
                                ? 'border-primary bg-primary/5'
                                : 'hover:bg-muted/50'
                            }`}
                            onClick={() => setSelectedContact(contact)}
                          >
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                              <AvatarFallback>
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium leading-none mb-1">{contact.name}</p>
                              <p className="text-xs text-muted-foreground">{contact.phoneNumber}</p>
                            </div>
                            {contact.recentTransaction && (
                              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Recent</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <UserRound className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No contacts found</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="account" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Recipient Account Number</Label>
                      <Input
                        id="account-number"
                        placeholder="Enter account number"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the FlashLink account number of the recipient
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {step === 'amount' && (
              <div className="space-y-6">
                <Button 
                  variant="outline" 
                  className="mb-4" 
                  onClick={() => setStep('recipient')}
                >
                  Back to Recipient
                </Button>
                
                <div className="bg-muted/20 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Sending to</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedContact ? (
                      <>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={selectedContact.avatarUrl} alt={selectedContact.name} />
                          <AvatarFallback>
                            {selectedContact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedContact.name}</p>
                          <p className="text-xs text-muted-foreground">{selectedContact.accountNumber}</p>
                        </div>
                      </>
                    ) : (
                      <div className="font-medium">{recipient}</div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount ({getCurrentCurrency()?.id})</Label>
                    <div className="flex">
                      <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted/30 text-muted-foreground">
                        {getCurrentCurrency()?.symbol}
                      </span>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input
                      id="description"
                      placeholder="What's this for?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {step === 'confirm' && (
              <div className="space-y-6">
                <Button 
                  variant="outline" 
                  className="mb-4" 
                  onClick={() => setStep('amount')}
                >
                  Back to Amount
                </Button>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/20 p-4 border-b">
                    <h3 className="font-medium">Transaction Summary</h3>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                      <span className="text-sm text-muted-foreground">Recipient</span>
                      <span className="font-medium">{getRecipientName()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                      <span className="text-sm text-muted-foreground">Amount</span>
                      <span className="font-medium">{getCurrentCurrency()?.symbol}{amount}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                      <span className="text-sm text-muted-foreground">Fee</span>
                      <span className="font-medium">
                        {getCurrentCurrency()?.symbol}0.00
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                      <span className="text-sm text-muted-foreground">Payment Method</span>
                      <span className="font-medium">{getCurrentCurrency()?.id} Wallet</span>
                    </div>
                    
                    {description && (
                      <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="text-sm text-muted-foreground">Description</span>
                        <span className="font-medium">{description}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-medium">Total</span>
                      <span className="text-lg font-bold">
                        {getCurrentCurrency()?.symbol}{amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 'success' && (
              <div className="flex flex-col items-center justify-center py-8 space-y-6">
                <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-1">Transfer Successful!</h3>
                  <p className="text-muted-foreground mb-4">
                    Your money has been sent successfully
                  </p>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mb-4 text-center">
                    <p className="text-sm text-muted-foreground">Amount Sent</p>
                    <p className="text-2xl font-bold">{getCurrentCurrency()?.symbol}{amount}</p>
                    <p className="text-sm">to {getRecipientName()}</p>
                  </div>
                  
                  <div className="rounded-lg border p-4 text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Transaction ID</span>
                      <span className="text-sm font-medium">TRX-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date & Time</span>
                      <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 border-t">
            {step === 'recipient' && (
              <Button 
                className="w-full" 
                onClick={handleContinueToAmount}
                disabled={recipientType === 'contact' ? !selectedContact : !recipient}
              >
                Continue
              </Button>
            )}
            
            {step === 'amount' && (
              <Button 
                className="w-full" 
                onClick={handleContinueToConfirm}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                Continue to Confirm
              </Button>
            )}
            
            {step === 'confirm' && (
              <Button 
                className="w-full" 
                onClick={handleSendMoney}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Send Money'
                )}
              </Button>
            )}
            
            {step === 'success' && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleNewTransaction}
                >
                  New Transfer
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SendMoneySheet;
