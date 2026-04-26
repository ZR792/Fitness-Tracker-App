import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { useExercises } from '../context/ExerciseContext';

const CATEGORIES = ['All', 'Strength', 'Cardio', 'Core', 'Flexibility'];

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

export default function HomeScreen({ navigation }) {
  const { exercises } = useExercises();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = exercises.filter((ex) => {
    const matchCat = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const completedCount = exercises.filter((e) => e.completed).length;

  const renderExercise = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
      activeOpacity={0.85}
    >
      <Image source={resolveImageSource(item)} style={styles.cardImage} />
      <View style={styles.cardOverlay} />
      {item.completed && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>✓ Done</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <View style={styles.cardTop}>
          <View style={[styles.categoryTag, { backgroundColor: (categoryColors[item.category] || '#888') + '30' }]}>
            <Text style={[styles.categoryTagText, { color: categoryColors[item.category] || '#888' }]}>
              {item.category}
            </Text>
          </View>
          <View style={[styles.difficultyTag, { backgroundColor: (difficultyColor[item.difficulty] || '#888') + '25' }]}>
            <Text style={[styles.difficultyText, { color: difficultyColor[item.difficulty] || '#888' }]}>
              {item.difficulty}
            </Text>
          </View>
        </View>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.cardMeta}>
          <Text style={styles.metaText}>⏱ {item.duration}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>🔥 {item.calories}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.headerTitle}>Your Workouts</Text>
        </View>
        <TouchableOpacity style={styles.quoteBtn} onPress={() => navigation.navigate('Quotes')}>
          <Text style={styles.quoteBtnText}>💬</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{exercises.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#22C55E' }]}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#FF6B35' }]}>{exercises.length - completedCount}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          placeholderTextColor="#555"
          value={search}
          onChangeText={setSearch}
          selectionColor="#FF6B35"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearSearch}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          bounces={false}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryBtn, selectedCategory === cat && styles.categoryBtnActive]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.75}
            >
              <Text style={[styles.categoryBtnText, selectedCategory === cat && styles.categoryBtnTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Exercise List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderExercise}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏋️</Text>
            <Text style={styles.emptyText}>No exercises found</Text>
            <Text style={styles.emptySubText}>Try a different category or search</Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddExercise')} activeOpacity={0.85}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 14, paddingBottom: 6,
  },
  greeting: { fontSize: 13, color: '#666', fontWeight: '500' },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#FFF', letterSpacing: -0.5, marginTop: 2 },
  quoteBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: '#1A1A25', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#2A2A35',
  },
  quoteBtnText: { fontSize: 18 },
  statsBar: {
    flexDirection: 'row', marginHorizontal: 20, marginTop: 12,
    backgroundColor: '#13131E', borderRadius: 14,
    paddingVertical: 14, paddingHorizontal: 8,
    borderWidth: 1, borderColor: '#1E1E2E',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#FFF' },
  statLabel: { fontSize: 10, color: '#555', marginTop: 2, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },
  statDivider: { width: 1, backgroundColor: '#2A2A35', marginVertical: 4 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, marginTop: 12,
    backgroundColor: '#13131E', borderRadius: 12,
    paddingHorizontal: 12, height: 44,
    borderWidth: 1, borderColor: '#1E1E2E',
  },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: { flex: 1, height: 44, color: '#FFF', fontSize: 14 },
  clearSearch: { color: '#555', fontSize: 14, paddingHorizontal: 4 },
  categoriesWrapper: { height: 52, marginTop: 12, justifyContent: 'center' },
  categoriesContainer: { paddingHorizontal: 20, alignItems: 'center' },
  categoryBtn: {
    height: 34, paddingHorizontal: 16, borderRadius: 17,
    backgroundColor: '#13131E', marginRight: 8,
    borderWidth: 1, borderColor: '#2A2A35',
    justifyContent: 'center', alignItems: 'center',
  },
  categoryBtnActive: { backgroundColor: '#FF6B35', borderColor: '#FF6B35' },
  categoryBtnText: { color: '#777', fontSize: 13, fontWeight: '600' },
  categoryBtnTextActive: { color: '#FFF' },
  listContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 100, gap: 12 },
  card: { borderRadius: 18, overflow: 'hidden', height: 190, backgroundColor: '#13131E' },
  cardImage: { width: '100%', height: '100%', position: 'absolute' },
  cardOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(5,5,10,0.55)' },
  completedBadge: {
    position: 'absolute', top: 12, right: 12,
    backgroundColor: '#22C55E', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  completedBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  cardContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14 },
  cardTop: { flexDirection: 'row', gap: 6, marginBottom: 6 },
  categoryTag: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  categoryTagText: { fontSize: 10, fontWeight: '700' },
  difficultyTag: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  difficultyText: { fontSize: 10, fontWeight: '700' },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#FFF', letterSpacing: -0.3 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 3, gap: 5 },
  metaText: { fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: '500' },
  metaDot: { color: '#555' },
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyIcon: { fontSize: 44, marginBottom: 10 },
  emptyText: { color: '#555', fontSize: 16, fontWeight: '700' },
  emptySubText: { color: '#3A3A3A', fontSize: 13, marginTop: 4 },
  fab: {
    position: 'absolute', bottom: 28, right: 22,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#FF6B35', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45, shadowRadius: 14, elevation: 10,
  },
  fabText: { fontSize: 30, color: '#fff', lineHeight: 34, fontWeight: '300' },
});