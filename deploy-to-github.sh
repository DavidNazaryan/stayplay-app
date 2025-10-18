#!/bin/bash

echo "🚀 StayPlay - Деплой на GitHub Pages"
echo "===================================="
echo ""

# Проверяем, что мы в git репозитории
if [ ! -d ".git" ]; then
    echo "❌ Ошибка: Не найден git репозиторий"
    echo "💡 Запустите: git init"
    exit 1
fi

# Собираем проект
echo "📦 Сборка проекта..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при сборке проекта"
    exit 1
fi

echo "✅ Проект собран успешно!"
echo ""

# Добавляем все изменения
echo "📝 Добавление изменений в git..."
git add .

# Коммитим изменения
echo "💾 Создание коммита..."
git commit -m "Deploy StayPlay to GitHub Pages - $(date)"

# Пушим в main ветку
echo "🚀 Загрузка на GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Успешно загружено на GitHub!"
    echo "⏳ GitHub Actions автоматически задеплоит приложение"
    echo "🌐 Ваш сайт будет доступен через 2-3 минуты по адресу:"
    echo "   https://YOUR_USERNAME.github.io/stayplay-app"
    echo ""
    echo "📱 Для создания .ipa файла:"
    echo "   1. Откройте: https://www.pwabuilder.com/"
    echo "   2. Введите URL вашего сайта"
    echo "   3. Выберите iOS → Generate Package"
    echo "   4. Скачайте .ipa файл"
else
    echo "❌ Ошибка при загрузке на GitHub"
    echo "💡 Убедитесь, что remote origin настроен правильно"
    echo "💡 Запустите: git remote add origin https://github.com/YOUR_USERNAME/stayplay-app.git"
fi
