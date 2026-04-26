import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useExercises } from '../context/ExerciseContext';

const { height } = Dimensions.get('window');

const categoryColors = {
  Strength: '#FF6B35',
  Cardio: '#00D4FF',
  Core: '#A855F7',
  Flexibility: '#22C55E',
};

const difficultyColor = {
  Beginner: '#22C55E',
  Intermediate: '#F59E0B',
  Advanced: '#EF4444',
  'All Levels': '#A855F7',
};

// ✅ Handles both local (require) and remote (url string) images
const resolveImageSource = (item) => {
  if (item.imageType === 'local') {
    return item.image; // already a require() object
  }
  return { uri: item.image }; // wrap URL string in { uri }
};

export default function ExerciseDetailScreen({ route, navigation }) {
  const { exercise } = route.params;
  const { toggleComplete, exercises } = useExercises();

  // Always read latest state from context (not stale route params)
  const liveExercise = exercises.find((e) => e.id === exercise.id) || exercise;
  const accentColor = categoryColors[liveExercise.category] || '#FF6B35';

  return (
    <View style={styles.container}>
      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image source={resolveImageSource(liveExercise)} style={styles.heroImage} />
        <View style={styles.heroOverlay} />

        <SafeAreaView style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.heroContent}>
          <View style={[styles.categoryChip, { backgroundColor: accentColor + '30', borderColor: accentColor + '60' }]}>
            <Text style={[styles.categoryChipText, { color: accentColor }]}>
              {liveExercise.category}
            </Text>
          </View>
          <Text style={styles.heroTitle}>{liveExercise.name}</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner} showsVerticalScrollIndicator={false}>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderColor: '#FF6B35' + '40' }]}>
            <Text style={styles.statIcon}>⏱</Text>
            <Text style={styles.statValue}>{liveExercise.duration}</Text>
            <Text style={styles.statKey}>Duration</Text>
          </View>
          <View style={[styles.statCard, { borderColor: '#FF6B35' + '40' }]}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{liveExercise.calories}</Text>
            <Text style={styles.statKey}>Calories</Text>
          </View>
          <View style={[styles.statCard, { borderColor: (difficultyColor[liveExercise.difficulty] || '#888') + '40' }]}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={[styles.statValue, { color: difficultyColor[liveExercise.difficulty] || '#888' }]}>
              {liveExercise.difficulty}
            </Text>
            <Text style={styles.statKey}>Level</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this exercise</Text>
          <Text style={styles.description}>{liveExercise.description}</Text>
        </View>

        <View style={styles.divider} />

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pro Tips</Text>
          {[
            'Warm up for 5 minutes before starting',
            'Focus on form over speed or reps',
            'Stay hydrated throughout your workout',
            'Rest 60 seconds between sets',
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={[styles.tipDot, { backgroundColor: accentColor }]} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Complete Button */}
        <TouchableOpacity
          style={[styles.completeBtn, liveExercise.completed && styles.completeBtnDone]}
          onPress={() => toggleComplete(liveExercise.id)}
          activeOpacity={0.85}
        >
          <Text style={[styles.completeBtnText, liveExercise.completed && { color: '#888' }]}>
            {liveExercise.completed ? '✓  Mark as Incomplete' : '🏁  Mark as Completed'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  heroContainer: { height: height * 0.42, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(5,5,10,0.55)' },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 8 },
  backBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  backBtnText: { color: '#fff', fontSize: 22, fontWeight: '600' },
  heroContent: { position: 'absolute', bottom: 24, left: 20, right: 20 },
  categoryChip: {
    alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 20, borderWidth: 1, marginBottom: 8,
  },
  categoryChipText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  heroTitle: { fontSize: 34, fontWeight: '900', color: '#FFF', letterSpacing: -0.8 },
  content: { flex: 1 },
  contentInner: { padding: 20, paddingBottom: 40 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: {
    flex: 1, backgroundColor: '#13131E', borderRadius: 16,
    padding: 14, alignItems: 'center', borderWidth: 1,
  },
  statIcon: { fontSize: 20, marginBottom: 6 },
  statValue: { fontSize: 13, fontWeight: '800', color: '#FFF', textAlign: 'center' },
  statKey: { fontSize: 10, color: '#555', marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#FFF', marginBottom: 10, letterSpacing: -0.2 },
  description: { fontSize: 15, color: '#888', lineHeight: 24 },
  divider: { height: 1, backgroundColor: '#1E1E2E', marginBottom: 20 },
  tipRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  tipDot: { width: 6, height: 6, borderRadius: 3 },
  tipText: { fontSize: 14, color: '#888', flex: 1, lineHeight: 20 },
  completeBtn: {
    backgroundColor: '#FF6B35', paddingVertical: 16, borderRadius: 16,
    alignItems: 'center', marginTop: 8,
    shadowColor: '#FF6B35', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  completeBtnDone: { backgroundColor: '#1E1E2E', shadowOpacity: 0, elevation: 0 },
  completeBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.2 },
});