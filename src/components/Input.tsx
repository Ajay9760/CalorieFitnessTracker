import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, DIMENSIONS, TYPOGRAPHY } from '../constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  required = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyles = [
    styles.container,
    containerStyle,
  ];

  const inputContainerStyles = [
    styles.inputContainer,
    isFocused && styles.inputContainerFocused,
    error && styles.inputContainerError,
  ];

  const textInputStyles = [
    styles.input,
    leftIcon && styles.inputWithLeftIcon,
    rightIcon && styles.inputWithRightIcon,
    inputStyle,
  ];

  return (
    <View style={containerStyles}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}
      
      <View style={inputContainerStyles}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={DIMENSIONS.iconMedium}
            color={error ? COLORS.error : isFocused ? COLORS.primary : COLORS.textTertiary}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          {...props}
          style={textInputStyles}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          placeholderTextColor={COLORS.textTertiary}
        />
        
        {rightIcon && (
          <Icon
            name={rightIcon}
            size={DIMENSIONS.iconMedium}
            color={error ? COLORS.error : isFocused ? COLORS.primary : COLORS.textTertiary}
            style={styles.rightIcon}
          />
        )}
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Icon
            name="alert-circle-outline"
            size={DIMENSIONS.iconSmall}
            color={COLORS.error}
            style={styles.errorIcon}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: DIMENSIONS.space4,
  },
  
  labelContainer: {
    marginBottom: DIMENSIONS.space2,
  },
  
  label: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    color: COLORS.textPrimary,
  },
  
  required: {
    color: COLORS.error,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: DIMENSIONS.borderRadius,
    paddingHorizontal: DIMENSIONS.space4,
    minHeight: DIMENSIONS.inputHeight,
  },
  
  inputContainerFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  inputContainerError: {
    borderColor: COLORS.error,
  },
  
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.bodyLarge,
    color: COLORS.textPrimary,
    paddingVertical: DIMENSIONS.space3,
  },
  
  inputWithLeftIcon: {
    marginLeft: DIMENSIONS.space3,
  },
  
  inputWithRightIcon: {
    marginRight: DIMENSIONS.space3,
  },
  
  leftIcon: {
    marginRight: 0,
  },
  
  rightIcon: {
    marginLeft: 0,
  },
  
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DIMENSIONS.space2,
  },
  
  errorIcon: {
    marginRight: DIMENSIONS.space1,
  },
  
  errorText: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.error,
    flex: 1,
  },
});

export default Input;