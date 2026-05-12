import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';

const NoteCard = ({ note, theme, onPress }) => {
  const previewText = note.body.length > 100 ? `${note.body.slice(0, 100)}...` : note.body;
  const cardStyle = StyleSheet.flatten([styles.card, { backgroundColor: theme.card }]);

  return (
    <Pressable
      style={({ pressed }) => [cardStyle, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
        {note.title || 'Untitled'}
      </Text>
      <Text style={[styles.preview, { color: theme.secondaryText }]} numberOfLines={3}>
        {previewText}
      </Text>
      <View style={styles.footer}>
        <Text style={[styles.timestamp, { color: theme.tertiaryText }]}>{note.timestamp}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 148,
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: Platform.OS === 'ios' ? 0.08 : 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.996 }],
  },
  title: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  preview: {
    fontFamily: 'serif',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 14,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'flex-start',
  },
  timestamp: {
    fontFamily: 'serif',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});

export default NoteCard;
