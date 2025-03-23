
import React from 'react';
import { Check, Wifi } from 'lucide-react';

interface DataPlan {
  id: string;
  name: string;
  size: string;
  validity: string;
  price: number;
  description?: string;
}

interface DataPlanSelectorProps {
  plans: DataPlan[];
  selectedPlan: string;
  onSelectPlan: (planId: string) => void;
  currency: string;
}

const DataPlanSelector = ({ 
  plans, 
  selectedPlan, 
  onSelectPlan,
  currency
}: DataPlanSelectorProps) => {
  // Get currency symbol
  const getCurrencySymbol = (currencyCode: string) => {
    switch (currencyCode) {
      case 'GHC':
        return '₵';
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

  // Calculate price based on currency
  const calculatePrice = (basePrice: number, currencyCode: string) => {
    switch (currencyCode) {
      case 'NGN':
        return basePrice * 22; // 1 GHC = 22 NGN
      case 'BTC':
        return basePrice * 0.000023; // 1 GHC = 0.000023 BTC
      case 'USDT':
      case 'BUSD':
      case 'BTCUSD':
        return basePrice * 0.12; // 1 GHC = 0.12 USDT
      default:
        return basePrice;
    }
  };

  // Format price based on currency
  const formatPrice = (price: number, currencyCode: string) => {
    if (currencyCode === 'BTC') {
      return price.toFixed(6);
    }
    return price.toFixed(2);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {plans.map((plan) => (
        <button
          key={plan.id}
          type="button"
          className={`border rounded-lg p-4 text-left transition-colors hover:bg-muted/30 ${
            selectedPlan === plan.id 
              ? 'border-primary bg-primary/5 shadow-sm' 
              : 'border-border'
          }`}
          onClick={() => onSelectPlan(plan.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <Wifi className="h-4 w-4 text-primary mr-2" />
                <span className="font-medium">{plan.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{plan.size} • {plan.validity}</p>
              {plan.description && (
                <p className="text-xs text-muted-foreground">{plan.description}</p>
              )}
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-lg">
                {getCurrencySymbol(currency)}{formatPrice(calculatePrice(plan.price, currency), currency)}
              </span>
              {selectedPlan === plan.id && (
                <div className="mt-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default DataPlanSelector;
