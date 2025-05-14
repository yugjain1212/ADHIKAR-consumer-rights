const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory if it doesn't exist
const tutorialImagesDir = path.join(__dirname, '../public/images/tutorials');
if (!fs.existsSync(tutorialImagesDir)) {
  fs.mkdirSync(tutorialImagesDir, { recursive: true });
}

// Configuration for tutorial images
const tutorials = [
  {
    id: 'complaint',
    steps: 5,
    languages: ['en', 'hi'],
    colors: {
      en: '#e6f7ff',
      hi: '#fff7e6'
    },
    textColors: {
      en: '#0066cc',
      hi: '#cc6600'
    }
  },
  {
    id: 'chatbot',
    steps: 5,
    languages: ['en', 'hi'],
    colors: {
      en: '#f0f7ff',
      hi: '#fff0f7'
    },
    textColors: {
      en: '#0055aa',
      hi: '#aa0055'
    }
  },
  {
    id: 'resources',
    steps: 5,
    languages: ['en', 'hi'],
    colors: {
      en: '#f7fff0',
      hi: '#f0fff7'
    },
    textColors: {
      en: '#338800',
      hi: '#008833'
    }
  }
];

// Function to generate a placeholder image
function generatePlaceholderImage(text, width, height, bgColor, textColor, outputPath) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Add border
  ctx.strokeStyle = textColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, width - 4, height - 4);

  // Add text
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Handle multi-line text
  const words = text.split(' ');
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < canvas.width - 40) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  // Draw each line
  const lineHeight = 30;
  const y = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;
  
  lines.forEach((line, i) => {
    ctx.fillText(line, canvas.width / 2, y + i * lineHeight);
  });

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

// Generate all tutorial images
tutorials.forEach(tutorial => {
  for (let step = 1; step <= tutorial.steps; step++) {
    tutorial.languages.forEach(lang => {
      const fileName = `${tutorial.id}-step${step}-${lang}.jpg`;
      const filePath = path.join(tutorialImagesDir, fileName);
      
      const text = `${tutorial.id.toUpperCase()} TUTORIAL - STEP ${step} (${lang.toUpperCase()})`;
      
      generatePlaceholderImage(
        text,
        800,  // width
        450,  // height (16:9 aspect ratio)
        tutorial.colors[lang],
        tutorial.textColors[lang],
        filePath
      );
    });
  }
});

console.log('All tutorial images generated successfully!');