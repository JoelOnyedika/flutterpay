
import React from 'react';
import { Phone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface RecentNumber {
  id: string;
  name: string;
  number: string;
}

interface RecentNumbersProps {
  numbers: RecentNumber[];
  onSelect: (number: string) => void;
}

const RecentNumbers = ({ numbers, onSelect }: RecentNumbersProps) => {
  // Limit to showing only 5 numbers
  const limitedNumbers = numbers.slice(0, 5);
  
  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Select Recent Number</span>
            <Phone className="ml-2 h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[240px]">
          {limitedNumbers.length === 0 ? (
            <div className="text-center py-3 px-2 text-sm text-muted-foreground">
              No recent numbers
            </div>
          ) : (
            limitedNumbers.map((number) => (
              <DropdownMenuItem
                key={number.id}
                onClick={() => onSelect(number.number)}
                className="cursor-pointer"
              >
                <div className="flex items-center w-full">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{number.name}</p>
                    <p className="text-xs text-muted-foreground">{number.number}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RecentNumbers;
