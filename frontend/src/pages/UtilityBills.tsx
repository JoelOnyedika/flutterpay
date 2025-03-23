import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  ArrowLeft, 
  Loader2, 
  Receipt, 
  Calendar, 
  CreditCard,
  Lightbulb,
  Droplet,
  Wifi,
  Tv,
  Search,
  Clock
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
import { Textarea } from '@/components/ui/textarea';
import PaymentMethodSelector from '@/components/airtime/PaymentMethodSelector';
import ServiceTypeSelector from '@/components/utility/ServiceTypeSelector';
import UtilityProviderSelector from '@/components/utility/UtilityProviderSelector';

const UtilityBills = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State variables
  const [serviceType, setServiceType] = useState('');
  const [provider, setProvider] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('GHC');
  const [billReference, setBillReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);
  
  // Service types
  const serviceTypes = [
    { id: 'electricity', name: 'Electricity', icon: 'Lightbulb' },
    { id: 'water', name: 'Water', icon: 'Droplet' },
    { id: 'internet', name: 'Internet', icon: 'Wifi' },
    { id: 'tv', name: 'TV', icon: 'Tv' },
  ];
  
  // Utility providers with correct type annotation
  const utilityProviders = [
    // Electricity providers
    { id: 'ecg', name: 'Electricity Company of Ghana', type: 'electricity' as 'electricity', description: 'National electricity provider' },
    { id: 'nedco', name: 'Northern Electricity Distribution Company', type: 'electricity' as 'electricity', description: 'Northern region electricity provider' },
    
    // Water providers
    { id: 'gwcl', name: 'Ghana Water Company Ltd', type: 'water' as 'water', description: 'National water provider' },
    
    // Internet providers
    { id: 'mtn-fiber', name: 'MTN Fiber', type: 'internet' as 'internet', description: 'Fiber optic internet services' },
    { id: 'vodafone-fiber', name: 'Vodafone Fiber', type: 'internet' as 'internet', description: 'High-speed broadband services' },
    { id: 'surfline', name: 'Surfline', type: 'internet' as 'internet', description: '4G LTE internet services' },
    
    // TV providers
    { id: 'dstv', name: 'DSTV', type: 'tv' as 'tv', description: 'Premium satellite TV service' },
    { id: 'gotv', name: 'GOTV', type: 'tv' as 'tv', description: 'Digital terrestrial TV service' },
    { id: 'startimes', name: 'StarTimes', type: 'tv' as 'tv', description: 'Affordable digital TV service' },
  ];
  
  // Payment methods
  const paymentMethods = [
    { id: 'GHC', name: 'Cedi Wallet', balance: '₵1,200.00', icon: '🇬🇭', description: 'Pay with your cedi balance' },
    { id: 'NGN', name: 'NGN Wallet', balance: '₦75,000.00', icon: '🇳🇬', description: 'Pay with your naira balance' },
    { id: 'BTC', name: 'Bitcoin', balance: '0.0025 BTC', icon: '₿', description: 'Pay with Bitcoin' },
    { id: 'BTCUSD', name: 'BTCUSD', balance: '150 BTCUSD', icon: '💰', description: 'Pay with BTCUSD' },
    { id: 'USDT', name: 'USDT', balance: '500 USDT', icon: '💵', description: 'Pay with USDT' },
    { id: 'BUSD', name: 'BUSD', balance: '300 BUSD', icon: '💲', description: 'Pay with BUSD' },
  ];
  
  // Recent payments (would come from user's history in a real app)
  const recentPayments = [
    { 
      id: '1', 
      provider: 'Electricity Company of Ghana', 
      account: '12345678901', 
      amount: '₵150.00',
      date: '05/05/2023',
      type: 'electricity'
    },
    { 
      id: '2', 
      provider: 'Ghana Water Company Ltd', 
      account: '98765432101', 
      amount: '₵85.00',
      date: '01/05/2023',
      type: 'water'
    },
    { 
      id: '3', 
      provider: 'DSTV', 
      account: '567890123', 
      amount: '₵220.00',
      date: '28/04/2023',
      type: 'tv'
    },
  ];
  
  // Get provider details
  const getProviderDetails = () => {
    return utilityProviders.find(p => p.id === provider);
  };
  
  // Get service type details
  const getServiceTypeDetails = () => {
    return serviceTypes.find(t => t.id === serviceType);
  };
  
  // Get icon for service type
  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case 'electricity':
        return <Lightbulb className="h-4 w-4" />;
      case 'water':
        return <Droplet className="h-4 w-4" />;
      case 'internet':
        return <Wifi className="h-4 w-4" />;
      case 'tv':
        return <Tv className="h-4 w-4" />;
      default:
        return <Receipt className="h-4 w-4" />;
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!serviceType) {
      toast({
        title: "Service Type Required",
        description: "Please select a utility service type",
        variant: "destructive"
      });
      return;
    }
    
    if (!provider) {
      toast({
        title: "Provider Required",
        description: "Please select a utility provider",
        variant: "destructive"
      });
      return;
    }
    
    if (!accountNumber) {
      toast({
        title: "Account Number Required",
        description: "Please enter your account/meter number",
        variant: "destructive"
      });
      return;
    }
    
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
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
      
      // Generate receipt reference
      setBillReference(`UTL-${Date.now().toString().substring(7)}-${Math.floor(Math.random() * 1000)}`);
      
      toast({
        title: "Payment Successful!",
        description: `You have successfully paid ₵${amount.toFixed(2)} to ${getProviderDetails()?.name}`,
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
    setServiceType('');
    setProvider('');
    setAccountNumber('');
    setAmount(0);
    setPaymentMethod('GHC');
    setShowConfirmation(false);
    setTransactionSuccessful(false);
    setBillReference('');
  };
  
  // Return to dashboard
  const returnToDashboard = () => {
    navigate('/dashboard');
  };
  
  // Calculate exchange rates (would be dynamic in a real app)
  const calculateAmount = () => {
    if (!amount) return 0;
    
    switch (paymentMethod) {
      case 'NGN':
        return amount * 22;  // 1 GHC = 22 NGN
      case 'BTC':
        return amount * 0.000023;  // 1 GHC = 0.000023 BTC
      case 'USDT':
      case 'BUSD':
      case 'BTCUSD':
        return amount * 0.12;  // 1 GHC = 0.12 USDT
      default:
        return amount;
    }
  };
  
  // Get currency symbol
  const getCurrencySymbol = () => {
    switch (paymentMethod) {
      case 'NGN':
        return '₦';
      case 'BTC':
        return '₿';
      case 'USDT':
      case 'BUSD':
      case 'BTCUSD':
        return '$';
      default:
        return '₵';
    }
  };
  
  // Format amount based on currency
  const formatAmount = () => {
    const calculatedAmount = calculateAmount();
    if (paymentMethod === 'BTC') {
      return calculatedAmount.toFixed(6);
    }
    return calculatedAmount.toFixed(2);
  };
  
  // Use a saved payment
  const useSavedPayment = (payment: any) => {
    const provider = utilityProviders.find(p => p.name === payment.provider);
    if (provider) {
      setServiceType(payment.type);
      setProvider(provider.id);
      setAccountNumber(payment.account);
    }
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
      
      <h1 className="text-3xl font-bold mb-6 text-primary/90">Utility Bills</h1>
      
      {transactionSuccessful ? (
        <Card className="animate-fade-in bg-card shadow-md border-muted">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Your utility bill payment was completed successfully
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Service Provider</p>
              <div className="flex items-center">
                <div className="mr-2">
                  {getServiceTypeIcon(serviceType)}
                </div>
                <p className="text-xl font-bold">{getProviderDetails()?.name}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {getServiceTypeDetails()?.name} service
              </p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="text-xl font-bold">{accountNumber}</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Amount Paid</p>
              <p className="text-xl font-bold">₵{amount.toFixed(2)}</p>
              {paymentMethod !== 'GHC' && (
                <p className="text-sm text-muted-foreground">
                  {getCurrencySymbol()}{formatAmount()} was deducted from your {paymentMethod} wallet
                </p>
              )}
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Payment Reference</p>
              <p className="text-xl font-mono">{billReference}</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="text-xl font-bold">{new Date().toLocaleString()}</p>
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
              New Payment
            </Button>
          </CardFooter>
        </Card>
      ) : showConfirmation ? (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Confirm Your Payment</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Service Provider</p>
              <div className="flex items-center">
                <div className="mr-2">
                  {getServiceTypeIcon(serviceType)}
                </div>
                <p className="text-lg font-medium">{getProviderDetails()?.name}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {getServiceTypeDetails()?.name} service
              </p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="text-lg font-medium">{accountNumber}</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-lg font-medium">₵{amount.toFixed(2)}</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="text-lg font-medium flex items-center gap-2">
                <span>{paymentMethods.find(p => p.id === paymentMethod)?.icon}</span>
                <span>{paymentMethods.find(p => p.id === paymentMethod)?.name}</span>
              </p>
              {paymentMethod !== 'GHC' && (
                <p className="text-sm text-muted-foreground mt-1">
                  {getCurrencySymbol()}{formatAmount()} will be deducted from your {paymentMethod} wallet
                </p>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto" 
              onClick={cancelTransaction}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              className="w-full sm:w-auto" 
              onClick={confirmTransaction}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Payment'
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              <Card className="shadow-sm border-muted/40">
                <CardHeader className="bg-muted/10 rounded-t-lg">
                  <CardTitle className="text-xl text-primary/90">Utility Payment Details</CardTitle>
                  <CardDescription>
                    Select service provider and enter payment details
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 pt-6">
                  {/* Service Type Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Service Type</Label>
                    <ServiceTypeSelector
                      serviceTypes={serviceTypes}
                      selectedType={serviceType}
                      onSelectType={setServiceType}
                    />
                  </div>
                  
                  {/* Provider Selection */}
                  {serviceType && (
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Select Provider</Label>
                      <UtilityProviderSelector
                        providers={utilityProviders}
                        selectedProvider={provider}
                        onSelectProvider={setProvider}
                        serviceType={serviceType}
                      />
                    </div>
                  )}
                  
                  {/* Account/Meter Number */}
                  {provider && (
                    <div className="space-y-3">
                      <Label htmlFor="accountNumber" className="text-base font-medium">
                        {serviceType === 'electricity' ? 'Meter Number' : 'Account Number'}
                      </Label>
                      <div className="flex">
                        <Input
                          id="accountNumber"
                          placeholder={serviceType === 'electricity' ? 'Enter meter number' : 'Enter account number'}
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {serviceType === 'electricity' 
                          ? 'Enter the meter number as shown on your meter or bill' 
                          : 'Enter your account number as shown on your bill'}
                      </p>
                    </div>
                  )}
                  
                  {/* Amount */}
                  {provider && (
                    <div className="space-y-3">
                      <Label htmlFor="amount" className="text-base font-medium">Amount (GHC)</Label>
                      <div className="flex">
                        <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted/30 text-muted-foreground">
                          ₵
                        </span>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          value={amount === 0 ? '' : amount}
                          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Payment Method */}
                  {provider && amount > 0 && (
                    <div className="space-y-3">
                      <PaymentMethodSelector
                        paymentMethods={paymentMethods}
                        selectedPaymentMethod={paymentMethod}
                        onSelectPaymentMethod={setPaymentMethod}
                      />
                      
                      {paymentMethod !== 'GHC' && (
                        <div className="rounded-md bg-primary/5 p-3 border border-primary/10">
                          <p className="text-sm">
                            You will pay <strong>{getCurrencySymbol()}{formatAmount()}</strong> from your {paymentMethod} wallet
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="pt-2 pb-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={!serviceType || !provider || !accountNumber || !amount}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Continue to Payment
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
          
          <div className="space-y-6">
            {/* Recent Payments */}
            <Card className="shadow-sm border-muted/40">
              <CardHeader className="bg-muted/10 rounded-t-lg">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Recent Payments</span>
                  <Button variant="ghost" size="icon">
                    <Clock className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {recentPayments.map((payment) => (
                    <button
                      key={payment.id}
                      type="button"
                      className="w-full flex items-start p-3 rounded-md border hover:bg-muted/30 transition-colors text-left"
                      onClick={() => useSavedPayment(payment)}
                    >
                      <div className="mr-3 mt-1 p-2 rounded-full bg-muted/30">
                        {getServiceTypeIcon(payment.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{payment.provider}</p>
                        <p className="text-xs text-muted-foreground">Account: {payment.account}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{payment.date}</span>
                          <span className="text-xs font-medium">{payment.amount}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Bill Validation */}
            <Card className="shadow-sm border-muted/40">
              <CardHeader className="bg-muted/10 rounded-t-lg">
                <CardTitle className="text-lg">Bill Validation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Enter your bill details to validate before payment
                  </p>
                  <div className="flex">
                    <Input
                      placeholder="Enter bill reference number"
                      className="rounded-r-none"
                    />
                    <Button className="rounded-l-none" variant="secondary">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default UtilityBills;

