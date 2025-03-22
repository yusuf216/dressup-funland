
import { useState, useEffect } from 'react';
import NavigationArrow from './NavigationArrow';
import type { ItemOption } from './DressUpApp';

interface CharacterDisplayProps {
  characterBase: string;
  shirt: ItemOption | null;
  bottom: ItemOption | null;
  hat: ItemOption | null;
  background: ItemOption | null;
}

const CharacterDisplay = ({ 
  characterBase, 
  shirt, 
  bottom, 
  hat, 
  background 
}: CharacterDisplayProps) => {
  const [imageLoaded, setImageLoaded] = useState({
    character: false,
    shirt: false,
    bottom: false,
    hat: false,
    background: false
  });

  // Reset loading state when items change
  useEffect(() => {
    setImageLoaded(prev => ({
      ...prev,
      shirt: false
    }));
  }, [shirt]);

  useEffect(() => {
    setImageLoaded(prev => ({
      ...prev,
      bottom: false
    }));
  }, [bottom]);

  useEffect(() => {
    setImageLoaded(prev => ({
      ...prev,
      hat: false
    }));
  }, [hat]);

  useEffect(() => {
    setImageLoaded(prev => ({
      ...prev,
      background: false
    }));
  }, [background]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background */}
      {background && (
        <img 
          src={background.src} 
          alt={background.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${imageLoaded.background ? 'image-blur-loaded' : 'image-blur-loading'}`}
          onLoad={() => setImageLoaded(prev => ({ ...prev, background: true }))}
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48">
          {/* Base character */}
          <img 
            src={characterBase} 
            alt="Character" 
            className={`absolute top-0 left-0 transition-all duration-300 ${imageLoaded.character ? 'image-blur-loaded' : 'image-blur-loading'}`}
            onLoad={() => setImageLoaded(prev => ({ ...prev, character: true }))}
          />

          {/* Bottom */}
          {bottom && (
            <img 
              src={bottom.src} 
              alt={bottom.alt}
              className={`absolute top-0 left-0 transition-opacity duration-300 ${imageLoaded.bottom ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(prev => ({ ...prev, bottom: true }))}
            />
          )}

          {/* Shirt */}
          {shirt && (
            <img 
              src={shirt.src} 
              alt={shirt.alt}
              className={`absolute top-0 left-0 transition-opacity duration-300 ${imageLoaded.shirt ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(prev => ({ ...prev, shirt: true }))}
            />
          )}

          {/* Hat */}
          {hat && (
            <img 
              src={hat.src} 
              alt={hat.alt}
              className={`absolute top-0 left-0 transition-opacity duration-300 ${imageLoaded.hat ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(prev => ({ ...prev, hat: true }))}
            />
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <NavigationArrow direction="left" />
      <NavigationArrow direction="right" />
    </div>
  );
};

export default CharacterDisplay;
