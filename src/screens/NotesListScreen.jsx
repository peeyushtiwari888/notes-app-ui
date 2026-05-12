import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import NoteCard from '../components/NoteCard';
import ThemeToggle from '../components/ThemeToggle';

const NotesListScreen = ({ notes, theme, onOpenNote, onCreateNote, onToggleTheme, themeMode, dimensions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const columnCount = dimensions.width > 700 ? 2 : 1;

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return notes;
    return notes.filter(note => {
      return (
        note.title.toLowerCase().includes(query) ||
        note.body.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, notes]);

  const renderItem = ({ item }) => (
    <NoteCard note={item} theme={theme} onPress={() => onOpenNote(item)} />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}> 
      <View style={[styles.pageContainer, { backgroundColor: theme.background }]}> 
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <Text style={[styles.screenTitle, { color: theme.text }]}>NoteStack</Text>
            <Text style={[styles.screenSubtitle, { color: theme.secondaryText }]}>Modern notes with cozy reading flow.</Text>
          </View>
          <ThemeToggle value={themeMode === 'dark'} onValueChange={onToggleTheme} theme={theme} />
        </View>

        <View style={[styles.searchContainer, { backgroundColor: theme.card }]}> 
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search notes"
            placeholderTextColor={theme.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.listMeta}> 
          <Text style={[styles.listMetaText, { color: theme.secondaryText }]}>Showing {filteredNotes.length} NOTES</Text>
        </View>

        {filteredNotes.length === 0 ? (
          <View style={styles.emptyContainer}> 
            <Text style={[styles.emptyTitle, { color: theme.text }]}>No notes found</Text>
            <Text style={[styles.emptySubtitle, { color: theme.secondaryText }]}>Create a new note and start capturing ideas.</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={filteredNotes}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={columnCount}
            columnWrapperStyle={columnCount > 1 ? styles.columnWrapper : null}
            showsVerticalScrollIndicator={false}
          />
        )}

        <Pressable
          style={({ pressed }) => [
            styles.fab,
            { backgroundColor: theme.primary },
            pressed && styles.fabPressed,
          ]}
          onPress={onCreateNote}
        >
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  titleBlock: {
    flex: 1,
    paddingRight: 14,
    paddingTop: 2,
  },
  screenTitle: {
    fontSize: 40,
    fontWeight: '900',
    fontFamily: 'serif',
    letterSpacing: -0.55,
    lineHeight: 44,
    textShadowColor: 'rgba(0, 0, 0, 0.12)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  screenSubtitle: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'serif',
    fontWeight: '500',
    lineHeight: 24,
  },
  searchContainer: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  searchInput: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '500',
    minHeight: 46,
  },
  listMeta: {
    marginBottom: 18,
  },
  listMetaText: {
    fontFamily: 'serif',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  listContainer: {
    paddingBottom: 110,
    paddingTop: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 14,
  },
  emptyTitle: {
    fontFamily: 'serif',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  emptySubtitle: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 26,
    textAlign: 'center',
    maxWidth: 280,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 28,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  fabPressed: {
    opacity: 0.8,
  },
  fabText: {
    fontSize: 36,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 40,
  },
});

export default NotesListScreen;
