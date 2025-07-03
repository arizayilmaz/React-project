import React from 'react';

// Bileşenin alacağı proplar için bir tip tanımı yapıyoruz
type ButtonProps = {
  children: React.ReactNode; // Butonun içindeki metin veya ikon
  onClick?: () => void;       // Tıklanma olayı (opsiyonel)
  className?: string;         // Ekstra CSS sınıfları için (opsiyonel)
};

const Button = ({ children, onClick, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      // Tailwind sınıfları ile temel stil + dışarıdan gelen ekstra sınıflar
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;