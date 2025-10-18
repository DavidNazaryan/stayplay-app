import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 StayPlay - Автоматическая сборка для AltStore');
console.log('================================================');
console.log('');

try {
  // Шаг 1: Сборка проекта
  console.log('📦 Сборка проекта...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Проект собран успешно!');
  console.log('');

  // Шаг 2: Создание иконок
  console.log('🎨 Создание иконок...');
  execSync('node create-simple-icons.js', { stdio: 'inherit' });
  console.log('✅ Иконки созданы!');
  console.log('');

  // Шаг 3: Запуск локального сервера
  console.log('🌐 Запуск локального сервера...');
  console.log('📱 Ваше PWA доступно по адресу: http://localhost:3001');
  console.log('');

  // Шаг 4: Создание инструкций
  console.log('📋 Создание инструкций...');
  
  const instructions = `
🎉 ВАШЕ ПРИЛОЖЕНИЕ ГОТОВО ДЛЯ ALTSTORE!

📱 СЛЕДУЮЩИЕ ШАГИ:

1. 🌐 Откройте PWA Builder: https://www.pwabuilder.com/
2. 📝 Введите URL: http://localhost:3001
3. 🎯 Выберите iOS → Generate Package
4. 📥 Скачайте .ipa файл
5. 📱 Установите через AltStore

🔧 АЛЬТЕРНАТИВНЫЕ СПОСОБЫ:

A) Bubblewrap (Google):
   npm install -g @bubblewrap/cli
   bubblewrap init --manifest=http://localhost:3001/manifest.json
   bubblewrap build

B) Capacitor:
   npm install @capacitor/core @capacitor/cli @capacitor/ios
   npx cap init StayPlay com.stayplay.app
   npx cap add ios
   npx cap copy ios
   npx cap sync ios
   npx cap open ios

📁 ГОТОВЫЕ ФАЙЛЫ:
- ✅ Собранное приложение: dist/
- ✅ PWA манифест: public/manifest.json
- ✅ Service Worker: public/sw.js
- ✅ Иконки: public/icons/
- ✅ Локальный сервер: http://localhost:3001

🎯 РЕКОМЕНДУЕМЫЙ СПОСОБ: PWA Builder
   Самый простой и быстрый способ получить .ipa файл!

🚀 УДАЧИ С УСТАНОВКОЙ!
`;

  fs.writeFileSync('ALTSTORE-READY.txt', instructions);
  console.log('✅ Инструкции сохранены в: ALTSTORE-READY.txt');
  console.log('');

  // Шаг 5: Запуск сервера
  console.log('🚀 Запуск сервера для PWA Builder...');
  console.log('💡 Оставьте этот терминал открытым');
  console.log('🌐 Откройте http://localhost:3001 в браузере');
  console.log('📱 Затем перейдите на https://www.pwabuilder.com/');
  console.log('');

  // Запускаем сервер
  execSync('npx serve dist -p 3001', { stdio: 'inherit' });

} catch (error) {
  console.error('❌ Ошибка:', error.message);
  console.log('💡 Убедитесь, что все зависимости установлены: npm install');
  process.exit(1);
}


