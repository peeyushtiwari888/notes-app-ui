import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
  StyleSheet,
  View,
} from 'react-native';
import NotesListScreen from './src/screens/NotesListScreen';
import NoteEditorScreen from './src/screens/NoteEditorScreen';
import { lightTheme, darkTheme } from './src/theme/colors';
import initialNotes from './src/data/notes';

export default function App() {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(systemScheme || 'light');
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const dimensions = useWindowDimensions();
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenNote = (note) => {
    setSelectedNote(note);
    setIsCreating(false);
  };

  const handleCreateNote = () => {
    setSelectedNote({
      id: Date.now().toString(),
      title: '',
      body: '',
      timestamp: new Date().toISOString(),
    });
    setIsCreating(true);
  };

  const handleSaveNote = (updatedNote) => {
    if (!updatedNote.title.trim() && !updatedNote.body.trim()) {
      // Don't save empty notes
      setSelectedNote(null);
      setIsCreating(false);
      return;
    }
    setNotes((prevNotes) => {
      const existingIndex = prevNotes.findIndex((item) => item.id === updatedNote.id);
      if (existingIndex >= 0) {
        const nextNotes = [...prevNotes];
        nextNotes[existingIndex] = updatedNote;
        return nextNotes;
      }
      return [updatedNote, ...prevNotes];
    });
    setSelectedNote(null);
    setIsCreating(false);
  };

  const handleCloseEditor = () => {
    setSelectedNote(null);
    setIsCreating(false);
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.statusBarStyle}
        backgroundColor={theme.background}
        translucent={false}
      />
      {selectedNote ? (
        <NoteEditorScreen
          note={selectedNote}
          theme={theme}
          onSave={handleSaveNote}
          onBack={handleCloseEditor}
          dimensions={dimensions}
        />
      ) : (
        <NotesListScreen
          notes={notes}
          theme={theme}
          onOpenNote={handleOpenNote}
          onCreateNote={handleCreateNote}
          onToggleTheme={handleToggleTheme}
          themeMode={themeMode}
          dimensions={dimensions}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
