# 📱 StayPlay для AltStore

## 🚀 Быстрый старт

### 1. Автоматическая сборка
```bash
npm run build:altstore
```

### 2. Ручная сборка
```bash
npm run build
npm run create:icons
npm run create:ipa
```

## 📋 Пошаговая инструкция

### Шаг 1: Подготовка
```bash
# Установка зависимостей
npm install

# Сборка проекта
npm run build

# Создание иконок
npm run create:icons
```

### Шаг 2: Запуск локального сервера
```bash
npx serve dist -p 3001
```

### Шаг 3: Создание .ipa файла

#### Вариант A: PWA Builder (Рекомендуется)
1. Откройте: https://www.pwabuilder.com/
2. Введите URL: `http://localhost:3001`
3. Выберите iOS → Generate Package
4. Скачайте .ipa файл

#### Вариант B: Bubblewrap
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=http://localhost:3001/manifest.json
bubblewrap build
```

#### Вариант C: Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init StayPlay com.stayplay.app
npx cap add ios
npx cap copy ios
npx cap sync ios
npx cap open ios
```

### Шаг 4: Установка через AltStore

1. **Установите AltStore**:
   - Скачайте AltServer: https://altstore.io/
   - Установите AltStore через AltServer

2. **Установите StayPlay**:
   - Откройте AltStore на iPhone
   - Нажмите "+" в "My Apps"
   - Выберите .ipa файл
   - Установите приложение

## 🎯 Готовые файлы

- ✅ **PWA манифест**: `public/manifest.json`
- ✅ **Service Worker**: `public/sw.js`
- ✅ **Иконки**: `public/icons/` (все размеры)
- ✅ **Собранное приложение**: `dist/`
- ✅ **Локальный сервер**: http://localhost:3001

## 📱 Особенности для iOS

- **Ориентация**: Только портретная
- **Отображение**: Standalone (как нативное приложение)
- **Иконки**: Поддержка всех размеров iOS
- **Тема**: Темная тема для iOS
- **Safe Area**: Поддержка вырезов iPhone

## 🔧 Дополнительные настройки

### HealthKit интеграция
```json
{
  "ios": {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "StayPlay"
  }
}
```

### Фоновые задачи
```json
{
  "background": {
    "scripts": ["sw.js"],
    "persistent": true
  }
}
```

## 🚨 Важные замечания

1. **Подпись приложения**: AltStore подписывает приложения вашим Apple ID
2. **Срок действия**: Приложения действуют 7 дней, затем нужно переподписать
3. **Ограничения**: Максимум 10 приложений на Apple ID
4. **Обновления**: Для обновления нужно пересоздать .ipa файл

## 🎉 Готово!

Теперь у вас есть все необходимое для создания .ipa файла и установки StayPlay через AltStore!

### 📞 Поддержка

Если возникли проблемы:
1. Проверьте, что все файлы созданы
2. Убедитесь, что сервер запущен на порту 3001
3. Проверьте, что PWA Builder может получить доступ к вашему URL
4. Убедитесь, что AltStore установлен и работает

**Удачи с установкой! 🚀**


