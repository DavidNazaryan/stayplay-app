# 📱 Создание .ipa файла для AltStore

## 🚀 Пошаговая инструкция

### Шаг 1: Подготовка PWA
✅ **Готово!** Ваше приложение уже собрано и готово:
- 📁 Папка `dist/` содержит собранное приложение
- 🎨 Иконки созданы в `public/icons/`
- 📱 Манифест настроен в `public/manifest.json`
- 🔧 Service Worker готов в `public/sw.js`

### Шаг 2: Деплой на хостинг (выберите один вариант)

#### Вариант A: Vercel (Рекомендуется)
```bash
npm install -g vercel
vercel --prod
```

#### Вариант B: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Вариант C: GitHub Pages
1. Создайте репозиторий на GitHub
2. Загрузите папку `dist/` в репозиторий
3. Включите GitHub Pages в настройках

#### Вариант D: Локальный сервер (для тестирования)
```bash
npx serve dist -p 3001
# Откройте http://localhost:3001
```

### Шаг 3: Создание .ipa через PWA Builder

1. **Откройте PWA Builder**: https://www.pwabuilder.com/
2. **Введите URL вашего PWA** (например: `https://your-app.vercel.app`)
3. **Нажмите "Start"**
4. **Выберите "iOS"** в списке платформ
5. **Нажмите "Generate Package"**
6. **Скачайте .ipa файл**

### Шаг 4: Альтернативные способы

#### A) Использование Bubblewrap (Google)
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=https://your-app.vercel.app/manifest.json
bubblewrap build
```

#### B) Использование Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init StayPlay com.stayplay.app
npx cap add ios
npx cap copy ios
npx cap sync ios
npx cap open ios
```

### Шаг 5: Установка через AltStore

1. **Установите AltStore** на iPhone:
   - Скачайте AltServer с https://altstore.io/
   - Установите AltStore через AltServer

2. **Установите StayPlay**:
   - Откройте AltStore на iPhone
   - Нажмите "+" в разделе "My Apps"
   - Выберите скачанный .ipa файл
   - Установите приложение

## 🎯 Готовые файлы

Ваше приложение готово для создания .ipa файла:

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

Если нужно добавить iOS-специфичные функции:

```json
// В manifest.json добавьте:
{
  "ios": {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "StayPlay"
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


