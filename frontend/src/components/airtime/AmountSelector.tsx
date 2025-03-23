
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface AmountSelectorProps {
  presetAmounts: number[];
  selectedAmount: number;
  onSelectAmount: (amount: number) => void;
}

const AmountSelector = ({ 
  presetAmounts, 
  selectedAmount, 
  onSelectAmount 
}: AmountSelectorProps) => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const handlePresetClick = (amount: number) => {
    onSelectAmount(amount);
    setCustomAmount('');
    setIsCustom(false);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setIsCustom(true);
    
    // Convert string to number and update parent state
    const numValue = parseFloat(value) || 0;
    onSelectAmount(numValue);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            className={`border rounded-lg py-2 px-3 transition-all hover:bg-muted/50 ${
              selectedAmount === amount && !isCustom
                ? 'border-primary bg-primary/10'
                : 'border-border'
            }`}
            onClick={() => handlePresetClick(amount)}
          >
            <span className="font-medium">₵{amount}</span>
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="w-full">
          <Input
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            className={isCustom ? 'border-primary ring-2 ring-primary/20' : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default AmountSelector;
