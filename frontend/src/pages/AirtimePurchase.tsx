
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  ArrowLeft, 
  Loader2, 
  Phone, 
  Clock,
  Star,
  Plus
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import NetworkSelector from '@/components/airtime/NetworkSelector';
import AmountSelector from '@/components/airtime/AmountSelector';
import PaymentMethodSelector from '@/components/airtime/PaymentMethodSelector';
import RecentNumbers from '@/components/airtime/RecentNumbers';
import TransactionPreview from '@/components/airtime/TransactionPreview';

const AirtimePurchase = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State variables
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('GHC');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [saveNumber, setSaveNumber] = useState(false);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);
  
  // Recent numbers (would come from user's saved numbers in a real app)
  const recentNumbers = [
    { id: '1', name: 'My Number', number: '+233 50 123 4567' },
    { id: '2', name: 'Mom', number: '+233 24 987 6543' },
    { id: '3', name: 'Dad', number: '+233 27 456 7890' },
  ];
  
  // Networks (would come from an API in a real app)
  const networks = [
    { id: 'mtn', name: 'MTN', logo: '🟡' },
    { id: 'vodafone', name: 'Vodafone', logo: '🔴' },
    { id: 'airteltigo', name: 'AirtelTigo', logo: '🔵' },
    { id: 'glo', name: 'Glo', logo: '🟢' },
  ];
  
  // Updated payment methods to match the requested options
  const paymentMethods = [
    { id: 'GHC', name: 'Cedi Wallet', balance: '₵1,200.00', icon: '🇬🇭' },
    { id: 'NGN', name: 'NGN Wallet', balance: '₦75,000.00', icon: '🇳🇬' },
    { id: 'BTC', name: 'Bitcoin', balance: '0.0025 BTC', icon: '₿' },
    { id: 'BTCUSD', name: 'BTCUSD', balance: '150 BTCUSD', icon: '💰' },
    { id: 'USDT', name: 'USDT', balance: '500 USDT', icon: '💵' },
    { id: 'BUSD', name: 'BUSD', balance: '300 BUSD', icon: '💲' },
  ];
  
  // Preset amounts
  const presetAmounts = [5, 10, 20, 50, 100];
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!selectedNetwork) {
      toast({
        title: "Network Required",
        description: "Please select a mobile network provider",
        variant: "destructive"
      });
      return;
    }
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    // Show confirmation modal
    setShowConfirmation(true);
  };
  
  // Handle transaction confirmation
  const confirmTransaction = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setTransactionSuccessful(true);
      
      // Save number if requested
      if (saveNumber) {
        // This would save to user's profile in a real app
        console.log('Saving number:', phoneNumber);
      }
      
      toast({
        title: "Success!",
        description: `You've successfully purchased ${amount} GHC airtime for ${phoneNumber}`,
        variant: "default"
      });
    }, 2000);
  };
  
  // Handle transaction cancellation
  const cancelTransaction = () => {
    setShowConfirmation(false);
  };
  
  // Handle new transaction after success
  const handleNewTransaction = () => {
    setSelectedNetwork('');
    setPhoneNumber('');
    setAmount(0);
    setPaymentMethod('GHC');
    setShowConfirmation(false);
    setTransactionSuccessful(false);
  };
  
  // Return to dashboard
  const returnToDashboard = () => {
    navigate('/dashboard');
  };
  
  // Handle phone number selection from recent numbers
  const selectRecentNumber = (number: string) => {
    setPhoneNumber(number);
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={returnToDashboard}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <h1 className="text-3xl font-bold mb-6 text-primary/90">Airtime Purchase</h1>
      
      {transactionSuccessful ? (
        <Card className="animate-fade-in bg-card shadow-md border-muted">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-2xl">Transaction Successful!</CardTitle>
            <CardDescription>
              Your airtime purchase was completed successfully
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-xl font-bold">GHC {amount.toFixed(2)}</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Recipient</p>
              <p className="text-xl font-bold">{phoneNumber}</p>
              <p className="text-sm text-muted-foreground">
                Network: {networks.find(n => n.id === selectedNetwork)?.name}
              </p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="text-xl font-bold">
                {paymentMethods.find(p => p.id === paymentMethod)?.name}
              </p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="text-xl font-mono">
                AIRTIME-{Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto" 
              onClick={returnToDashboard}
            >
              Return to Dashboard
            </Button>
            <Button 
              className="w-full sm:w-auto" 
              onClick={handleNewTransaction}
            >
              New Purchase
            </Button>
          </CardFooter>
        </Card>
      ) : showConfirmation ? (
        <TransactionPreview
          network={networks.find(n => n.id === selectedNetwork)}
          phoneNumber={phoneNumber}
          amount={amount}
          paymentMethod={paymentMethods.find(p => p.id === paymentMethod)}
          onConfirm={confirmTransaction}
          onCancel={cancelTransaction}
          isProcessing={isProcessing}
          saveNumber={saveNumber}
          setSaveNumber={setSaveNumber}
        />
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              <Card className="shadow-sm border-muted/40">
                <CardHeader className="bg-muted/10 rounded-t-lg">
                  <CardTitle className="text-xl text-primary/90">Purchase Details</CardTitle>
                  <CardDescription>
                    Enter recipient details and airtime amount
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 pt-6">
                  {/* Network Selection */}
                  <div className="space-y-3">
                    <Label htmlFor="network" className="text-base font-medium">Select Network</Label>
                    <NetworkSelector
                      networks={networks}
                      selectedNetwork={selectedNetwork}
                      onSelect={setSelectedNetwork}
                    />
                  </div>
                  
                  {/* Phone Number */}
                  <div className="space-y-3">
                    <Label htmlFor="phoneNumber" className="text-base font-medium">Phone Number</Label>
                    <div className="flex">
                      <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted/30 text-muted-foreground">
                        +233
                      </span>
                      <Input
                        id="phoneNumber"
                        placeholder="50 123 4567"
                        value={phoneNumber.replace('+233', '')}
                        onChange={(e) => setPhoneNumber('+233 ' + e.target.value)}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  {/* Amount Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Amount (GHC)</Label>
                    <AmountSelector
                      presetAmounts={presetAmounts}
                      selectedAmount={amount}
                      onSelectAmount={setAmount}
                    />
                  </div>
                  
                  {/* Payment Method */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Payment Method</Label>
                    <PaymentMethodSelector
                      paymentMethods={paymentMethods}
                      selectedPaymentMethod={paymentMethod}
                      onSelectPaymentMethod={setPaymentMethod}
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2 pb-6">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Continue to Payment
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
          
          <div className="space-y-6">
            {/* Recent Numbers */}
            <Card className="shadow-sm border-muted/40">
              <CardHeader className="bg-muted/10 rounded-t-lg">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Recent Numbers</span>
                  <Button variant="ghost" size="icon">
                    <Clock className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <RecentNumbers
                  numbers={recentNumbers}
                  onSelect={selectRecentNumber}
                />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Contact
                </Button>
              </CardFooter>
            </Card>
            
            {/* Saved Numbers/Favorites */}
            <Card className="shadow-sm border-muted/40">
              <CardHeader className="bg-muted/10 rounded-t-lg">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Favorites</span>
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-3 text-sm text-muted-foreground">
                  You haven't saved any favorites yet
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirtimePurchase;
