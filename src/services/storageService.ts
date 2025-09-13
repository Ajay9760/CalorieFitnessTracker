import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';
import { User, MealEntry, ActivityEntry, WaterEntry } from '../types';

/**
 * Generic storage service for AsyncStorage operations
 */
class StorageService {
  /**
   * Store data in AsyncStorage
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  }

  /**
   * Retrieve data from AsyncStorage
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }

  /**
   * Remove data from AsyncStorage
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  }

  /**
   * Clear all AsyncStorage data
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * Get all keys from AsyncStorage
   */
  async getAllKeys(): Promise<readonly string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting keys:', error);
      return [];
    }
  }

  // User-specific methods
  async setUserToken(token: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.USER_TOKEN, token);
  }

  async getUserToken(): Promise<string | null> {
    return await this.getItem<string>(STORAGE_KEYS.USER_TOKEN);
  }

  async setRefreshToken(token: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  async getRefreshToken(): Promise<string | null> {
    return await this.getItem<string>(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async setUserData(user: User): Promise<void> {
    await this.setItem(STORAGE_KEYS.USER_DATA, user);
  }

  async getUserData(): Promise<User | null> {
    return await this.getItem<User>(STORAGE_KEYS.USER_DATA);
  }

  async clearUserData(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.USER_TOKEN);
    await this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    await this.removeItem(STORAGE_KEYS.USER_DATA);
  }

  // Offline data methods
  async storeOfflineMeals(meals: MealEntry[]): Promise<void> {
    const existingMeals = await this.getOfflineMeals();
    const allMeals = [...existingMeals, ...meals];
    await this.setItem(STORAGE_KEYS.OFFLINE_MEALS, allMeals);
  }

  async getOfflineMeals(): Promise<MealEntry[]> {
    return (await this.getItem<MealEntry[]>(STORAGE_KEYS.OFFLINE_MEALS)) || [];
  }

  async clearOfflineMeals(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.OFFLINE_MEALS);
  }

  async storeOfflineActivities(activities: ActivityEntry[]): Promise<void> {
    const existingActivities = await this.getOfflineActivities();
    const allActivities = [...existingActivities, ...activities];
    await this.setItem(STORAGE_KEYS.OFFLINE_ACTIVITIES, allActivities);
  }

  async getOfflineActivities(): Promise<ActivityEntry[]> {
    return (await this.getItem<ActivityEntry[]>(STORAGE_KEYS.OFFLINE_ACTIVITIES)) || [];
  }

  async clearOfflineActivities(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.OFFLINE_ACTIVITIES);
  }

  async storeOfflineWaterEntries(waterEntries: WaterEntry[]): Promise<void> {
    const existingEntries = await this.getOfflineWaterEntries();
    const allEntries = [...existingEntries, ...waterEntries];
    await this.setItem(STORAGE_KEYS.OFFLINE_WATER, allEntries);
  }

  async getOfflineWaterEntries(): Promise<WaterEntry[]> {
    return (await this.getItem<WaterEntry[]>(STORAGE_KEYS.OFFLINE_WATER)) || [];
  }

  async clearOfflineWaterEntries(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.OFFLINE_WATER);
  }

  // Food database caching
  async storeFoodDatabase(foods: any[]): Promise<void> {
    await this.setItem(STORAGE_KEYS.FOOD_DATABASE, foods);
  }

  async getFoodDatabase(): Promise<any[] | null> {
    return await this.getItem<any[]>(STORAGE_KEYS.FOOD_DATABASE);
  }

  // Sync timestamp
  async setLastSyncTime(timestamp: Date): Promise<void> {
    await this.setItem(STORAGE_KEYS.LAST_SYNC, timestamp.toISOString());
  }

  async getLastSyncTime(): Promise<Date | null> {
    const timestamp = await this.getItem<string>(STORAGE_KEYS.LAST_SYNC);
    return timestamp ? new Date(timestamp) : null;
  }

  // Onboarding status
  async setOnboardingComplete(complete: boolean): Promise<void> {
    await this.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, complete);
  }

  async getOnboardingComplete(): Promise<boolean> {
    return (await this.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE)) || false;
  }

  // Batch operations for offline sync
  async getAllOfflineData(): Promise<{
    meals: MealEntry[];
    activities: ActivityEntry[];
    waterEntries: WaterEntry[];
  }> {
    const [meals, activities, waterEntries] = await Promise.all([
      this.getOfflineMeals(),
      this.getOfflineActivities(),
      this.getOfflineWaterEntries(),
    ]);

    return {
      meals,
      activities,
      waterEntries,
    };
  }

  async clearAllOfflineData(): Promise<void> {
    await Promise.all([
      this.clearOfflineMeals(),
      this.clearOfflineActivities(),
      this.clearOfflineWaterEntries(),
    ]);
  }

  // Debug methods
  async getStorageInfo(): Promise<{
    keys: readonly string[];
    userToken: string | null;
    userData: User | null;
    offlineDataCount: {
      meals: number;
      activities: number;
      waterEntries: number;
    };
  }> {
    const keys = await this.getAllKeys();
    const userToken = await this.getUserToken();
    const userData = await this.getUserData();
    const offlineData = await this.getAllOfflineData();

    return {
      keys,
      userToken,
      userData,
      offlineDataCount: {
        meals: offlineData.meals.length,
        activities: offlineData.activities.length,
        waterEntries: offlineData.waterEntries.length,
      },
    };
  }
}

// Export singleton instance
export const storageService = new StorageService();
export default storageService;
