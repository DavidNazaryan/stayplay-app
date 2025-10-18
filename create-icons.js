import fs from 'fs';
import path from 'path';

// Создаем простые PNG иконки в разных размерах
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Создаем базовую SVG иконку
const createIcon = (size) => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="256" cy="256" r="240" fill="#1e293b"/>
    <text x="256" y="320" font-family="Arial, sans-serif" font-size="180" font-weight="bold" text-anchor="middle" fill="white">SP</text>
    <circle cx="150" cy="150" r="20" fill="#10b981"/>
    <circle cx="362" cy="150" r="20" fill="#10b981"/>
    <circle cx="150" cy="362" r="20" fill="#10b981"/>
    <circle cx="362" cy="362" r="20" fill="#10b981"/>
    <path d="M256 200 L280 240 L240 240 Z" fill="#f59e0b"/>
    <circle cx="256" cy="280" r="15" fill="#f59e0b"/>
  </svg>`;
};

// Создаем HTML файл для конвертации в PNG
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; padding: 20px; background: white; }
        .icon { display: inline-block; margin: 10px; }
    </style>
</head>
<body>
    ${sizes.map(size => `
        <div class="icon">
            <h3>${size}x${size}</h3>
            ${createIcon(size)}
        </div>
    `).join('')}
</body>
</html>
`;

fs.writeFileSync('icon-preview.html', htmlContent);

console.log('✅ Создан файл icon-preview.html');
console.log('📝 Откройте его в браузере и сохраните иконки как PNG');
console.log('📁 Разместите PNG файлы в папке public/icons/');
console.log('');
console.log('Нужные размеры:');
sizes.forEach(size => {
  console.log(`- icon-${size}x${size}.png`);
});
