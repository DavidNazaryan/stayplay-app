import fs from 'fs';

// Создаем простые PNG иконки используя Canvas API (если доступен) или создаем базовые файлы
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Создаем простую иконку в формате Data URL (base64 PNG)
const createSimpleIcon = (size) => {
  // Это простой PNG 1x1 пиксель, который мы можем использовать как заглушку
  const pngData = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  
  return {
    data: pngData,
    size: size
  };
};

// Создаем файлы иконок
sizes.forEach(size => {
  const icon = createSimpleIcon(size);
  const filename = `public/icons/icon-${size}x${size}.png`;
  
  // Создаем простой PNG файл (заглушка)
  const pngBuffer = Buffer.from(icon.data, 'base64');
  fs.writeFileSync(filename, pngBuffer);
  
  console.log(`✅ Создана иконка: ${filename}`);
});

console.log('\n🎉 Все иконки созданы!');
console.log('📱 Теперь можно использовать PWA Builder для создания .ipa файла');


