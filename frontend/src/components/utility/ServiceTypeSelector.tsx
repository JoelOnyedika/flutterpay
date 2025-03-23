
import React from 'react';
import { Lightbulb, Droplet, Wifi, Tv } from 'lucide-react';

interface ServiceType {
  id: string;
  name: string;
  icon: string;
}

interface ServiceTypeSelectorProps {
  serviceTypes: ServiceType[];
  selectedType: string;
  onSelectType: (typeId: string) => void;
}

const ServiceTypeSelector = ({ 
  serviceTypes, 
  selectedType, 
  onSelectType 
}: ServiceTypeSelectorProps) => {
  // Get icon component based on service type
  const getIconComponent = (id: string) => {
    switch (id) {
      case 'electricity':
        return <Lightbulb className="h-6 w-6" />;
      case 'water':
        return <Droplet className="h-6 w-6" />;
      case 'internet':
        return <Wifi className="h-6 w-6" />;
      case 'tv':
        return <Tv className="h-6 w-6" />;
      default:
        return <Lightbulb className="h-6 w-6" />;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {serviceTypes.map((type) => (
        <button
          key={type.id}
          type="button"
          className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-colors ${
            selectedType === type.id 
              ? 'bg-primary/10 border-primary text-primary' 
              : 'border-border bg-card hover:bg-muted/30'
          }`}
          onClick={() => onSelectType(type.id)}
        >
          <div className={`p-3 rounded-full mb-2 ${
            selectedType === type.id 
              ? 'bg-primary/20' 
              : 'bg-muted/30'
          }`}>
            {getIconComponent(type.id)}
          </div>
          <span className="text-sm font-medium">{type.name}</span>
        </button>
      ))}
    </div>
  );
};

export default ServiceTypeSelector;
