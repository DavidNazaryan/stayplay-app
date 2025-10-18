# Ручной деплой на GitHub Pages
Write-Host "🚀 Ручной деплой StayPlay на GitHub Pages" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

# Собираем проект
Write-Host "📦 Сборка проекта..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка при сборке проекта" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Проект собран успешно!" -ForegroundColor Green
Write-Host ""

# Создаем ветку gh-pages
Write-Host "🌿 Создание ветки gh-pages..." -ForegroundColor Cyan
git checkout -b gh-pages

# Удаляем все файлы кроме dist
Write-Host "🗑️ Очистка ветки gh-pages..." -ForegroundColor Cyan
git rm -rf .
git clean -fd

# Копируем содержимое dist в корень
Write-Host "📁 Копирование файлов из dist..." -ForegroundColor Cyan
Copy-Item -Path "dist\*" -Destination "." -Recurse -Force

# Добавляем все файлы
Write-Host "📝 Добавление файлов в git..." -ForegroundColor Cyan
git add .

# Коммитим
Write-Host "💾 Создание коммита..." -ForegroundColor Cyan
git commit -m "Deploy StayPlay to GitHub Pages"

# Пушим ветку gh-pages
Write-Host "🚀 Загрузка на GitHub..." -ForegroundColor Cyan
git push origin gh-pages

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 Успешно задеплоено на GitHub Pages!" -ForegroundColor Green
    Write-Host "🌐 Ваш сайт будет доступен через 2-3 минуты по адресу:" -ForegroundColor Cyan
    Write-Host "   https://davidnazaryan.github.io/stayplay-app" -ForegroundColor White
    Write-Host ""
    Write-Host "📱 Для создания .ipa файла:" -ForegroundColor Magenta
    Write-Host "   1. Откройте: https://www.pwabuilder.com/" -ForegroundColor White
    Write-Host "   2. Введите URL: https://davidnazaryan.github.io/stayplay-app" -ForegroundColor White
    Write-Host "   3. Выберите iOS → Generate Package" -ForegroundColor White
    Write-Host "   4. Скачайте .ipa файл" -ForegroundColor White
} else {
    Write-Host "❌ Ошибка при загрузке на GitHub" -ForegroundColor Red
}

# Возвращаемся на main ветку
Write-Host "🔄 Возврат на main ветку..." -ForegroundColor Cyan
git checkout main
