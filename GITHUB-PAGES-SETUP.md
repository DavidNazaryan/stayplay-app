# 🚀 Настройка GitHub Pages для StayPlay

## 📋 Пошаговая инструкция

### Шаг 1: Создание GitHub репозитория

1. **Откройте GitHub**: https://github.com
2. **Нажмите "New repository"** (зеленая кнопка)
3. **Заполните форму**:
   - Repository name: `stayplay-app`
   - Description: `StayPlay - Social Fitness App PWA`
   - Выберите **Public**
   - НЕ добавляйте README, .gitignore, license (у нас уже есть)
4. **Нажмите "Create repository"**

### Шаг 2: Подключение локального репозитория

```bash
# Добавьте remote origin (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/stayplay-app.git

# Переименуйте ветку в main
git branch -M main

# Загрузите код на GitHub
git push -u origin main
```

### Шаг 3: Настройка GitHub Pages

1. **Перейдите в Settings** вашего репозитория
2. **Найдите раздел "Pages"** в левом меню
3. **В разделе "Source"** выберите:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
4. **Нажмите "Save"**

### Шаг 4: Создание GitHub Actions для автоматического деплоя

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Шаг 5: Получение URL приложения

После настройки GitHub Pages ваш сайт будет доступен по адресу:
```
https://YOUR_USERNAME.github.io/stayplay-app
```

## 🎯 Использование с PWA Builder

1. **Дождитесь деплоя** (2-3 минуты)
2. **Откройте PWA Builder**: https://www.pwabuilder.com/
3. **Введите URL**: `https://YOUR_USERNAME.github.io/stayplay-app`
4. **Выберите iOS** → Generate Package
5. **Скачайте .ipa файл**

## 🔧 Альтернативный способ (без GitHub Actions)

Если не хотите использовать GitHub Actions:

1. **Соберите проект локально**:
   ```bash
   npm run build
   ```

2. **Создайте ветку gh-pages**:
   ```bash
   git checkout -b gh-pages
   git rm -rf .
   cp -r dist/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

3. **В настройках Pages** выберите:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**

## 📱 Результат

После настройки у вас будет:
- ✅ Публичный URL для PWA Builder
- ✅ Автоматический деплой при изменениях
- ✅ Бесплатный хостинг на GitHub Pages
- ✅ HTTPS сертификат (обязательно для PWA)

## 🚨 Важные замечания

1. **HTTPS обязателен** для PWA функций
2. **Service Worker** работает только на HTTPS
3. **Манифест** должен быть доступен по HTTPS
4. **Иконки** должны загружаться по HTTPS

## 🎉 Готово!

Теперь у вас есть публичный URL для создания .ipa файла через PWA Builder!
