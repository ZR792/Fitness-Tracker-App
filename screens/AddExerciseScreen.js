import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useExercises } from '../context/ExerciseContext';

const CATEGORIES = ['Strength', 'Cardio', 'Core', 'Flexibility'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

const categoryColors = {
  Strength: '#FF6B35',
  Cardio: '#00D4FF',
  Core: '#A855F7',
  Flexibility: '#22C55E',
};

const categoryEmojis = {
  Strength: '💪',
  Cardio: '🏃',
  Core: '🎯',
  Flexibility: '🧘',
};

export default function AddExerciseScreen({ navigation }) {
  const { addExercise } = useExercises();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [category, setCategory] = useState('Strength');
  const [difficulty, setDifficulty] = useState('Beginner');

  const handleSubmit = () => {
    if (!name.trim() || !description.trim() || !duration.trim() || !calories.trim()) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    addExercise({
      name: name.trim(),
      description: description.trim(),
      duration: duration.includes('min') ? duration.trim() : `${duration.trim()} min`,
      calories: calories.includes('kcal') ? calories.trim() : `${calories.trim()} kcal`,
      category,
      difficulty,
    });

    Alert.alert('Added! 🎉', `"${name}" has been added to your workouts.`, [
      { text: 'Go Back', onPress: () => navigation.goBack() },
    ]);
  };

  const accentColor = categoryColors[category] || '#FF6B35';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backBtnText}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>New Exercise</Text>
              <Text style={styles.headerSub}>Add to your workout list</Text>
            </View>
            <View style={{ width: 44 }} />
          </View>

          {/* Category Preview Banner */}
          <View style={[styles.previewBanner, { borderColor: accentColor + '50', backgroundColor: accentColor + '10' }]}>
            <Text style={styles.previewEmoji}>{categoryEmojis[category]}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.previewCategory, { color: accentColor }]}>{category}</Text>
              <Text style={styles.previewHint}>A unique image will be assigned automatically</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            {/* Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Exercise Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Bench Press"
                placeholderTextColor="#444"
                value={name}
                onChangeText={setName}
                selectionColor={accentColor}
              />
            </View>

            {/* Duration + Calories */}
            <View style={styles.row}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>Duration (min) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 20"
                  placeholderTextColor="#444"
                  value={duration}
                  onChangeText={setDuration}
                  keyboardType="numeric"
                  selectionColor={accentColor}
                />
              </View>
              <View style={{ width: 12 }} />
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>Calories (kcal) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 150"
                  placeholderTextColor="#444"
                  value={calories}
                  onChangeText={setCalories}
                  keyboardType="numeric"
                  selectionColor={accentColor}
                />
              </View>
            </View>

            {/* Category */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.chipGroup}>
                {CATEGORIES.map((cat) => {
                  const color = categoryColors[cat] || '#FF6B35';
                  const isActive = category === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.chip,
                        isActive && { backgroundColor: color + '20', borderColor: color },
                      ]}
                      onPress={() => setCategory(cat)}
                    >
                      <Text style={styles.chipEmoji}>{categoryEmojis[cat]}</Text>
                      <Text style={[styles.chipText, isActive && { color }]}>{cat}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Difficulty */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Difficulty</Text>
              <View style={styles.chipGroup}>
                {DIFFICULTIES.map((diff) => (
                  <TouchableOpacity
                    key={diff}
                    style={[styles.chip, difficulty === diff && styles.chipActiveOrange]}
                    onPress={() => setDifficulty(diff)}
                  >
                    <Text style={[styles.chipText, difficulty === diff && { color: '#FF6B35' }]}>
                      {diff}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Description */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Description *</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Describe how to perform this exercise..."
                placeholderTextColor="#444"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                selectionColor={accentColor}
              />
            </View>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: accentColor, shadowColor: accentColor }]}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>Add Exercise 🚀</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14,
    marginBottom: 16,
  },
  backBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: '#13131E', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#2A2A35',
  },
  backBtnText: { color: '#fff', fontSize: 22, fontWeight: '600' },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFF', letterSpacing: -0.3 },
  headerSub: { fontSize: 12, color: '#555', marginTop: 2 },

  previewBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },
  previewEmoji: { fontSize: 28 },
  previewCategory: { fontSize: 15, fontWeight: '800' },
  previewHint: { fontSize: 11, color: '#555', marginTop: 2 },

  formCard: {
    backgroundColor: '#13131E', borderRadius: 20,
    padding: 18, borderWidth: 1, borderColor: '#1E1E2E', marginBottom: 16,
  },
  fieldGroup: { marginBottom: 18 },
  label: {
    fontSize: 11, color: '#888', fontWeight: '700',
    letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8,
  },
  input: {
    backgroundColor: '#0A0A0F', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    color: '#FFF', fontSize: 14,
    borderWidth: 1, borderColor: '#2A2A35',
  },
  textarea: { height: 100, paddingTop: 12 },
  row: { flexDirection: 'row' },
  chipGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 20, backgroundColor: '#0A0A0F',
    borderWidth: 1, borderColor: '#2A2A35',
  },
  chipEmoji: { fontSize: 13 },
  chipText: { color: '#666', fontSize: 13, fontWeight: '600' },
  chipActiveOrange: { backgroundColor: '#FF6B35' + '20', borderColor: '#FF6B35' },
  submitBtn: {
    paddingVertical: 15, borderRadius: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
    marginBottom: 12,
  },
  submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  cancelBtn: { paddingVertical: 14, alignItems: 'center' },
  cancelBtnText: { color: '#555', fontSize: 15, fontWeight: '600' },
});