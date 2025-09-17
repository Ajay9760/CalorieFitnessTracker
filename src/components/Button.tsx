import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, DIMENSIONS, TYPOGRAPHY } from '../constants';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const iconColor = getIconColor(variant, disabled);
  const iconSize = getIconSize(size);

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? COLORS.textInverse : COLORS.primary}
        />
      ) : (
        <>
          {leftIcon && (
            <Icon
              name={leftIcon}
              size={iconSize}
              color={iconColor}
              style={styles.leftIcon}
            />
          )}
          <Text style={textStyles}>{title}</Text>
          {rightIcon && (
            <Icon
              name={rightIcon}
              size={iconSize}
              color={iconColor}
              style={styles.rightIcon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const getIconColor = (variant: ButtonVariant, disabled: boolean): string => {
  if (disabled) return COLORS.textTertiary;
  
  switch (variant) {
    case 'primary':
    case 'danger':
      return COLORS.textInverse;
    case 'secondary':
      return COLORS.textInverse;
    case 'outline':
    case 'ghost':
    default:
      return COLORS.primary;
  }
};

const getIconSize = (size: ButtonSize): number => {
  switch (size) {
    case 'small':
      return DIMENSIONS.iconSmall;
    case 'large':
      return DIMENSIONS.iconLarge;
    case 'medium':
    default:
      return DIMENSIONS.iconMedium;
  }
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: DIMENSIONS.borderRadius,
    paddingHorizontal: DIMENSIONS.space4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  
  // Variants
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: COLORS.error,
  },
  
  // Sizes
  small: {
    height: DIMENSIONS.buttonHeightSmall,
    paddingHorizontal: DIMENSIONS.space3,
  },
  medium: {
    height: DIMENSIONS.buttonHeight,
    paddingHorizontal: DIMENSIONS.space4,
  },
  large: {
    height: DIMENSIONS.buttonHeightLarge,
    paddingHorizontal: DIMENSIONS.space6,
  },
  
  // States
  disabled: {
    backgroundColor: COLORS.gray200,
    borderColor: COLORS.gray200,
  },
  
  // Layout
  fullWidth: {
    width: '100%',
  },
  
  // Text styles
  text: {
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    textAlign: 'center',
  },
  
  // Text variants
  primaryText: {
    color: COLORS.textInverse,
  },
  secondaryText: {
    color: COLORS.textInverse,
  },
  outlineText: {
    color: COLORS.textPrimary,
  },
  ghostText: {
    color: COLORS.primary,
  },
  dangerText: {
    color: COLORS.textInverse,
  },
  
  // Text sizes
  smallText: {
    fontSize: TYPOGRAPHY.body,
  },
  mediumText: {
    fontSize: TYPOGRAPHY.bodyLarge,
  },
  largeText: {
    fontSize: TYPOGRAPHY.subtitle,
  },
  
  disabledText: {
    color: COLORS.textTertiary,
  },
  
  // Icons
  leftIcon: {
    marginRight: DIMENSIONS.space2,
  },
  rightIcon: {
    marginLeft: DIMENSIONS.space2,
  },
});

export default Button;