
import { ShieldCheck, ShoppingCart, FileText, Scale, Info } from 'lucide-react';
import React from 'react';

export type IconName = 'shield' | 'cart' | 'file' | 'scale' | 'info';

export const getIcon = (name: IconName) => {
  const icons = {
    shield: ShieldCheck,
    cart: ShoppingCart,
    file: FileText,
    scale: Scale,
    info: Info,
  };

  const IconComponent = icons[name];
  return <IconComponent className="h-6 w-6 text-primary" strokeWidth={2} />;
};

