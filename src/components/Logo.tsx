import React from 'react';
import { Palette } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Palette className="h-8 w-8 text-gold-600" />
      <span className="ml-2 text-xl font-serif font-bold tracking-wider">
        NXT LVL <span className="text-gold-600">ART</span>
      </span>
    </div>
  );
};

export default Logo;