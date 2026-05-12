import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

const NoteEditorScreen = ({ note, theme, onSave, onBack, dimensions }) => {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  useEffect(() => {
    setTitle(note.title);
    setBody(note.body);
  }, [note]);

  const handleSave = () => {
    const updatedNote = {
      ...note,
      title: title.trim() || 'Untitled note',
      body,
      timestamp: new Date().toISOString(),
    };
    onSave(updatedNote);
  };

  const headerHeight = dimensions.height * 0.16;
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}> 
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <View style={[styles.header, { height: headerHeight, backgroundColor: theme.primary }]}> 
          <View style={styles.headerTitleWrapper}>
            <Text style={[styles.headerTitle, { color: theme.onPrimary }]}>Edit note</Text>
            <Text style={[styles.headerSubtitle, { color: theme.onPrimary }]}>Write freely, then save when ready.</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.editorContent} keyboardShouldPersistTaps="handled">
          <View style={[styles.inputCard, { backgroundColor: theme.card }]}> 
            <Text style={[styles.inputLabel, { color: theme.secondaryText }]}>Title</Text>
            <TextInput
              style={[styles.titleInput, { color: theme.text }]}
              placeholder="Note title"
              placeholderTextColor={theme.placeholder}
              value={title}
              onChangeText={setTitle}
              returnKeyType="done"
            />
          </View>

          <View style={[styles.inputCard, { backgroundColor: theme.card }]}> 
            <Text style={[styles.inputLabel, { color: theme.secondaryText }]}>Body</Text>
            <TextInput
              style={[styles.bodyInput, { color: theme.text, minHeight: 220 }]}
              placeholder="Write your note here..."
              placeholderTextColor={theme.placeholder}
              value={body}
              onChangeText={setBody}
              multiline
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: theme.background }]}>
          <Pressable onPress={onBack} style={[styles.footerButton, { backgroundColor: 'rgba(0, 0, 0, 0.08)' }]}>
            <Text style={[styles.footerButtonText, { color: theme.text }]}>Back</Text>
          </Pressable>
          <Pressable onPress={handleSave} style={[styles.footerButton, { backgroundColor: theme.primary }]}>
            <Text style={[styles.footerButtonText, { color: theme.onPrimary, fontWeight: '700' }]}>Save Note</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 16,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 25, 33, 0.16)',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitleWrapper: {
    marginBottom: 0,
  },
  headerTitle: {
    fontFamily: 'serif',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  headerSubtitle: {
    fontFamily: 'serif',
    marginTop: 6,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  editorContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 24,
  },
  inputCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  inputLabel: {
    fontFamily: 'serif',
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  titleInput: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
  },
  bodyInput: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 26,
    minHeight: 180,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingVertical: 16,
    gap: 12,
  },  footerButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default NoteEditorScreen;
