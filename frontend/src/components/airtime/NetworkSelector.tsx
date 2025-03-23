
import React from 'react';
import { Check } from 'lucide-react';

interface Network {
  id: string;
  name: string;
  logo: string;
}

interface NetworkSelectorProps {
  networks: Network[];
  selectedNetwork: string;
  onSelect: (networkId: string) => void;
}

const NetworkSelector = ({ networks, selectedNetwork, onSelect }: NetworkSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {networks.map((network) => (
        <button
          key={network.id}
          type="button"
          className={`border rounded-lg p-4 text-center transition-colors hover:bg-muted/30 ${
            selectedNetwork === network.id 
              ? 'border-primary bg-primary/5 shadow-sm' 
              : 'border-border'
          }`}
          onClick={() => onSelect(network.id)}
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">{network.logo}</span>
            <span className="text-sm font-medium">{network.name}</span>
            {selectedNetwork === network.id && (
              <div className="mt-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-3 w-3 text-primary" />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default NetworkSelector;
