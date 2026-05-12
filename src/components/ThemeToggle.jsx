import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ThemeToggle = ({ value, onValueChange, theme }) => {
  return (
    <View style={styles.toggleRow}>
      <Text style={[styles.toggleLabel, { color: theme.text }]}>Dark</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? theme.primary : theme.card}
        trackColor={{ false: '#ccc', true: theme.primary }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 10,
  },
});

export default ThemeToggle;
