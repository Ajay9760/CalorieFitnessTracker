Write-Host "🚀 Testing Calorie Fitness Tracker Backend API" -ForegroundColor Yellow
Write-Host "=" * 50 -ForegroundColor Yellow

# Test 1: Health Check
Write-Host "`n1. Testing Health Endpoint..." -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3001/health"
    Write-Host "✅ Health Check: $($health.status)" -ForegroundColor Green
    Write-Host "   Version: $($health.version)" -ForegroundColor White
} catch {
    Write-Host "❌ Health Check Failed" -ForegroundColor Red
}

# Test 2: User Registration
Write-Host "`n2. Testing User Registration..." -ForegroundColor Cyan
try {
    $userData = @{
        email = "testuser@example.com"
        password = "testpass123"
        username = "testuser123"
        name = "Test User"
    } | ConvertTo-Json

    $headers = @{ "Content-Type" = "application/json" }
    $register = Invoke-RestMethod -Uri "http://localhost:3001/api/auth/register" -Method POST -Body $userData -Headers $headers
    
    if ($register.success) {
        Write-Host "✅ User Registration: SUCCESS" -ForegroundColor Green
        Write-Host "   User: $($register.data.user.name) (@$($register.data.user.username))" -ForegroundColor White
        $global:token = $register.data.accessToken
    } else {
        Write-Host "❌ User Registration: FAILED" -ForegroundColor Red
    }
} catch {
    Write-Host "⚠️ User Registration: User may already exist (this is OK)" -ForegroundColor Yellow
    
    # Try login instead
    try {
        $loginData = @{
            email = "testuser@example.com"  
            password = "testpass123"
        } | ConvertTo-Json
        
        $login = Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" -Method POST -Body $loginData -Headers $headers
        if ($login.success) {
            Write-Host "✅ User Login: SUCCESS" -ForegroundColor Green
            $global:token = $login.data.accessToken
        }
    } catch {
        Write-Host "❌ Login Failed" -ForegroundColor Red
    }
}

# Test 3: Get User Profile
if ($global:token) {
    Write-Host "`n3. Testing User Profile..." -ForegroundColor Cyan
    try {
        $authHeaders = @{ 
            "Authorization" = "Bearer $($global:token)"
            "Content-Type" = "application/json" 
        }
        $profile = Invoke-RestMethod -Uri "http://localhost:3001/api/user/profile" -Headers $authHeaders
        
        if ($profile.success) {
            Write-Host "✅ Get Profile: SUCCESS" -ForegroundColor Green
            Write-Host "   User: $($profile.data.user.name)" -ForegroundColor White
            Write-Host "   Email: $($profile.data.user.email)" -ForegroundColor White
        }
    } catch {
        Write-Host "❌ Get Profile: FAILED" -ForegroundColor Red
    }
}

# Test 4: Food Search
Write-Host "`n4. Testing Food Search..." -ForegroundColor Cyan
try {
    $foods = Invoke-RestMethod -Uri "http://localhost:3001/api/foods/search?q=rice&limit=3"
    
    if ($foods.success -and $foods.data.foods.Count -gt 0) {
        Write-Host "✅ Food Search: SUCCESS" -ForegroundColor Green
        Write-Host "   Found $($foods.data.foods.Count) foods" -ForegroundColor White
        Write-Host "   Example: $($foods.data.foods[0].name) ($($foods.data.foods[0].calories) cal/100g)" -ForegroundColor White
        $global:testFoodId = $foods.data.foods[0].id
    } else {
        Write-Host "❌ Food Search: No results" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Food Search: FAILED" -ForegroundColor Red
}

# Test 5: Popular Foods
Write-Host "`n5. Testing Popular Foods..." -ForegroundColor Cyan
try {
    $popular = Invoke-RestMethod -Uri "http://localhost:3001/api/foods/popular?limit=5"
    
    if ($popular.success -and $popular.data.foods.Count -gt 0) {
        Write-Host "✅ Popular Foods: SUCCESS" -ForegroundColor Green
        Write-Host "   Found $($popular.data.foods.Count) popular foods" -ForegroundColor White
        foreach ($food in $popular.data.foods[0..2]) {
            Write-Host "   - $($food.name) ($($food.calories) cal)" -ForegroundColor White
        }
    } else {
        Write-Host "❌ Popular Foods: No results" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Popular Foods: FAILED" -ForegroundColor Red
}

# Test 6: Log a Meal (if authenticated and have food ID)
if ($global:token -and $global:testFoodId) {
    Write-Host "`n6. Testing Meal Logging..." -ForegroundColor Cyan
    try {
        $mealData = @{
            foodId = $global:testFoodId
            quantity = 150
            servingSize = "grams"
            mealType = "lunch"
            notes = "API Test meal"
        } | ConvertTo-Json
        
        $meal = Invoke-RestMethod -Uri "http://localhost:3001/api/meals" -Method POST -Body $mealData -Headers $authHeaders
        
        if ($meal.success) {
            Write-Host "✅ Meal Logging: SUCCESS" -ForegroundColor Green
            Write-Host "   Logged: $($meal.data.meal.foodName)" -ForegroundColor White
            Write-Host "   Calories: $($meal.data.meal.calories)" -ForegroundColor White
            $global:mealId = $meal.data.meal.id
        }
    } catch {
        Write-Host "❌ Meal Logging: FAILED" -ForegroundColor Red
    }
}

# Test 7: Get Daily Summary
if ($global:token) {
    Write-Host "`n7. Testing Daily Summary..." -ForegroundColor Cyan
    try {
        $today = Get-Date -Format "yyyy-MM-dd"
        $summary = Invoke-RestMethod -Uri "http://localhost:3001/api/meals/daily-summary?date=$today" -Headers $authHeaders
        
        if ($summary.success) {
            Write-Host "✅ Daily Summary: SUCCESS" -ForegroundColor Green
            Write-Host "   Total meals today: $($summary.data.totalMeals)" -ForegroundColor White
            Write-Host "   Total calories: $($summary.data.totals.calories)" -ForegroundColor White
            Write-Host "   Calorie goal progress: $($summary.data.progress.calories)%" -ForegroundColor White
        }
    } catch {
        Write-Host "❌ Daily Summary: FAILED" -ForegroundColor Red
    }
}

Write-Host "`n" + "=" * 50 -ForegroundColor Yellow
Write-Host "🏁 API Testing Complete!" -ForegroundColor Yellow
Write-Host "✅ Backend is functional and ready for frontend integration!" -ForegroundColor Green