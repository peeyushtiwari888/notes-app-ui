import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

const ThemeToggle = ({ value, onValueChange, theme }) => {
  return (
    <Pressable
      onPress={onValueChange}
      style={({ pressed }) => [
        styles.toggleBtn,
        {
          backgroundColor: value ? theme.primaryLight : theme.primaryLight,
          borderColor: value ? theme.primary : theme.divider,
          opacity: pressed ? 0.75 : 1,
          transform: [{ scale: pressed ? 0.93 : 1 }],
        },
      ]}
    >
      <View style={styles.inner}>
        <Text style={styles.icon}>{value ? '🌙' : '☀️'}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  toggleBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
});

export default ThemeToggle;
