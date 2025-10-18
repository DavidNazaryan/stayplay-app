# 🚀 Быстрый деплой StayPlay на GitHub Pages

## 📋 Что нужно сделать:

### 1. Создать GitHub репозиторий
1. Откройте: https://github.com/new
2. Repository name: `stayplay-app`
3. Выберите **Public**
4. Нажмите **Create repository**

### 2. Подключить локальный репозиторий
```bash
# Замените YOUR_USERNAME на ваш GitHub username
git remote add origin https://github.com/YOUR_USERNAME/stayplay-app.git
git branch -M main
git push -u origin main
```

### 3. Настроить GitHub Pages
1. Перейдите в **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Сохраните настройки

### 4. Автоматический деплой
```bash
# Windows PowerShell
.\deploy-to-github.ps1

# Или вручную
npm run build
git add .
git commit -m "Deploy StayPlay"
git push origin main
```

## 🎯 Результат

После настройки ваш сайт будет доступен по адресу:
```
https://YOUR_USERNAME.github.io/stayplay-app
```

## 📱 Создание .ipa файла

1. **Откройте PWA Builder**: https://www.pwabuilder.com/
2. **Введите URL**: `https://YOUR_USERNAME.github.io/stayplay-app`
3. **Выберите iOS** → Generate Package
4. **Скачайте .ipa файл**
5. **Установите через AltStore**

## 🔧 Готовые файлы

- ✅ GitHub Actions workflow: `.github/workflows/deploy.yml`
- ✅ PowerShell скрипт: `deploy-to-github.ps1`
- ✅ Bash скрипт: `deploy-to-github.sh`
- ✅ Подробная инструкция: `GITHUB-PAGES-SETUP.md`

## 🎉 Готово!

Теперь у вас есть автоматический деплой на GitHub Pages и публичный URL для PWA Builder!
