
import { useState, useEffect } from 'react';
import CharacterDisplay from './CharacterDisplay';
import CategorySelector from './CategorySelector';
import ItemSelector from './ItemSelector';
import { toast } from "sonner";

// Define the types
export type Category = 'shirt' | 'bottom' | 'hat' | 'background';
export type ItemOption = {
  id: string;
  src: string;
  alt: string;
};

const DressUpApp = () => {
  // Define the clothing options with external URLs
  const shirtOptions: ItemOption[] = [
    { id: "shirt-1", src: "https://dressup.nashawanich.com/assets/dress-up-elements/blue-shirt.png", alt: "Blue Shirt" },
    { id: "shirt-2", src: "https://dressup.nashawanich.com/assets/dress-up-elements/red-shirt.png", alt: "Red Shirt" },
    { id: "shirt-3", src: "https://dressup.nashawanich.com/assets/dress-up-elements/sailor-shirt.png", alt: "Sailor Shirt" }
  ];

  const bottomOptions: ItemOption[] = [
    { id: "bottom-1", src: "https://dressup.nashawanich.com/assets/dress-up-elements/skirt.png", alt: "Skirt" },
    { id: "bottom-2", src: "https://dressup.nashawanich.com/assets/dress-up-elements/yellow-pants.png", alt: "Yellow Pants" },
    { id: "bottom-3", src: "https://dressup.nashawanich.com/assets/dress-up-elements/blue-pants.png", alt: "Blue Pants" }
  ];

  const hatOptions: ItemOption[] = [
    { id: "hat-1", src: "https://dressup.nashawanich.com/assets/dress-up-elements/straw-hat.png", alt: "Straw Hat" },
    { id: "hat-2", src: "https://dressup.nashawanich.com/assets/dress-up-elements/frog-hat.png", alt: "Frog Hat" },
    { id: "hat-3", src: "https://dressup.nashawanich.com/assets/dress-up-elements/bow.png", alt: "Bow" }
  ];

  const backgroundOptions: ItemOption[] = [
    { id: "bg-1", src: "https://dressup.nashawanich.com/assets/background/background-yellow.png", alt: "Yellow Background" },
    { id: "bg-2", src: "https://dressup.nashawanich.com/assets/background/blue-background.png", alt: "Blue Background" },
    { id: "bg-3", src: "https://dressup.nashawanich.com/assets/background/purple-background.png", alt: "Purple Background" }
  ];

  // Character base - updated to use the external URL
  const characterBase = "https://dressup.nashawanich.com//Dress Up Game_files/head.png";

  // State
  const [activeCategory, setActiveCategory] = useState<Category>('shirt');
  const [selectedShirt, setSelectedShirt] = useState<ItemOption | null>(shirtOptions[0]);
  const [selectedBottom, setSelectedBottom] = useState<ItemOption | null>(bottomOptions[0]);
  const [selectedHat, setSelectedHat] = useState<ItemOption | null>(hatOptions[0]);
  const [selectedBackground, setSelectedBackground] = useState<ItemOption | null>(backgroundOptions[0]);
  const [outfitComplete, setOutfitComplete] = useState(false);

  // Helper to get options for current category
  const getOptionsForCategory = (category: Category): ItemOption[] => {
    switch (category) {
      case 'shirt':
        return shirtOptions;
      case 'bottom':
        return bottomOptions;
      case 'hat':
        return hatOptions;
      case 'background':
        return backgroundOptions;
    }
  };

  // Helper to update selected item for current category
  const updateSelectedItem = (item: ItemOption) => {
    switch (activeCategory) {
      case 'shirt':
        setSelectedShirt(item);
        break;
      case 'bottom':
        setSelectedBottom(item);
        break;
      case 'hat':
        setSelectedHat(item);
        break;
      case 'background':
        setSelectedBackground(item);
        break;
    }
  };

  // Get current selected item for active category
  const getCurrentSelectedItem = (): ItemOption | null => {
    switch (activeCategory) {
      case 'shirt':
        return selectedShirt;
      case 'bottom':
        return selectedBottom;
      case 'hat':
        return selectedHat;
      case 'background':
        return selectedBackground;
    }
  };

  // Check if outfit is complete
  useEffect(() => {
    if (selectedShirt && selectedBottom && selectedHat && selectedBackground) {
      setOutfitComplete(true);
    } else {
      setOutfitComplete(false);
    }
  }, [selectedShirt, selectedBottom, selectedHat, selectedBackground]);

  // Show welcome toast on mount
  useEffect(() => {
    toast("Welcome to Dress Up Funland! Select items to dress your character.");
    
    // Default selections have been set in state initialization
  }, []);

  // Complete outfit
  const handleCompleteOutfit = () => {
    if (outfitComplete) {
      toast.success("Your outfit is complete! Looking fabulous!");
    } else {
      toast.error("Please select all items to complete your outfit!");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 pb-12 animate-fade-in">
      <h1 className="pixel-title text-4xl md:text-5xl text-dressup-frame mt-8 mb-4 animate-slide-down">
        what should i wear today
      </h1>
      
      <div className="dress-up-frame bg-dressup-mint rounded-3xl p-3 w-full max-w-md animate-slide-up">
        <div className="relative rounded-2xl overflow-hidden bg-dressup-yellow aspect-[3/4] w-full">
          {/* Character display area */}
          <CharacterDisplay 
            characterBase={characterBase}
            shirt={selectedShirt}
            bottom={selectedBottom}
            hat={selectedHat}
            background={selectedBackground}
          />
          
          {/* Category selector */}
          <div className="absolute bottom-0 left-0 right-0 bg-dressup-button bg-opacity-70 backdrop-blur-sm p-2 flex justify-around">
            <CategorySelector 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <button 
              onClick={handleCompleteOutfit}
              className={`rounded-md p-2 transition-all duration-300 ${outfitComplete ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-400'}`}
            >
              ✓
            </button>
          </div>
        </div>
      </div>
      
      {/* Item selector */}
      <div className="mt-6 w-full max-w-md animate-slide-up animation-delay-300">
        <ItemSelector 
          options={getOptionsForCategory(activeCategory)}
          selectedItem={getCurrentSelectedItem()}
          onSelectItem={updateSelectedItem}
        />
      </div>
    </div>
  );
};

export default DressUpApp;
