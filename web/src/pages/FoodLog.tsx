import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { addMeal } from '../store/slices/mealSlice';
import { INDIAN_FOOD_DATABASE } from '../data/indianFoodDatabase';
import { foodApi } from '../services/api';
import { FoodItem, MealEntry, MealType } from '../types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeaderCard = styled.div`
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(255, 255, 255, 0.95));
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  h2 {
    margin: 0;
    font-size: clamp(1.8rem, 4vw, 2.6rem);
  }

  p {
    color: #475569;
    font-size: 1.05rem;
  }
`;

const SearchSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.08);
  display: grid;
  gap: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
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
`;

const ScanSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const ScanButton = styled.button`
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: white;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
  }
`;

const ScanStatus = styled.div`
  font-size: 0.9rem;
  color: #475569;
`;

const ScanResults = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SuggestionChip = styled.button`
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: #f8fafc;
  cursor: pointer;
  font-weight: 600;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
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
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: 0 12px 25px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 35px rgba(15, 23, 42, 0.12);
  }
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
  background: #f8fafc;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Toast = styled.div<{ $visible: boolean }>`
  position: sticky;
  top: 1rem;
  background: #10b981;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 1rem;
  display: ${props => props.$visible ? 'block' : 'none'};
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

const ModalBackdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$open ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: min(540px, 92vw);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
  }
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
`;

const LoadMoreButton = styled.button`
  margin: 2rem auto 0;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(15, 23, 42, 0.08);
  }
`;

const FoodLog: React.FC = () => {
  const dispatch = useDispatch();
  const { todaysMeals } = useSelector((state: RootState) => state.meals);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMealType, setSelectedMealType] = useState<MealType>('breakfast');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedServing, setSelectedServing] = useState<string>('grams');
  const [toastMessage, setToastMessage] = useState('');
  const [apiFoods, setApiFoods] = useState<FoodItem[]>([]);
  const [apiOffset, setApiOffset] = useState(0);
  const [apiHasMore, setApiHasMore] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [scanSuggestions, setScanSuggestions] = useState<Array<{ name: string; confidence: number | null }>>([]);
  const [scanError, setScanError] = useState('');
  const [portionEstimate, setPortionEstimate] = useState('medium');

  const filteredFoods = useMemo(() => {
    return INDIAN_FOOD_DATABASE.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (food.nameHindi && food.nameHindi.includes(searchQuery));
      
      const matchesRegion = selectedRegion === 'all' || food.region.includes(selectedRegion as any);
      const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
      
      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [searchQuery, selectedRegion, selectedCategory]);

  const portionMultipliers: Record<string, number> = {
    small: 0.75,
    medium: 1,
    large: 1.5,
  };

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setApiFoods([]);
      setApiOffset(0);
      setApiHasMore(false);
      return;
    }

    let isMounted = true;
    const timeout = setTimeout(async () => {
      try {
        setApiLoading(true);
        const response = await foodApi.search(searchQuery.trim(), {
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          region: selectedRegion !== 'all' ? selectedRegion : undefined,
          limit: 20,
          offset: 0,
        });
        if (!isMounted) return;
        const { foods, pagination } = response.data.data;
        setApiFoods(foods);
        setApiOffset(pagination.offset + pagination.limit);
        setApiHasMore(pagination.hasMore);
      } catch (error) {
        setApiFoods([]);
        setApiHasMore(false);
      } finally {
        if (isMounted) setApiLoading(false);
      }
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [searchQuery, selectedCategory, selectedRegion]);

  const loadMoreFoods = async () => {
    try {
      setApiLoading(true);
      const response = await foodApi.search(searchQuery.trim(), {
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        region: selectedRegion !== 'all' ? selectedRegion : undefined,
        limit: 20,
        offset: apiOffset,
      });
      const { foods, pagination } = response.data.data;
      setApiFoods(prev => [...prev, ...foods]);
      setApiOffset(pagination.offset + pagination.limit);
      setApiHasMore(pagination.hasMore);
    } catch (error) {
      setApiHasMore(false);
    } finally {
      setApiLoading(false);
    }
  };

  const handleBarcodeFile = async (file: File) => {
    setScanError('');
    setScanStatus('Scanning barcode…');
    setScanSuggestions([]);

    if (!('BarcodeDetector' in window)) {
      setScanStatus('');
      setScanError('Barcode scanning is not supported in this browser.');
      return;
    }

    try {
      const detector = new (window as any).BarcodeDetector();
      const bitmap = await createImageBitmap(file);
      const barcodes = await detector.detect(bitmap);
      if (!barcodes.length) {
        setScanStatus('');
        setScanError('No barcode detected. Try another photo.');
        return;
      }
      const code = barcodes[0].rawValue;
      const response = await foodApi.getByBarcode(code);
      setScanStatus(`Found barcode: ${code}`);
      setSelectedFood(response.data.data.food);
      setQuantity(1);
      setSelectedServing(response.data.data.food.servingSizes[0]?.unit || 'grams');
    } catch (error) {
      setScanStatus('');
      setScanError('Barcode scan failed. Try again.');
    }
  };

  const handleFoodPhoto = async (file: File) => {
    setScanError('');
    setScanStatus('Analyzing photo…');
    setScanSuggestions([]);

    const reader = new FileReader();
    reader.onload = async () => {
      const imageData = reader.result as string;
      try {
        const response = await foodApi.scan(imageData);
        setScanSuggestions(response.data.data.suggestions);
        setScanStatus(response.data.data.suggestions.length ? 'Pick the closest match:' : 'No matches found.');
      } catch (error) {
        setScanStatus('');
        setScanError('Photo scan failed. You can still search manually.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSuggestionSelect = async (name: string) => {
    setSearchQuery(name);
    setScanStatus(`Searching for "${name}"…`);
    try {
      const response = await foodApi.search(name, { limit: 5, offset: 0 });
      const { foods } = response.data.data;
      if (foods.length) {
        setSelectedFood(foods[0]);
        setQuantity(1);
        setSelectedServing(foods[0].servingSizes[0]?.unit || 'grams');
        setScanStatus(`Selected ${foods[0].name}`);
      } else {
        setScanStatus('No exact match found. Try manual search.');
      }
    } catch (error) {
      setScanStatus('');
      setScanError('Search failed. Try manual search.');
    }
  };

  const getServingOptions = (food: FoodItem) => [
    { unit: 'grams', grams: 1, description: 'grams' },
    ...food.servingSizes
  ];

  const calculateNutrition = (food: FoodItem, qty: number, servingUnit: string) => {
    const serving = getServingOptions(food).find(option => option.unit === servingUnit);
    const grams = serving ? qty * serving.grams : qty;
    const multiplier = grams / 100;
    return {
      grams,
      calories: Math.round(food.calories * multiplier),
      macros: {
        protein: +(food.macros.protein * multiplier).toFixed(1),
        carbs: +(food.macros.carbs * multiplier).toFixed(1),
        fats: +(food.macros.fats * multiplier).toFixed(1),
        fiber: +(food.macros.fiber * multiplier).toFixed(1),
        sugar: +(food.macros.sugar * multiplier).toFixed(1),
        sodium: Math.round(food.macros.sodium * multiplier),
      },
    };
  };

  const handleAddMeal = () => {
    if (!selectedFood) return;
    const adjustedQuantity = quantity * (portionMultipliers[portionEstimate] || 1);
    const nutrition = calculateNutrition(selectedFood, adjustedQuantity, selectedServing);
    const meal: MealEntry = {
      id: Date.now().toString(),
      userId: 'demo-user',
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      quantity: nutrition.grams,
      servingSize: selectedServing,
      mealType: selectedMealType,
      calories: nutrition.calories,
      macros: nutrition.macros,
      timestamp: new Date(),
    };
    
    dispatch(addMeal(meal));
    setSelectedFood(null);
    setPortionEstimate('medium');
    setToastMessage(`Added ${selectedFood.name} to your ${selectedMealType}!`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <Container>
      <HeaderCard>
        <h2>🍛 Smart Indian Food Logger</h2>
        <p>Search by dish, filter by region, and log with precise portion controls.</p>
      </HeaderCard>
      <Toast $visible={!!toastMessage}>{toastMessage}</Toast>
      
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

        <ScanSection>
          <ScanButton
            onClick={() => {
              const input = document.getElementById('barcode-input') as HTMLInputElement | null;
              input?.click();
            }}
          >
            📦 Scan barcode
          </ScanButton>
          <input
            id="barcode-input"
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleBarcodeFile(file);
              e.currentTarget.value = '';
            }}
          />

          <ScanButton
            onClick={() => {
              const input = document.getElementById('photo-input') as HTMLInputElement | null;
              input?.click();
            }}
          >
            📸 Scan food photo
          </ScanButton>
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFoodPhoto(file);
              e.currentTarget.value = '';
            }}
          />

          {scanStatus && <ScanStatus>{scanStatus}</ScanStatus>}
          {scanError && <ScanStatus style={{ color: '#b91c1c' }}>{scanError}</ScanStatus>}
        </ScanSection>

        {scanSuggestions.length > 0 && (
          <ScanResults>
            {scanSuggestions.map((suggestion) => (
              <SuggestionChip
                key={suggestion.name}
                onClick={() => handleSuggestionSelect(suggestion.name)}
              >
                {suggestion.name}
                {suggestion.confidence !== null ? ` (${Math.round(suggestion.confidence * 100)}%)` : ''}
              </SuggestionChip>
            ))}
          </ScanResults>
        )}
        
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
        {(searchQuery.trim().length >= 2 ? apiFoods : filteredFoods.slice(0, 20)).map((food) => (
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
            
            <AddButton onClick={() => {
              setSelectedFood(food);
              setQuantity(1);
              setSelectedServing(food.servingSizes[0]?.unit || 'grams');
            }}>
              Add to {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)}
            </AddButton>
          </FoodCard>
        ))}
      </FoodGrid>

      {searchQuery.trim().length >= 2 && apiHasMore && (
        <LoadMoreButton onClick={loadMoreFoods} disabled={apiLoading}>
          {apiLoading ? 'Loading…' : 'Load more foods'}
        </LoadMoreButton>
      )}

      {todaysMeals.length > 0 && (
        <SearchSection style={{ marginTop: '2rem' }}>
          <h3>Today's Meals ({todaysMeals.length} items)</h3>
          {todaysMeals.map((meal: any) => (
            <div key={meal.id} style={{ padding: '0.5rem', borderLeft: '3px solid #667eea', margin: '0.5rem 0', background: '#f8f9fa' }}>
              <strong>{meal.foodName}</strong> - {meal.mealType} - {meal.calories} cal
            </div>
          ))}
        </SearchSection>
      )}

      <ModalBackdrop $open={!!selectedFood} role="dialog" aria-modal="true" aria-labelledby="food-log-title">
        {selectedFood && (
          <ModalCard>
            <ModalHeader>
              <h3 id="food-log-title">Log {selectedFood.name}</h3>
              <ModalClose onClick={() => setSelectedFood(null)} aria-label="Close">×</ModalClose>
            </ModalHeader>
            <FormRow>
              <div>
                <label htmlFor="quantity">Quantity</label>
                <SearchInput
                  id="quantity"
                  type="number"
                  min="0.25"
                  step="0.25"
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label htmlFor="serving">Serving</label>
                <Select
                  id="serving"
                  value={selectedServing}
                  onChange={(e) => setSelectedServing(e.target.value)}
                >
                  {getServingOptions(selectedFood).map(option => (
                    <option key={option.unit} value={option.unit}>
                      {option.description || option.unit}
                    </option>
                  ))}
                </Select>
              </div>
            </FormRow>
            <FormRow>
              <div>
                <label htmlFor="portion">Portion estimate</label>
                <Select
                  id="portion"
                  value={portionEstimate}
                  onChange={(e) => setPortionEstimate(e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </Select>
              </div>
              <div>
                <label>Adjusted quantity</label>
                <SearchInput
                  type="text"
                  value={`${(quantity * (portionMultipliers[portionEstimate] || 1)).toFixed(2)} ${selectedServing}`}
                  readOnly
                />
              </div>
            </FormRow>
            <SummaryCard>
              {(() => {
                const adjustedQuantity = quantity * (portionMultipliers[portionEstimate] || 1);
                const nutrition = calculateNutrition(selectedFood, adjustedQuantity, selectedServing);
                return (
                  <>
                    <p><strong>{nutrition.calories} cal</strong> • {nutrition.grams.toFixed(0)}g total</p>
                    <p>Protein: {nutrition.macros.protein}g • Carbs: {nutrition.macros.carbs}g • Fats: {nutrition.macros.fats}g</p>
                  </>
                );
              })()}
            </SummaryCard>
            <AddButton onClick={handleAddMeal} disabled={quantity <= 0}>
              Log {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)}
            </AddButton>
          </ModalCard>
        )}
      </ModalBackdrop>
    </Container>
  );
};

export default FoodLog;
