# React Native Development Helper Script
Write-Host "🚀 Starting React Native Development Environment..." -ForegroundColor Green

# Check if emulator is running
Write-Host "📱 Checking emulator status..." -ForegroundColor Yellow
$devices = adb devices
Write-Host $devices

# Start Metro bundler if not running
Write-Host "📦 Starting Metro bundler..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npx react-native start"

# Wait a moment for Metro to start
Start-Sleep -Seconds 3

# Start the Android app
Write-Host "🤖 Starting Android app..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npx react-native run-android"

Write-Host "✅ Development environment started!" -ForegroundColor Green
Write-Host "📝 You should now see:" -ForegroundColor Cyan
Write-Host "   1. Metro bundler running in one terminal" -ForegroundColor White
Write-Host "   2. Android build process in another terminal" -ForegroundColor White
Write-Host "   3. App loading on the emulator" -ForegroundColor White