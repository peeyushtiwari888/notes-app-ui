import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import NoteCard from '../components/NoteCard';
import ThemeToggle from '../components/ThemeToggle';

const NotesListScreen = ({
  notes,
  theme,
  onOpenNote,
  onCreateNote,
  onToggleTheme,
  themeMode,
  dimensions,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const isDark = themeMode === 'dark';

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.body.toLowerCase().includes(query)
    );
  }, [searchQuery, notes]);

  const renderItem = ({ item, index }) => (
    <NoteCard
      note={item}
      theme={theme}
      onPress={() => onOpenNote(item)}
      index={index}
      isDark={isDark}
    />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.statusBarStyle}
        backgroundColor={theme.background}
      />

      <View style={[styles.page, { backgroundColor: theme.background }]}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.titleBlock}>
            <Text style={[styles.appName, { color: theme.primary }]}>
              NoteStack
            </Text>
            <Text style={[styles.appSub, { color: theme.secondaryText }]}>
              {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
            </Text>
          </View>
          <ThemeToggle
            value={isDark}
            onValueChange={onToggleTheme}
            theme={theme}
          />
        </View>

        {/* ── Search Bar ── */}
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: theme.searchBg,
              borderColor: searchFocused ? theme.primary : theme.divider,
              shadowColor: searchFocused ? theme.primary : '#000',
              shadowOpacity: searchFocused ? 0.15 : 0.05,
            },
          ]}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search notes..."
            placeholderTextColor={theme.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <Text style={[styles.clearText, { color: theme.tertiaryText }]}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* ── List meta ── */}
        {searchQuery.length > 0 && (
          <Text style={[styles.searchResult, { color: theme.tertiaryText }]}>
            {filteredNotes.length === 0
              ? 'No results found'
              : `${filteredNotes.length} result${filteredNotes.length > 1 ? 's' : ''} for "${searchQuery}"`}
          </Text>
        )}

        {/* ── Notes List ── */}
        {filteredNotes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>
              {searchQuery ? '🔎' : '📝'}
            </Text>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {searchQuery ? 'No notes found' : 'No notes yet'}
            </Text>
            <Text style={[styles.emptySub, { color: theme.secondaryText }]}>
              {searchQuery
                ? 'Try a different search term'
                : 'Tap the + button to create your first note'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredNotes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
          />
        )}

        {/* ── FAB ── */}
        <Pressable
          style={({ pressed }) => [
            styles.fab,
            {
              backgroundColor: theme.primary,
              shadowColor: theme.fabShadow,
              transform: [{ scale: pressed ? 0.92 : 1 }],
              opacity: pressed ? 0.85 : 1,
            },
          ]}
          onPress={onCreateNote}
        >
          <Text style={styles.fabIcon}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 32 : 28,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 10,
  },
  titleBlock: {
    flex: 1,
    alignItems: 'center',
  },
  appName: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 38,
    textAlign: 'center',
  },
  appSub: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 3,
    letterSpacing: 0.2,
    textAlign: 'center',
  },

  /* Search */
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 6,
    marginBottom: 10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  clearBtn: {
    padding: 4,
  },
  clearText: {
    fontSize: 13,
    fontWeight: '700',
  },

  /* Search result hint */
  searchResult: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginBottom: 10,
    paddingHorizontal: 4,
  },

  /* List */
  listContent: {
    paddingTop: 6,
    paddingBottom: 110,
  },

  /* Empty */
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  emptySub: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 260,
  },

  /* FAB */
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  fabIcon: {
    fontSize: 30,
    fontWeight: '300',
    color: '#fff',
    lineHeight: 34,
    marginTop: Platform.OS === 'android' ? -2 : 0,
  },
});

export default NotesListScreen;
