
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  ArrowLeft, 
  Loader2, 
  Phone, 
  Wifi,
  Database,
  SignalHigh
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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import NetworkSelector from '@/components/airtime/NetworkSelector';
import PaymentMethodSelector from '@/components/airtime/PaymentMethodSelector';
import DataPlanSelector from '@/components/data/DataPlanSelector';
import RecentNumbers from '@/components/airtime/RecentNumbers';
import TransactionPreview from '@/components/airtime/TransactionPreview';

const DataPurchase = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State variables
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
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
  
  // Payment methods
  const paymentMethods = [
    { id: 'GHC', name: 'Cedi Wallet', balance: '₵1,200.00', icon: '🇬🇭' },
    { id: 'NGN', name: 'NGN Wallet', balance: '₦75,000.00', icon: '🇳🇬' },
    { id: 'BTC', name: 'Bitcoin', balance: '0.0025 BTC', icon: '₿' },
    { id: 'BTCUSD', name: 'BTCUSD', balance: '150 BTCUSD', icon: '💰' },
    { id: 'USDT', name: 'USDT', balance: '500 USDT', icon: '💵' },
    { id: 'BUSD', name: 'BUSD', balance: '300 BUSD', icon: '💲' },
  ];
  
  // Data plans by network (would come from an API in a real app)
  const dataPlans = {
    mtn: [
      { id: 'mtn-daily-1', name: 'Daily Lite', size: '100MB', validity: '1 Day', price: 1.5, description: 'For light browsing and social media' },
      { id: 'mtn-daily-2', name: 'Daily Plus', size: '300MB', validity: '1 Day', price: 3, description: 'For video streaming and downloads' },
      { id: 'mtn-weekly-1', name: 'Weekly Basic', size: '500MB', validity: '7 Days', price: 5, description: 'Weekly casual use package' },
      { id: 'mtn-weekly-2', name: 'Weekly Pro', size: '1.5GB', validity: '7 Days', price: 10, description: 'For regular weekly internet users' },
      { id: 'mtn-monthly-1', name: 'Monthly Lite', size: '2GB', validity: '30 Days', price: 15, description: 'Basic monthly internet package' },
      { id: 'mtn-monthly-2', name: 'Monthly Plus', size: '5GB', validity: '30 Days', price: 25, description: 'Enhanced monthly internet bundle' },
      { id: 'mtn-monthly-3', name: 'Monthly Ultra', size: '10GB', validity: '30 Days', price: 40, description: 'For heavy internet users' },
      { id: 'mtn-monthly-4', name: 'Monthly Max', size: '20GB', validity: '30 Days', price: 75, description: 'Maximum internet experience' },
    ],
    vodafone: [
      { id: 'voda-daily-1', name: 'Red Daily', size: '150MB', validity: '1 Day', price: 1.5, description: 'Quick daily fix for essential tasks' },
      { id: 'voda-daily-2', name: 'Red Daily Plus', size: '350MB', validity: '1 Day', price: 3, description: 'Enhanced daily browsing experience' },
      { id: 'voda-weekly-1', name: 'Red Weekly', size: '600MB', validity: '7 Days', price: 5, description: 'Weekly internet essentials' },
      { id: 'voda-weekly-2', name: 'Red Weekly Plus', size: '2GB', validity: '7 Days', price: 10, description: 'Superior weekly internet package' },
      { id: 'voda-monthly-1', name: 'Red Monthly', size: '3GB', validity: '30 Days', price: 15, description: 'Monthly internet essentials' },
      { id: 'voda-monthly-2', name: 'Red Monthly Plus', size: '6GB', validity: '30 Days', price: 25, description: 'Enhanced monthly internet package' },
      { id: 'voda-monthly-3', name: 'Red Monthly Ultra', size: '12GB', validity: '30 Days', price: 45, description: 'Premium monthly internet bundle' },
    ],
    airteltigo: [
      { id: 'at-daily-1', name: 'AT Daily', size: '120MB', validity: '1 Day', price: 1.5, description: 'Basic daily internet package' },
      { id: 'at-daily-2', name: 'AT Daily Plus', size: '320MB', validity: '1 Day', price: 3, description: 'Enhanced daily internet experience' },
      { id: 'at-weekly-1', name: 'AT Weekly', size: '550MB', validity: '7 Days', price: 5, description: 'Basic weekly internet package' },
      { id: 'at-weekly-2', name: 'AT Weekly Plus', size: '1.8GB', validity: '7 Days', price: 10, description: 'Enhanced weekly internet bundle' },
      { id: 'at-monthly-1', name: 'AT Monthly', size: '2.5GB', validity: '30 Days', price: 15, description: 'Monthly internet essentials' },
      { id: 'at-monthly-2', name: 'AT Monthly Plus', size: '5.5GB', validity: '30 Days', price: 25, description: 'Superior monthly internet experience' },
      { id: 'at-monthly-3', name: 'AT Monthly Max', size: '11GB', validity: '30 Days', price: 42, description: 'Maximum monthly internet bundle' },
    ],
    glo: [
      { id: 'glo-daily-1', name: 'Glo Daily', size: '130MB', validity: '1 Day', price: 1.5, description: 'Quick daily internet package' },
      { id: 'glo-daily-2', name: 'Glo Daily Plus', size: '330MB', validity: '1 Day', price: 3, description: 'Enhanced daily browsing bundle' },
      { id: 'glo-weekly-1', name: 'Glo Weekly', size: '570MB', validity: '7 Days', price: 5, description: 'Weekly internet essentials' },
      { id: 'glo-weekly-2', name: 'Glo Weekly Plus', size: '1.7GB', validity: '7 Days', price: 10, description: 'Superior weekly internet package' },
      { id: 'glo-monthly-1', name: 'Glo Monthly', size: '2.2GB', validity: '30 Days', price: 15, description: 'Monthly internet basics' },
      { id: 'glo-monthly-2', name: 'Glo Monthly Plus', size: '5.2GB', validity: '30 Days', price: 25, description: 'Enhanced monthly internet experience' },
      { id: 'glo-monthly-3', name: 'Glo Monthly Max', size: '10.5GB', validity: '30 Days', price: 41, description: 'Maximum monthly internet bundle' },
    ],
  };
  
  // Get current data plans based on selected network
  const getCurrentDataPlans = () => {
    if (!selectedNetwork) return [];
    return dataPlans[selectedNetwork as keyof typeof dataPlans] || [];
  };
  
  // Get selected plan details
  const getSelectedPlanDetails = () => {
    const plans = getCurrentDataPlans();
    return plans.find(plan => plan.id === selectedPlan);
  };
  
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
    
    if (!selectedPlan) {
      toast({
        title: "Data Plan Required",
        description: "Please select a data plan",
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
      
      const selectedPlanDetails = getSelectedPlanDetails();
      
      toast({
        title: "Success!",
        description: `You've successfully purchased ${selectedPlanDetails?.size} data bundle for ${phoneNumber}`,
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
    setSelectedPlan('');
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

  // Get the selected plan price
  const getSelectedPlanPrice = () => {
    const plan = getSelectedPlanDetails();
    if (!plan) return 0;

    // Calculate price based on selected payment method
    switch (paymentMethod) {
      case 'NGN':
        return plan.price * 22;  // 1 GHC = 22 NGN
      case 'BTC':
        return plan.price * 0.000023;  // 1 GHC = 0.000023 BTC
      case 'USDT':
      case 'BUSD':
      case 'BTCUSD':
        return plan.price * 0.12;  // 1 GHC = 0.12 USDT
      default:
        return plan.price;
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
      
      <h1 className="text-3xl font-bold mb-6 text-primary/90">Data Purchase</h1>
      
      {transactionSuccessful ? (
        <Card className="animate-fade-in bg-card shadow-md border-muted">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-2xl">Transaction Successful!</CardTitle>
            <CardDescription>
              Your data purchase was completed successfully
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Data Plan</p>
              <p className="text-xl font-bold">{getSelectedPlanDetails()?.name}</p>
              <p className="text-sm text-muted-foreground">{getSelectedPlanDetails()?.size} • {getSelectedPlanDetails()?.validity}</p>
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
                DATA-{Math.random().toString(36).substring(2, 10).toUpperCase()}
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
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Confirm Your Purchase</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Network</p>
              <p className="text-lg font-medium flex items-center gap-2">
                <span>{networks.find(n => n.id === selectedNetwork)?.logo}</span>
                <span>{networks.find(n => n.id === selectedNetwork)?.name}</span>
              </p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Recipient</p>
              <p className="text-lg font-medium">{phoneNumber}</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Data Plan</p>
              <p className="text-lg font-medium">{getSelectedPlanDetails()?.name}</p>
              <p className="text-sm text-muted-foreground">{getSelectedPlanDetails()?.size} • {getSelectedPlanDetails()?.validity}</p>
              <p className="text-sm text-muted-foreground">{getSelectedPlanDetails()?.description}</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-lg font-medium">
                {paymentMethod === 'GHC' && '₵'}
                {paymentMethod === 'NGN' && '₦'}
                {paymentMethod === 'BTC' && '₿'}
                {(paymentMethod === 'USDT' || paymentMethod === 'BUSD' || paymentMethod === 'BTCUSD') && '$'}
                {paymentMethod === 'BTC' ? getSelectedPlanPrice().toFixed(6) : getSelectedPlanPrice().toFixed(2)}
              </p>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="text-lg font-medium flex items-center gap-2">
                <span>{paymentMethods.find(p => p.id === paymentMethod)?.icon}</span>
                <span>{paymentMethods.find(p => p.id === paymentMethod)?.name}</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="save-number"
                checked={saveNumber}
                onCheckedChange={setSaveNumber}
              />
              <Label htmlFor="save-number" className="cursor-pointer">Save this number for future purchases</Label>
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
                'Confirm Purchase'
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
                  <CardTitle className="text-xl text-primary/90">Data Bundle Details</CardTitle>
                  <CardDescription>
                    Enter recipient details and select a data bundle
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
                  
                  {/* Data Plan Selection */}
                  {selectedNetwork && (
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Select Data Plan</Label>
                      <DataPlanSelector
                        plans={getCurrentDataPlans()}
                        selectedPlan={selectedPlan}
                        onSelectPlan={setSelectedPlan}
                        currency={paymentMethod}
                      />
                    </div>
                  )}
                  
                  {/* Payment Method */}
                  <div className="space-y-3">
                    <PaymentMethodSelector
                      paymentMethods={paymentMethods}
                      selectedPaymentMethod={paymentMethod}
                      onSelectPaymentMethod={setPaymentMethod}
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2 pb-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={!selectedNetwork || !phoneNumber || !selectedPlan}
                  >
                    <Database className="mr-2 h-4 w-4" />
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
                    <Phone className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <RecentNumbers
                  numbers={recentNumbers}
                  onSelect={selectRecentNumber}
                />
              </CardContent>
            </Card>
            
            {/* Data Usage Stats */}
            <Card className="shadow-sm border-muted/40">
              <CardHeader className="bg-muted/10 rounded-t-lg">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Data Usage</span>
                  <Button variant="ghost" size="icon">
                    <SignalHigh className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">MTN Data</span>
                      <span className="font-medium">1.2GB / 2GB</span>
                    </div>
                    <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">Expires in 15 days</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Vodafone Data</span>
                      <span className="font-medium">500MB / 5GB</span>
                    </div>
                    <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">Expires in 28 days</p>
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

export default DataPurchase;
