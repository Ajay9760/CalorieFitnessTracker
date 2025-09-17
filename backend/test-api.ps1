# API Testing Script for Calorie Fitness Tracker Backend
# Run this script to test all endpoints

$baseUrl = "http://localhost:3001"
$global:accessToken = $null
$global:userId = $null

# Helper function to make HTTP requests
function Invoke-ApiRequest {
    param(
        [string]$Method = "GET",
        [string]$Uri,
        [hashtable]$Body = $null,
        [string]$Token = $null
    )
    
    $headers = @{
        "Content-Type" = "application/json"
    }
    
    if ($Token) {
        $headers["Authorization"] = "Bearer $Token"
    }
    
    try {
        $requestParams = @{
            Method = $Method
            Uri = $Uri
            Headers = $headers
        }
        
        if ($Body) {
            $requestParams.Body = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-RestMethod @requestParams
        return $response
    }
    catch {
        Write-Host "❌ Request failed: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "Response: $responseBody" -ForegroundColor Yellow
        }
        return $null
    }
}

# Test results tracking
$testResults = @{
    Passed = 0
    Failed = 0
    Total = 0
}

function Test-Endpoint {
    param(
        [string]$TestName,
        [scriptblock]$TestAction
    )
    
    $testResults.Total++
    Write-Host "`n🧪 Testing: $TestName" -ForegroundColor Cyan
    
    try {
        $result = & $TestAction
        if ($result) {
            Write-Host "✅ PASS: $TestName" -ForegroundColor Green
            $testResults.Passed++
        } else {
            Write-Host "❌ FAIL: $TestName" -ForegroundColor Red
            $testResults.Failed++
        }
    }
    catch {
        Write-Host "❌ ERROR: $TestName - $($_.Exception.Message)" -ForegroundColor Red
        $testResults.Failed++
    }
}

Write-Host "🚀 Starting API Testing for Calorie Fitness Tracker" -ForegroundColor Yellow
Write-Host "Base URL: $baseUrl" -ForegroundColor Yellow
Write-Host "=" * 60 -ForegroundColor Yellow

# Test 1: Health Check
Test-Endpoint "Health Check" {
    $response = Invoke-ApiRequest -Uri "$baseUrl/health"
    if ($response -and $response.status -eq "OK") {
        Write-Host "   Status: $($response.status)" -ForegroundColor Green
        return $true
    }
    return $false
}

# Test 2: User Registration
Test-Endpoint "User Registration" {
    $testUser = @{
        email = "test@example.com"
        password = "testpass123"
        username = "testuser"
        name = "Test User"
    }
    
    $response = Invoke-ApiRequest -Method "POST" -Uri "$baseUrl/api/auth/register" -Body $testUser
    if ($response -and $response.success) {
        $global:accessToken = $response.data.accessToken
        $global:userId = $response.data.user.id
        Write-Host "   User ID: $($response.data.user.id)" -ForegroundColor Green
        Write-Host "   Token: $($global:accessToken.Substring(0,20))..." -ForegroundColor Green
        return $true
    }
    return $false
}

# Test 3: User Login (try with existing user or create new)
Test-Endpoint "User Login" {
    $loginData = @{
        email = "test@example.com"
        password = "testpass123"
    }
    
    $response = Invoke-ApiRequest -Method "POST" -Uri "$baseUrl/api/auth/login" -Body $loginData
    if ($response -and $response.success) {
        $global:accessToken = $response.data.accessToken
        Write-Host "   Login successful for: $($response.data.user.name)" -ForegroundColor Green
        return $true
    }
    return $false
}

# Test 4: Get User Profile
Test-Endpoint "Get User Profile" {
    $response = Invoke-ApiRequest -Uri "$baseUrl/api/user/profile" -Token $global:accessToken
    if ($response -and $response.success) {
        Write-Host "   Username: @$($response.data.user.username)" -ForegroundColor Green
        Write-Host "   Name: $($response.data.user.name)" -ForegroundColor Green
        Write-Host "   Email: $($response.data.user.email)" -ForegroundColor Green
        return $true
    }
    return $false
}

# Test 5: Update User Profile
Test-Endpoint "Update User Profile" {
    $profileUpdate = @{
        age = 25
        weight = 70
        height = 175
        fitnessGoal = "lose_weight"
        dailyCalorieGoal = 1800
    }
    
    $response = Invoke-ApiRequest -Method "PUT" -Uri "$baseUrl/api/user/profile" -Body $profileUpdate -Token $global:accessToken
    if ($response -and $response.success) {
        Write-Host "   Updated profile - Age: $($response.data.user.age), Weight: $($response.data.user.weight)kg" -ForegroundColor Green
        return $true
    }
    return $false
}

# Test 6: Get Food Categories
Test-Endpoint "Get Food Categories" {
    $response = Invoke-ApiRequest -Uri "$baseUrl/api/foods/categories"
    if ($response -and $response.success -and $response.data.categories) {
        Write-Host "   Found $($response.data.categories.Length) categories" -ForegroundColor Green
        Write-Host "   Categories: $($response.data.categories[0..2] | ForEach-Object { $_.name } | Join-String ', ')..." -ForegroundColor Green
        return $true
    }
    return $false
}

# Test 7: Search Foods
Test-Endpoint "Search Foods" {
    $response = Invoke-ApiRequest -Uri "$baseUrl/api/foods/search?q=rice&limit=5"
    if ($response -and $response.success -and $response.data.foods) {
        Write-Host "   Found $($response.data.foods.Length) foods matching 'rice'" -ForegroundColor Green
        if ($response.data.foods.Length -gt 0) {
            Write-Host "   First result: $($response.data.foods[0].name)" -ForegroundColor Green
        }
        return $true
    }
    return $false
}

# Test 8: Get Popular Foods
Test-Endpoint "Get Popular Foods" {
    $response = Invoke-ApiRequest -Uri "$baseUrl/api/foods/popular?limit=5"
    if ($response -and $response.success -and $response.data.foods) {
        Write-Host "   Found $($response.data.foods.Length) popular foods" -ForegroundColor Green
        $global:testFoodId = $response.data.foods[0].id
        Write-Host "   Sample food: $($response.data.foods[0].name) ($($response.data.foods[0].calories) cal/100g)" -ForegroundColor Green
        return $true
    }
    return $false
}

# Test 9: Get Specific Food Item
Test-Endpoint "Get Specific Food Item" {
    if ($global:testFoodId) {
        $response = Invoke-ApiRequest -Uri "$baseUrl/api/foods/$($global:testFoodId)"
        if ($response -and $response.success) {
            $food = $response.data.food
            Write-Host "   Food: $($food.name)" -ForegroundColor Green
            Write-Host "   Nutrition: $($food.calories)cal, $($food.protein)g protein, $($food.carbs)g carbs, $($food.fats)g fat" -ForegroundColor Green
            return $true
        }
    }
    return $false
}

# Test 10: Log a Meal
Test-Endpoint "Log a Meal" {
    if ($global:testFoodId) {
        $mealData = @{
            foodId = $global:testFoodId
            quantity = 150
            servingSize = "grams"
            mealType = "lunch"
            notes = "Test meal entry"
        }
        
        $response = Invoke-ApiRequest -Method "POST" -Uri "$baseUrl/api/meals" -Body $mealData -Token $global:accessToken
        if ($response -and $response.success) {
            $global:testMealId = $response.data.meal.id
            Write-Host "   Meal logged: $($response.data.meal.foodName)" -ForegroundColor Green
            Write-Host "   Calories: $($response.data.meal.calories), Protein: $($response.data.meal.protein)g" -ForegroundColor Green
            return $true
        }
    }
    return $false
}

# Test 11: Get User's Meals
Test-Endpoint "Get User's Meals" {
    $response = Invoke-ApiRequest -Uri "$baseUrl/api/meals?limit=10" -Token $global:accessToken
    if ($response -and $response.success) {
        Write-Host "   Found $($response.data.meals.Length) meal entries" -ForegroundColor Green
        if ($response.data.meals.Length -gt 0) {
            $meal = $response.data.meals[0]
            Write-Host "   Recent meal: $($meal.foodName) - $($meal.calories) calories" -ForegroundColor Green
        }
        return $true
    }
    return $false
}

# Test 12: Get Daily Summary
Test-Endpoint "Get Daily Summary" {
    $today = Get-Date -Format "yyyy-MM-dd"
    $response = Invoke-ApiRequest -Uri "$baseUrl/api/meals/daily-summary?date=$today" -Token $global:accessToken
    if ($response -and $response.success) {
        $summary = $response.data
        Write-Host "   Total meals: $($summary.totalMeals)" -ForegroundColor Green
        Write-Host "   Total calories: $($summary.totals.calories)" -ForegroundColor Green
        Write-Host "   Progress: $($summary.progress.calories)% of calorie goal" -ForegroundColor Green
        return $true
    }
    return $false
}

# Test 13: Delete Meal Entry
Test-Endpoint "Delete Meal Entry" {
    if ($global:testMealId) {
        $response = Invoke-ApiRequest -Method "DELETE" -Uri "$baseUrl/api/meals/$($global:testMealId)" -Token $global:accessToken
        if ($response -and $response.success) {
            Write-Host "   Meal entry deleted successfully" -ForegroundColor Green
            return $true
        }
    }
    return $false
}

# Test 14: User Logout
Test-Endpoint "User Logout" {
    $response = Invoke-ApiRequest -Method "POST" -Uri "$baseUrl/api/auth/logout" -Token $global:accessToken
    if ($response -and $response.success) {
        Write-Host "   User logged out successfully" -ForegroundColor Green
        return $true
    }
    return $false
}

# Test Summary
Write-Host "`n" + "=" * 60 -ForegroundColor Yellow
Write-Host "🏁 TEST RESULTS SUMMARY" -ForegroundColor Yellow
Write-Host "=" * 60 -ForegroundColor Yellow
Write-Host "Total Tests: $($testResults.Total)" -ForegroundColor White
Write-Host "Passed: $($testResults.Passed)" -ForegroundColor Green
Write-Host "Failed: $($testResults.Failed)" -ForegroundColor Red

$successRate = [math]::Round(($testResults.Passed / $testResults.Total) * 100, 2)
Write-Host "Success Rate: $successRate%" -ForegroundColor $(if ($successRate -ge 80) { "Green" } else { "Red" })

if ($testResults.Failed -eq 0) {
    Write-Host "`n🎉 ALL TESTS PASSED! Your backend is working perfectly!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Some tests failed. Please check the errors above." -ForegroundColor Yellow
}

Write-Host "`n📊 Database contains:" -ForegroundColor Cyan
Write-Host "   - User accounts with authentication" -ForegroundColor White
Write-Host "   - 12+ Indian food items with nutrition data" -ForegroundColor White
Write-Host "   - Meal logging and tracking system" -ForegroundColor White
Write-Host "   - Daily nutrition summaries and progress tracking" -ForegroundColor White