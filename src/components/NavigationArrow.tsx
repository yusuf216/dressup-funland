
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationArrowProps {
  direction: 'left' | 'right';
}

const NavigationArrow = ({ direction }: NavigationArrowProps) => {
  return (
    <button
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === 'left' ? 'left-2' : 'right-2'
      } bg-white bg-opacity-70 hover:bg-opacity-100 p-1 rounded-full shadow-md
      transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-soft`}
    >
      {direction === 'left' ? (
        <ChevronLeft size={24} className="text-gray-700" />
      ) : (
        <ChevronRight size={24} className="text-gray-700" />
      )}
    </button>
  );
};

export default NavigationArrow;
