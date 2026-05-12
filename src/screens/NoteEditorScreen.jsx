import React, { useState, useEffect, useRef } from 'react';
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
  StatusBar,
} from 'react-native';

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const d = new Date(timestamp.replace ? timestamp.replace(' ', 'T') : timestamp);
  if (isNaN(d)) return String(timestamp);
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const wordCount = (text) => {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

const NoteEditorScreen = ({ note, theme, onSave, onBack }) => {
  const [title, setTitle] = useState(note.title || '');
  const [body, setBody] = useState(note.body || '');
  const isNew = !note.body && !note.title;
  const bodyRef = useRef(null);

  useEffect(() => {
    setTitle(note.title || '');
    setBody(note.body || '');
  }, [note]);

  const handleSave = () => {
    onSave({
      ...note,
      title: title.trim() || 'Untitled',
      body,
      timestamp: new Date().toISOString(),
    });
  };

  const hasChanges = title !== (note.title || '') || body !== (note.body || '');

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.statusBarStyle} backgroundColor={theme.background} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* ── Top bar ── */}
        <View style={[styles.topBar, { borderBottomColor: theme.divider }]}>
          {/* Back button */}
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [
              styles.iconBtn,
              { backgroundColor: theme.primaryLight, opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Text style={[styles.iconBtnText, { color: theme.primary }]}>‹</Text>
          </Pressable>

          {/* Center label */}
          <View style={styles.topCenter}>
            <Text style={[styles.topLabel, { color: theme.secondaryText }]}>
              {isNew ? '✦  New Note' : '✎  Edit Note'}
            </Text>
            <Text style={[styles.topDate, { color: theme.tertiaryText }]}>
              {note.timestamp ? formatDate(note.timestamp) : 'Not saved yet'}
            </Text>
          </View>

          {/* Word count badge */}
          <View style={[styles.wordBadge, { backgroundColor: theme.primaryLight }]}>
            <Text style={[styles.wordBadgeText, { color: theme.primary }]}>
              {wordCount(body)}w
            </Text>
          </View>
        </View>

        {/* ── Scrollable writing area ── */}
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.editorPad}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title Box */}
          <Text style={[styles.inputLabel, { color: theme.secondaryText }]}>Title</Text>
          <View style={[styles.inputBox, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <TextInput
              style={[styles.titleInput, { color: theme.text }]}
              placeholder="Note title..."
              placeholderTextColor={theme.placeholder}
              value={title}
              onChangeText={setTitle}
              returnKeyType="next"
              onSubmitEditing={() => bodyRef.current?.focus()}
              blurOnSubmit={false}
              multiline
            />
          </View>

          {/* Body Box */}
          <Text style={[styles.inputLabel, { color: theme.secondaryText }]}>Content</Text>
          <View style={[styles.inputBox, styles.bodyBox, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <TextInput
              ref={bodyRef}
              style={[styles.bodyInput, { color: theme.text }]}
              placeholder="Start writing your thoughts here..."
              placeholderTextColor={theme.placeholder}
              value={body}
              onChangeText={setBody}
              multiline
              textAlignVertical="top"
              scrollEnabled={false}
            />
          </View>
        </ScrollView>

        {/* ── Bottom action bar (always at bottom) ── */}
        <View
          style={[
            styles.bottomBar,
            {
              backgroundColor: theme.card,
              borderTopColor: theme.divider,
              paddingBottom: Platform.OS === 'ios' ? 30 : 18,
            },
          ]}
        >
          {/* Hint */}
          <Text style={[styles.hintText, { color: theme.tertiaryText }]}>
            {hasChanges ? '● Unsaved changes' : '✓ Up to date'}
          </Text>

          {/* Buttons row */}
          <View style={styles.btnRow}>
            {/* Back / Discard */}
            <Pressable
              onPress={onBack}
              style={({ pressed }) => [
                styles.discardBtn,
                {
                  borderColor: theme.divider,
                  backgroundColor: theme.background,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text style={[styles.discardBtnText, { color: theme.secondaryText }]}>
                ✕  Discard
              </Text>
            </Pressable>

            {/* Save */}
            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [
                styles.saveBtn,
                {
                  backgroundColor: hasChanges ? theme.primary : theme.primaryLight,
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                  opacity: pressed ? 0.85 : 1,
                  shadowColor: theme.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.saveBtnText,
                  { color: hasChanges ? theme.onPrimary : theme.primary },
                ]}
              >
                ✓  Save Note
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },

  /* ── Top bar ── */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  iconBtnText: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 32,
    marginTop: -2,
  },
  topCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  topLabel: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  topDate: {
    fontSize: 11,
    fontWeight: '400',
    marginTop: 2,
  },
  wordBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 42,
  },
  wordBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  /* ── Editor ── */
  editorPad: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    flexGrow: 1,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputBox: {
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  bodyBox: {
    minHeight: 260,
  },
  titleInput: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 30,
    letterSpacing: -0.4,
    minHeight: 36,
  },
  bodyInput: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 26,
    minHeight: 240,
    textAlignVertical: 'top',
  },

  /* ── Bottom bar ── */
  bottomBar: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  hintText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginBottom: 12,
    textAlign: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discardBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  discardBtnText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  saveBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});

export default NoteEditorScreen;
