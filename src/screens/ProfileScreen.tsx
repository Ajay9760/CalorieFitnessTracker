import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, DIMENSIONS, TYPOGRAPHY } from '../constants';
import { RootState } from '../store';
import { updateUserProfile } from '../store/slices/userSlice';
import { User } from '../types';
import { calculateTDEE, calculateDailyCalorieGoal } from '../utils/calculations';

interface ProfileItemProps {
  icon: string;
  label: string;
  value: string;
  onPress: () => void;
  showChevron?: boolean;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, label, value, onPress, showChevron = true }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.profileItemLeft}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={DIMENSIONS.iconLarge} color={COLORS.primary} />
      </View>
      <View style={styles.profileItemContent}>
        <Text style={styles.profileItemLabel}>{label}</Text>
        <Text style={styles.profileItemValue}>{value}</Text>
      </View>
    </View>
    {showChevron && (
      <Icon name="chevron-right" size={DIMENSIONS.iconMedium} color={COLORS.textTertiary} />
    )}
  </TouchableOpacity>
);

interface EditModalProps {
  visible: boolean;
  title: string;
  value: string;
  onSave: (value: string) => void;
  onClose: () => void;
  keyboardType?: 'default' | 'numeric';
  placeholder?: string;
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  title,
  value,
  onSave,
  onClose,
  keyboardType = 'default',
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave(inputValue.trim());
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            style={styles.modalInput}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textTertiary}
            autoFocus
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButtonCancel} onPress={onClose}>
              <Text style={styles.modalButtonCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonSave} onPress={handleSave}>
              <Text style={styles.modalButtonSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface PickerModalProps {
  visible: boolean;
  title: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const PickerModal: React.FC<PickerModalProps> = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.pickerModalContainer}>
          <View style={styles.pickerHeader}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.pickerCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.pickerTitle}>{title}</Text>
            <View style={{ width: 60 }} />
          </View>
          <ScrollView style={styles.pickerOptions}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.pickerOption,
                  selectedValue === option.value && styles.pickerOptionSelected,
                ]}
                onPress={() => {
                  onSelect(option.value);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    selectedValue === option.value && styles.pickerOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {selectedValue === option.value && (
                  <Icon name="check" size={DIMENSIONS.iconMedium} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  
  const [editModal, setEditModal] = useState<{
    visible: boolean;
    field: keyof User | '';
    title: string;
    value: string;
    keyboardType?: 'default' | 'numeric';
    placeholder?: string;
  }>({
    visible: false,
    field: '',
    title: '',
    value: '',
  });

  const [pickerModal, setPickerModal] = useState<{
    visible: boolean;
    field: keyof User | '';
    title: string;
    options: { label: string; value: string }[];
  }>({ visible: false, field: '', title: '', options: [] });

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Icon name="account-circle" size={80} color={COLORS.textTertiary} />
          <Text style={styles.emptyStateText}>Please log in to view your profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleEditField = (field: keyof User, title: string, keyboardType?: 'default' | 'numeric', placeholder?: string) => {
    setEditModal({
      visible: true,
      field,
      title,
      value: String(user[field] || ''),
      keyboardType,
      placeholder,
    });
  };

  const handlePickerField = (field: keyof User, title: string, options: { label: string; value: string }[]) => {
    setPickerModal({
      visible: true,
      field,
      title,
      options,
    });
  };

  const handleSaveEdit = (value: string) => {
    if (editModal.field) {
      let processedValue: any = value;
      
      // Convert to number for numeric fields
      if (['age', 'height', 'weight', 'dailyCalorieGoal', 'dailyStepGoal', 'dailyWaterGoal'].includes(editModal.field)) {
        processedValue = parseFloat(value);
        if (isNaN(processedValue)) {
          Alert.alert('Invalid Input', 'Please enter a valid number');
          return;
        }
      }
      
      dispatch(updateUserProfile({ [editModal.field]: processedValue }));
      
      // Recalculate calorie goal if relevant fields changed
      if (['age', 'weight', 'height', 'activityLevel'].includes(editModal.field)) {
        const updatedUser = { ...user, [editModal.field]: processedValue };
        const newCalorieGoal = calculateDailyCalorieGoal(updatedUser);
        dispatch(updateUserProfile({ dailyCalorieGoal: newCalorieGoal }));
      }
    }
  };

  const handlePickerSelect = (value: string) => {
    if (pickerModal.field) {
      dispatch(updateUserProfile({ [pickerModal.field]: value }));
      
      // Recalculate calorie goal if activity level changed
      if (pickerModal.field === 'activityLevel') {
        const updatedUser = { ...user, activityLevel: value as User['activityLevel'] };
        const newCalorieGoal = calculateDailyCalorieGoal(updatedUser);
        dispatch(updateUserProfile({ dailyCalorieGoal: newCalorieGoal }));
      }
    }
  };

  const closeEditModal = () => setEditModal({ visible: false, field: '', title: '', value: '' });
  const closePickerModal = () => setPickerModal({ visible: false, field: '', title: '', options: [] });

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const activityLevelOptions = [
    { label: 'Sedentary (little or no exercise)', value: 'sedentary' },
    { label: 'Lightly active (light exercise 1-3 days/week)', value: 'lightly_active' },
    { label: 'Moderately active (moderate exercise 3-5 days/week)', value: 'moderately_active' },
    { label: 'Very active (hard exercise 6-7 days/week)', value: 'very_active' },
    { label: 'Extra active (very hard exercise, physical job)', value: 'extra_active' },
  ];

  const dietTypeOptions = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Non-Vegetarian', value: 'non_veg' },
    { label: 'Keto', value: 'keto' },
    { label: 'High Protein', value: 'high_protein' },
  ];

  const regionOptions = [
    { label: 'North Indian', value: 'north_indian' },
    { label: 'South Indian', value: 'south_indian' },
    { label: 'East Indian', value: 'east_indian' },
    { label: 'West Indian', value: 'west_indian' },
    { label: 'All Regions', value: 'all' },
  ];

  const getActivityLevelLabel = (level: string) => {
    const option = activityLevelOptions.find(opt => opt.value === level);
    return option ? option.label : level;
  };

  const getDietTypeLabel = (type: string) => {
    const option = dietTypeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  };

  const getRegionLabel = (region: string) => {
    const option = regionOptions.find(opt => opt.value === region);
    return option ? option.label : region;
  };

  const getGenderLabel = (gender: string) => {
    const option = genderOptions.find(opt => opt.value === gender);
    return option ? option.label : gender;
  };

  const currentTDEE = calculateTDEE(user);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Icon name="account-circle" size={80} color={COLORS.primary} />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <ProfileItem
            icon="account"
            label="Full Name"
            value={user.name}
            onPress={() => handleEditField('name', 'Edit Name', 'default', 'Enter your full name')}
          />
          
          <ProfileItem
            icon="gender-male-female"
            label="Gender"
            value={getGenderLabel(user.gender)}
            onPress={() => handlePickerField('gender', 'Select Gender', genderOptions)}
          />
          
          <ProfileItem
            icon="calendar"
            label="Age"
            value={`${user.age} years`}
            onPress={() => handleEditField('age', 'Edit Age', 'numeric', 'Enter your age')}
          />
          
          <ProfileItem
            icon="human-male-height"
            label="Height"
            value={`${user.height} cm`}
            onPress={() => handleEditField('height', 'Edit Height', 'numeric', 'Enter height in cm')}
          />
          
          <ProfileItem
            icon="weight"
            label="Weight"
            value={`${user.weight} kg`}
            onPress={() => handleEditField('weight', 'Edit Weight', 'numeric', 'Enter weight in kg')}
          />
        </View>

        {/* Activity & Diet */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity & Diet Preferences</Text>
          
          <ProfileItem
            icon="run"
            label="Activity Level"
            value={getActivityLevelLabel(user.activityLevel)}
            onPress={() => handlePickerField('activityLevel', 'Select Activity Level', activityLevelOptions)}
          />
          
          <ProfileItem
            icon="food-variant"
            label="Diet Type"
            value={getDietTypeLabel(user.dietType)}
            onPress={() => handlePickerField('dietType', 'Select Diet Type', dietTypeOptions)}
          />
          
          <ProfileItem
            icon="map-marker"
            label="Regional Cuisine"
            value={getRegionLabel(user.region)}
            onPress={() => handlePickerField('region', 'Select Region', regionOptions)}
          />
        </View>

        {/* Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Goals</Text>
          
          <ProfileItem
            icon="fire"
            label="Calorie Goal"
            value={`${user.dailyCalorieGoal} kcal`}
            onPress={() => handleEditField('dailyCalorieGoal', 'Edit Calorie Goal', 'numeric', 'Enter daily calorie goal')}
          />
          
          <ProfileItem
            icon="walk"
            label="Step Goal"
            value={`${user.dailyStepGoal.toLocaleString()} steps`}
            onPress={() => handleEditField('dailyStepGoal', 'Edit Step Goal', 'numeric', 'Enter daily step goal')}
          />
          
          <ProfileItem
            icon="water"
            label="Water Goal"
            value={`${user.dailyWaterGoal} ml`}
            onPress={() => handleEditField('dailyWaterGoal', 'Edit Water Goal', 'numeric', 'Enter daily water goal in ml')}
          />
        </View>

        {/* Calculated Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calculated Metrics</Text>
          
          <ProfileItem
            icon="calculator"
            label="Total Daily Energy Expenditure (TDEE)"
            value={`${currentTDEE} kcal`}
            onPress={() => {}}
            showChevron={false}
          />
          
          <View style={styles.infoCard}>
            <Icon name="information" size={DIMENSIONS.iconMedium} color={COLORS.info} />
            <Text style={styles.infoText}>
              Your TDEE is calculated based on your personal information and activity level. 
              It represents the number of calories you burn in a day.
            </Text>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="logout" size={DIMENSIONS.iconMedium} color={COLORS.error} />
            <Text style={styles.actionButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <EditModal
        visible={editModal.visible}
        title={editModal.title}
        value={editModal.value}
        onSave={handleSaveEdit}
        onClose={closeEditModal}
        keyboardType={editModal.keyboardType}
        placeholder={editModal.placeholder}
      />

      {/* Picker Modal */}
      <PickerModal
        visible={pickerModal.visible}
        title={pickerModal.title}
        options={pickerModal.options}
        selectedValue={String(user[pickerModal.field as keyof User] || '')}
        onSelect={handlePickerSelect}
        onClose={closePickerModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: DIMENSIONS.space8,
    backgroundColor: COLORS.surface,
    marginBottom: DIMENSIONS.space4,
  },
  avatarContainer: {
    marginBottom: DIMENSIONS.space3,
  },
  userName: {
    fontSize: TYPOGRAPHY.title2,
    fontWeight: TYPOGRAPHY.fontWeightBold,
    color: COLORS.textPrimary,
    marginBottom: DIMENSIONS.space1,
  },
  userEmail: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  section: {
    backgroundColor: COLORS.surface,
    marginBottom: DIMENSIONS.space4,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: TYPOGRAPHY.fontWeightSemiBold,
    color: COLORS.textPrimary,
    padding: DIMENSIONS.space4,
    paddingBottom: DIMENSIONS.space2,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DIMENSIONS.space4,
    paddingVertical: DIMENSIONS.space4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DIMENSIONS.space3,
  },
  profileItemContent: {
    flex: 1,
  },
  profileItemLabel: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  profileItemValue: {
    fontSize: TYPOGRAPHY.bodyLarge,
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    color: COLORS.textPrimary,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray50,
    padding: DIMENSIONS.space4,
    margin: DIMENSIONS.space4,
    borderRadius: DIMENSIONS.borderRadius,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  infoText: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginLeft: DIMENSIONS.space3,
    flex: 1,
    lineHeight: TYPOGRAPHY.lineHeightRelaxed * 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: DIMENSIONS.space4,
    margin: DIMENSIONS.space4,
    borderRadius: DIMENSIONS.borderRadius,
    backgroundColor: COLORS.gray50,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  actionButtonText: {
    fontSize: TYPOGRAPHY.bodyLarge,
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    color: COLORS.error,
    marginLeft: DIMENSIONS.space2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DIMENSIONS.space8,
  },
  emptyStateText: {
    fontSize: TYPOGRAPHY.bodyLarge,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: DIMENSIONS.space4,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: DIMENSIONS.space6,
  },
  modalContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: DIMENSIONS.borderRadiusLarge,
    padding: DIMENSIONS.space6,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.title3,
    fontWeight: TYPOGRAPHY.fontWeightSemiBold,
    color: COLORS.textPrimary,
    marginBottom: DIMENSIONS.space4,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: DIMENSIONS.borderRadius,
    padding: DIMENSIONS.space4,
    fontSize: TYPOGRAPHY.bodyLarge,
    color: COLORS.textPrimary,
    marginBottom: DIMENSIONS.space6,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: DIMENSIONS.space3,
  },
  modalButtonCancel: {
    flex: 1,
    padding: DIMENSIONS.space4,
    borderRadius: DIMENSIONS.borderRadius,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
  },
  modalButtonCancelText: {
    fontSize: TYPOGRAPHY.bodyLarge,
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    color: COLORS.textSecondary,
  },
  modalButtonSave: {
    flex: 1,
    padding: DIMENSIONS.space4,
    borderRadius: DIMENSIONS.borderRadius,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  modalButtonSaveText: {
    fontSize: TYPOGRAPHY.bodyLarge,
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    color: COLORS.textInverse,
  },
  
  // Picker Modal Styles
  pickerModalContainer: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: DIMENSIONS.borderRadiusLarge,
    borderTopRightRadius: DIMENSIONS.borderRadiusLarge,
    maxHeight: '80%',
    width: '100%',
    marginTop: 'auto',
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: DIMENSIONS.space4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  pickerCancel: {
    fontSize: TYPOGRAPHY.bodyLarge,
    color: COLORS.textSecondary,
    width: 60,
  },
  pickerTitle: {
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: TYPOGRAPHY.fontWeightSemiBold,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  pickerOptions: {
    maxHeight: 400,
  },
  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: DIMENSIONS.space4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  pickerOptionSelected: {
    backgroundColor: COLORS.gray50,
  },
  pickerOptionText: {
    fontSize: TYPOGRAPHY.bodyLarge,
    color: COLORS.textPrimary,
    flex: 1,
  },
  pickerOptionTextSelected: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeightMedium,
  },
});
