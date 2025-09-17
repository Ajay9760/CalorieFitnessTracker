const { sequelize, FoodItem } = require('../models');
const indianFoods = require('../data/seedFoods');

async function seedFoodDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // Sync models (ensure tables exist)
    await sequelize.sync({ force: false });
    console.log('📊 Database synchronized');
    
    // Check if food items already exist
    const existingFoodCount = await FoodItem.count();
    if (existingFoodCount > 0) {
      console.log(`📦 Found ${existingFoodCount} existing food items`);
      console.log('🔄 Skipping seed - database already contains food data');
      console.log('💡 To re-seed, delete the database file and run again');
      return;
    }
    
    console.log('🍽️ Adding food items to database...');
    
    // Add food items
    let addedCount = 0;
    for (const foodData of indianFoods) {
      try {
        await FoodItem.create({
          ...foodData,
          isVerified: true
        });
        addedCount++;
        console.log(`✓ Added: ${foodData.name}`);
      } catch (error) {
        console.error(`✗ Failed to add ${foodData.name}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Seeding completed!`);
    console.log(`📦 Successfully added ${addedCount}/${indianFoods.length} food items`);
    
    // Verify the data
    const totalCount = await FoodItem.count();
    const commonDishes = await FoodItem.count({ where: { isCommonDish: true } });
    
    console.log(`\n📊 Database Statistics:`);
    console.log(`   Total food items: ${totalCount}`);
    console.log(`   Common dishes: ${commonDishes}`);
    console.log(`   Regular items: ${totalCount - commonDishes}`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await sequelize.close();
    console.log('📊 Database connection closed');
    process.exit(0);
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedFoodDatabase();
}

module.exports = { seedFoodDatabase };