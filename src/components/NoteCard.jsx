import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { cardAccents } from '../theme/colors';

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  // If already formatted string like "2026-05-12 09:10"
  const date = new Date(timestamp.replace(' ', 'T'));
  if (isNaN(date)) return timestamp;
  const now = new Date();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

const wordCount = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

const NoteCard = ({ note, theme, onPress, index = 0, isDark }) => {
  const accent = cardAccents[index % cardAccents.length];
  const accentBg = isDark ? accent.darkBg : accent.bg;
  const accentDot = isDark ? accent.darkDot : accent.dot;
  const preview = note.body.length > 110 ? `${note.body.slice(0, 110)}...` : note.body;
  const words = wordCount(note.body);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
          transform: [{ scale: pressed ? 0.975 : 1 }],
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      onPress={onPress}
    >
      {/* Accent top strip */}
      <View style={[styles.accentStrip, { backgroundColor: accentDot }]} />

      <View style={styles.cardInner}>
        {/* Tag dot + word count */}
        <View style={styles.metaRow}>
          <View style={[styles.tagDot, { backgroundColor: accentDot }]} />
          <Text style={[styles.wordCount, { color: theme.tertiaryText }]}>
            {words} {words === 1 ? 'word' : 'words'}
          </Text>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {note.title || 'Untitled'}
        </Text>

        {/* Preview */}
        {preview ? (
          <Text style={[styles.preview, { color: theme.secondaryText }]} numberOfLines={3}>
            {preview}
          </Text>
        ) : (
          <Text style={[styles.preview, { color: theme.tertiaryText, fontStyle: 'italic' }]}>
            No content yet...
          </Text>
        )}

        {/* Footer */}
        <View style={styles.cardFooter}>
          <Text style={[styles.timestamp, { color: theme.tertiaryText }]}>
            🕐 {formatDate(note.timestamp)}
          </Text>
          <View style={[styles.arrowBadge, { backgroundColor: accentBg }]}>
            <Text style={[styles.arrowText, { color: accentDot }]}>→</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  accentStrip: {
    height: 4,
    width: '100%',
  },
  cardInner: {
    padding: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  wordCount: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  preview: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '500',
  },
  arrowBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default NoteCard;
