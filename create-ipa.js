import fs from 'fs';
import path from 'path';

console.log('🚀 StayPlay - Создание .ipa файла для AltStore');
console.log('');

// Проверяем наличие собранного приложения
if (!fs.existsSync('dist')) {
  console.log('❌ Ошибка: Папка dist не найдена');
  console.log('💡 Запустите: npm run build');
  process.exit(1);
}

// Проверяем наличие манифеста
if (!fs.existsSync('public/manifest.json')) {
  console.log('❌ Ошибка: Манифест не найден');
  console.log('💡 Убедитесь, что public/manifest.json существует');
  process.exit(1);
}

// Проверяем наличие иконок
const requiredIcons = [72, 96, 128, 144, 152, 192, 384, 512];
const missingIcons = requiredIcons.filter(size => 
  !fs.existsSync(`public/icons/icon-${size}x${size}.png`)
);

if (missingIcons.length > 0) {
  console.log('❌ Ошибка: Отсутствуют иконки:', missingIcons);
  console.log('💡 Запустите: node create-simple-icons.js');
  process.exit(1);
}

console.log('✅ Все файлы готовы!');
console.log('');

// Создаем инструкции для PWA Builder
const instructions = `
📱 ИНСТРУКЦИИ ДЛЯ СОЗДАНИЯ .IPA ФАЙЛА:

1. 🌐 ОТКРОЙТЕ PWA BUILDER:
   https://www.pwabuilder.com/

2. 📝 ВВЕДИТЕ URL ВАШЕГО PWA:
   http://localhost:3001
   (или URL вашего деплоя)

3. 🎯 ВЫБЕРИТЕ ПЛАТФОРМУ:
   - Нажмите "iOS"
   - Нажмите "Generate Package"

4. 📥 СКАЧАЙТЕ .IPA ФАЙЛ:
   - Файл будет называться "StayPlay.ipa"
   - Сохраните его на компьютер

5. 📱 УСТАНОВИТЕ ЧЕРЕЗ ALTSTORE:
   - Откройте AltStore на iPhone
   - Нажмите "+" в "My Apps"
   - Выберите скачанный .ipa файл
   - Установите приложение

🎉 ГОТОВО! StayPlay установлен на iPhone!
`;

console.log(instructions);

// Создаем файл с URL для быстрого доступа
const urlFile = 'pwa-url.txt';
fs.writeFileSync(urlFile, 'http://localhost:3001');
console.log(`📄 URL сохранен в файл: ${urlFile}`);
console.log('💡 Скопируйте URL из файла и вставьте в PWA Builder');

// Создаем краткую инструкцию
const quickGuide = `
БЫСТРАЯ ИНСТРУКЦИЯ:

1. Откройте: https://www.pwabuilder.com/
2. Вставьте URL: http://localhost:3001
3. Выберите iOS → Generate Package
4. Скачайте .ipa файл
5. Установите через AltStore

Готово! 🎉
`;

fs.writeFileSync('QUICK-GUIDE.txt', quickGuide);
console.log('📋 Краткая инструкция сохранена в: QUICK-GUIDE.txt');


