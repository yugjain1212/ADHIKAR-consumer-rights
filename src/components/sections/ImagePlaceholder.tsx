import React from 'react';

interface ImagePlaceholderProps {
  text: string;
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  text,
  width = '100%',
  height = '100%',
  bgColor = '#f0f0f0',
  textColor = '#333333'
}) => {
  return (
    <div 
      style={{
        width,
        height,
        backgroundColor: bgColor,
        color: textColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        fontWeight: 'bold'
      }}
    >
      {text}
    </div>
  );
};

export default ImagePlaceholder;