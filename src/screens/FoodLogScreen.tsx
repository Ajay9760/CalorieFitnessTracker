import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, DIMENSIONS } from '../constants';

export default function FoodLogScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Log</Text>
      <Text style={styles.subtitle}>Track your meals and calories</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DIMENSIONS.padding,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});
