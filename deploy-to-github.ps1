# StayPlay - Деплой на GitHub Pages
Write-Host "🚀 StayPlay - Деплой на GitHub Pages" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

# Проверяем, что мы в git репозитории
if (-not (Test-Path ".git")) {
    Write-Host "❌ Ошибка: Не найден git репозиторий" -ForegroundColor Red
    Write-Host "💡 Запустите: git init" -ForegroundColor Yellow
    exit 1
}

# Собираем проект
Write-Host "📦 Сборка проекта..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка при сборке проекта" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Проект собран успешно!" -ForegroundColor Green
Write-Host ""

# Добавляем все изменения
Write-Host "📝 Добавление изменений в git..." -ForegroundColor Cyan
git add .

# Коммитим изменения
Write-Host "💾 Создание коммита..." -ForegroundColor Cyan
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Deploy StayPlay to GitHub Pages - $timestamp"

# Пушим в main ветку
Write-Host "🚀 Загрузка на GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 Успешно загружено на GitHub!" -ForegroundColor Green
    Write-Host "⏳ GitHub Actions автоматически задеплоит приложение" -ForegroundColor Yellow
    Write-Host "🌐 Ваш сайт будет доступен через 2-3 минуты по адресу:" -ForegroundColor Cyan
    Write-Host "   https://YOUR_USERNAME.github.io/stayplay-app" -ForegroundColor White
    Write-Host ""
    Write-Host "📱 Для создания .ipa файла:" -ForegroundColor Magenta
    Write-Host "   1. Откройте: https://www.pwabuilder.com/" -ForegroundColor White
    Write-Host "   2. Введите URL вашего сайта" -ForegroundColor White
    Write-Host "   3. Выберите iOS → Generate Package" -ForegroundColor White
    Write-Host "   4. Скачайте .ipa файл" -ForegroundColor White
} else {
    Write-Host "❌ Ошибка при загрузке на GitHub" -ForegroundColor Red
    Write-Host "💡 Убедитесь, что remote origin настроен правильно" -ForegroundColor Yellow
    Write-Host "💡 Запустите: git remote add origin https://github.com/YOUR_USERNAME/stayplay-app.git" -ForegroundColor Yellow
}
