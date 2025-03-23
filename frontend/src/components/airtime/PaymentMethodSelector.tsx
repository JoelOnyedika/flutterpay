
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wallet, CreditCard, DollarSign, Bitcoin } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  balance: string;
  icon: string;
  description?: string;
}

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod: string;
  onSelectPaymentMethod: (methodId: string) => void;
}

const PaymentMethodSelector = ({ 
  paymentMethods, 
  selectedPaymentMethod, 
  onSelectPaymentMethod 
}: PaymentMethodSelectorProps) => {
  // Helper function to get the appropriate icon component
  const getIconComponent = (id: string) => {
    switch (id) {
      case 'BTC':
        return <Bitcoin className="h-5 w-5 text-orange-500" />;
      case 'USDT':
      case 'BUSD':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'NGN':
        return <Wallet className="h-5 w-5 text-purple-500" />;
      case 'GHC':
        return <Wallet className="h-5 w-5 text-blue-500" />;
      default:
        return <CreditCard className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
      <Select value={selectedPaymentMethod} onValueChange={onSelectPaymentMethod}>
        <SelectTrigger className="w-full bg-card border-muted shadow-sm">
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent>
          {paymentMethods.map((method) => (
            <SelectItem key={method.id} value={method.id} className="py-2">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {getIconComponent(method.id)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{method.name}</p>
                  {method.description && (
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <span className="text-sm text-muted-foreground">{method.balance}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentMethodSelector;
