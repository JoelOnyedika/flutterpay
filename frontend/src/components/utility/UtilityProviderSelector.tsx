
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Lightbulb, 
  Droplet, 
  Wifi, 
  Tv, 
  Building2,
  Search
} from 'lucide-react';

interface UtilityProvider {
  id: string;
  name: string;
  description?: string;
  type: 'electricity' | 'water' | 'internet' | 'tv' | 'other';
}

interface UtilityProviderSelectorProps {
  providers: UtilityProvider[];
  selectedProvider: string;
  onSelectProvider: (providerId: string) => void;
  serviceType: string;
}

const UtilityProviderSelector = ({ 
  providers, 
  selectedProvider, 
  onSelectProvider,
  serviceType 
}: UtilityProviderSelectorProps) => {
  // Filter providers by service type
  const filteredProviders = serviceType 
    ? providers.filter(provider => provider.type === serviceType)
    : providers;
  
  // Get icon based on service type
  const getIconComponent = (type: string) => {
    switch (type) {
      case 'electricity':
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case 'water':
        return <Droplet className="h-5 w-5 text-blue-500" />;
      case 'internet':
        return <Wifi className="h-5 w-5 text-green-500" />;
      case 'tv':
        return <Tv className="h-5 w-5 text-purple-500" />;
      default:
        return <Building2 className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-2">
      <Select 
        value={selectedProvider} 
        onValueChange={onSelectProvider}
        disabled={filteredProviders.length === 0}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={
            filteredProviders.length === 0 
              ? "No providers available" 
              : "Select a provider"
          } />
        </SelectTrigger>
        <SelectContent>
          {filteredProviders.map((provider) => (
            <SelectItem key={provider.id} value={provider.id}>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {getIconComponent(provider.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{provider.name}</p>
                  {provider.description && (
                    <p className="text-xs text-muted-foreground">{provider.description}</p>
                  )}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UtilityProviderSelector;
