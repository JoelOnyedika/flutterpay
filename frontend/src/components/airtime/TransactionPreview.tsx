
import React from 'react';
import { Loader2 } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Network {
  id: string;
  name: string;
  logo: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  balance: string;
  icon: string;
}

interface TransactionPreviewProps {
  network: Network | undefined;
  phoneNumber: string;
  amount: number;
  paymentMethod: PaymentMethod | undefined;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
  saveNumber: boolean;
  setSaveNumber: (value: boolean) => void;
}

const TransactionPreview = ({
  network,
  phoneNumber,
  amount,
  paymentMethod,
  onConfirm,
  onCancel,
  isProcessing,
  saveNumber,
  setSaveNumber
}: TransactionPreviewProps) => {
  // Calculate exchange rates (would be dynamic in a real app)
  const getExchangeRate = () => {
    if (!paymentMethod) return amount;
    
    switch (paymentMethod.id) {
      case 'NGN':
        return amount * 22;  // 1 GHC = 22 NGN
      case 'BTC':
        return amount * 0.000023;  // 1 GHC = 0.000023 BTC
      case 'USDT':
        return amount * 0.12;  // 1 GHC = 0.12 USDT
      default:
        return amount;
    }
  };
  
  const getSymbol = () => {
    if (!paymentMethod) return '₵';
    
    switch (paymentMethod.id) {
      case 'NGN':
        return '₦';
      case 'BTC':
        return '₿';
      case 'USDT':
        return '$';
      default:
        return '₵';
    }
  };
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Confirm Your Purchase</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="border rounded-lg p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">Network</p>
          <p className="text-lg font-medium flex items-center gap-2">
            <span>{network?.logo}</span>
            <span>{network?.name}</span>
          </p>
        </div>
        
        <div className="border rounded-lg p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">Recipient</p>
          <p className="text-lg font-medium">{phoneNumber}</p>
        </div>
        
        <div className="border rounded-lg p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">Amount</p>
          <p className="text-lg font-medium">₵{amount.toFixed(2)}</p>
        </div>
        
        <div className="border rounded-lg p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">Payment Method</p>
          <p className="text-lg font-medium flex items-center gap-2">
            <span>{paymentMethod?.icon}</span>
            <span>{paymentMethod?.name}</span>
          </p>
          {paymentMethod?.id !== 'GHC' && (
            <p className="text-sm text-muted-foreground mt-1">
              {getSymbol()}{getExchangeRate().toFixed(paymentMethod?.id === 'BTC' ? 6 : 2)} will be deducted from your {paymentMethod?.id} wallet
            </p>
          )}
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
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button 
          className="w-full sm:w-auto" 
          onClick={onConfirm}
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
  );
};

export default TransactionPreview;
