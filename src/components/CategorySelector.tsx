
import { Shirt, ShoppingBag, Crown, Image } from 'lucide-react';
import type { Category } from './DressUpApp';

interface CategorySelectorProps {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
}

const CategorySelector = ({ activeCategory, setActiveCategory }: CategorySelectorProps) => {
  const categories: {id: Category, icon: React.ReactNode, label: string}[] = [
    { id: 'shirt', icon: <Shirt size={18} />, label: 'Shirts' },
    { id: 'bottom', icon: <ShoppingBag size={18} />, label: 'Bottoms' },
    { id: 'hat', icon: <Crown size={18} />, label: 'Hats' },
    { id: 'background', icon: <Image size={18} />, label: 'Background' }
  ];
  
  return (
    <div className="flex items-center space-x-1">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`category-button p-2 rounded-md ${
            activeCategory === category.id 
              ? 'bg-dressup-button shadow-md' 
              : 'bg-dressup-button bg-opacity-50'
          }`}
          aria-label={category.label}
        >
          {category.icon}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
