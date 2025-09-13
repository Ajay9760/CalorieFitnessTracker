import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { addMeal } from '../store/slices/mealSlice';
import { INDIAN_FOOD_DATABASE } from '../data/indianFoodDatabase';
import { FoodItem, MealEntry, MealType } from '../types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const SearchSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    border-color: #667eea;
    outline: none;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
`;

const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const FoodCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #667eea;
`;

const FoodName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const FoodNameHindi = styled.p`
  color: #666;
  font-style: italic;
  margin: 0 0 1rem 0;
`;

const MacroInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: 0.9rem;
`;

const MacroItem = styled.div`
  text-align: center;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
`;

const CaloriesBadge = styled.span`
  background: #667eea;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  margin-top: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const MealTypeSection = styled.div`
  margin-bottom: 1rem;
`;

const MealTypeButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const MealTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid #667eea;
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#667eea'};
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
`;

const FoodLog: React.FC = () => {
  const dispatch = useDispatch();
  const { todaysMeals } = useSelector((state: RootState) => state.meals);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMealType, setSelectedMealType] = useState<MealType>('breakfast');

  const filteredFoods = useMemo(() => {
    return INDIAN_FOOD_DATABASE.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (food.nameHindi && food.nameHindi.includes(searchQuery));
      
      const matchesRegion = selectedRegion === 'all' || food.region.includes(selectedRegion as any);
      const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
      
      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [searchQuery, selectedRegion, selectedCategory]);

  const handleAddMeal = (food: FoodItem) => {
    const meal: MealEntry = {
      id: Date.now().toString(),
      userId: 'demo-user',
      foodId: food.id,
      foodName: food.name,
      quantity: 100, // Default 100g serving
      servingSize: food.servingSizes[0]?.unit || 'grams',
      mealType: selectedMealType,
      calories: food.calories,
      macros: food.macros,
      timestamp: new Date(),
    };
    
    dispatch(addMeal(meal));
    alert(`Added ${food.name} to your ${selectedMealType}!`);
  };

  return (
    <Container>
      <Header>🍛 Indian Food Logger</Header>
      
      <SearchSection>
        <MealTypeSection>
          <h4>Select Meal Type:</h4>
          <MealTypeButtons>
            {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map(mealType => (
              <MealTypeButton
                key={mealType}
                $active={selectedMealType === mealType}
                onClick={() => setSelectedMealType(mealType)}
              >
                {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </MealTypeButton>
            ))}
          </MealTypeButtons>
        </MealTypeSection>

        <SearchInput
          type="text"
          placeholder="Search for Indian foods... (e.g., dal, roti, biryani)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <FilterSection>
          <Select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="all">All Regions</option>
            <option value="north_indian">North Indian</option>
            <option value="south_indian">South Indian</option>
            <option value="east_indian">East Indian</option>
            <option value="west_indian">West Indian</option>
          </Select>
          
          <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="grains">Grains & Cereals</option>
            <option value="legumes">Dal & Legumes</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="dairy">Dairy Products</option>
            <option value="meat_fish">Meat & Fish</option>
            <option value="nuts_seeds">Nuts & Seeds</option>
            <option value="oils_fats">Oils & Ghee</option>
            <option value="snacks">Snacks</option>
            <option value="sweets">Sweets & Sweeteners</option>
            <option value="beverages">Beverages</option>
            <option value="spices">Spices & Herbs</option>
          </Select>
        </FilterSection>
      </SearchSection>

      <FoodGrid>
        {filteredFoods.slice(0, 20).map((food) => (
          <FoodCard key={food.id}>
            <FoodName>{food.name}</FoodName>
            {food.nameHindi && <FoodNameHindi>{food.nameHindi}</FoodNameHindi>}
            
            <div style={{ marginBottom: '1rem' }}>
              <CaloriesBadge>{food.calories} cal/100g</CaloriesBadge>
            </div>
            
            <MacroInfo>
              <MacroItem>
                <strong>{food.macros.protein}g</strong><br/>
                Protein
              </MacroItem>
              <MacroItem>
                <strong>{food.macros.carbs}g</strong><br/>
                Carbs
              </MacroItem>
              <MacroItem>
                <strong>{food.macros.fats}g</strong><br/>
                Fats
              </MacroItem>
            </MacroInfo>
            
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
              Serving: {food.servingSizes[0]?.description || '100g'}
            </div>
            
            <AddButton onClick={() => handleAddMeal(food)}>
              Add to {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)}
            </AddButton>
          </FoodCard>
        ))}
      </FoodGrid>

      {todaysMeals.length > 0 && (
        <SearchSection style={{ marginTop: '2rem' }}>
          <h3>Today's Meals ({todaysMeals.length} items)</h3>
          {todaysMeals.map(meal => (
            <div key={meal.id} style={{ padding: '0.5rem', borderLeft: '3px solid #667eea', margin: '0.5rem 0', background: '#f8f9fa' }}>
              <strong>{meal.foodName}</strong> - {meal.mealType} - {meal.calories} cal
            </div>
          ))}
        </SearchSection>
      )}
    </Container>
  );
};

export default FoodLog;