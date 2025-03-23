
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";

interface Currency {
  id: string;
  name: string;
  symbol: string;
  balance: string;
}

interface CurrencySelectorProps {
  currencies: Currency[];
  selected: string;
  onSelect: (value: string) => void;
  showBalances: boolean;
  onToggleBalances: () => void;
}

const CurrencySelector = ({ 
  currencies, 
  selected, 
  onSelect, 
  showBalances, 
  onToggleBalances 
}: CurrencySelectorProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Transaction Currency:</span>
        <Select value={selected} onValueChange={onSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.id} value={currency.id}>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{currency.symbol}</span>
                  <span>{currency.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Show Balances:</span>
        <div className="flex items-center space-x-2">
          <Switch 
            checked={showBalances} 
            onCheckedChange={onToggleBalances} 
            id="show-balances"
          />
          <label htmlFor="show-balances" className="cursor-pointer">
            {showBalances ? (
              <Eye className="h-4 w-4 text-muted-foreground" />
            ) : (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default CurrencySelector;
