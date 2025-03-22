
import { useState } from 'react';
import type { ItemOption } from './DressUpApp';

interface ItemSelectorProps {
  options: ItemOption[];
  selectedItem: ItemOption | null;
  onSelectItem: (item: ItemOption) => void;
}

const ItemSelector = ({ options, selectedItem, onSelectItem }: ItemSelectorProps) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelectItem(item)}
          className={`item-option relative rounded-2xl overflow-hidden p-2 aspect-square
            ${selectedItem?.id === item.id 
              ? 'border-2 border-dressup-frame ring-2 ring-offset-2 ring-dressup-frame' 
              : 'border border-dressup-yellow'
            } 
            bg-white transition-all duration-300 group`}
        >
          <div className="absolute inset-0 bg-dressup-yellow/30 group-hover:bg-dressup-yellow/10 transition-all duration-300" />
          
          <div className="flex items-center justify-center h-full">
            <img
              src={item.src}
              alt={item.alt}
              className={`max-h-full object-contain transition-all duration-500 ${
                loadedImages[item.id] ? 'opacity-100' : 'opacity-0'
              } ${selectedItem?.id === item.id ? 'scale-110' : 'scale-100'}`}
              onLoad={() => handleImageLoad(item.id)}
            />
          </div>
        </button>
      ))}
    </div>
  );
};

export default ItemSelector;
