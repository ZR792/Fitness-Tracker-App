import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Share,
} from 'react-native';

export default function QuotesScreen({ navigation }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://api.quotable.io/random?tags=motivational,inspirational');
      const data = await res.json();
      setQuote(data);
    } catch (e) {
      // fallback quotes if API fails
      const fallback = [
        { content: "The only bad workout is the one that didn't happen.", author: 'Unknown' },
        { content: "Take care of your body. It's the only place you have to live.", author: 'Jim Rohn' },
        { content: "Success usually comes to those who are too busy to be looking for it.", author: 'Henry David Thoreau' },
        { content: "All progress takes place outside the comfort zone.", author: 'Michael John Bobak' },
        { content: "If it doesn't challenge you, it doesn't change you.", author: 'Fred DeVito' },
      ];
      setQuote(fallback[Math.floor(Math.random() * fallback.length)]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleShare = async () => {
    if (!quote) return;
    await Share.share({
      message: `"${quote.content}" — ${quote.author}`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Motivation</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />

        <Text style={styles.tagline}>YOUR DAILY FUEL</Text>

        <View style={styles.quoteCard}>
          {loading ? (
            <ActivityIndicator color="#FF6B35" size="large" />
          ) : quote ? (
            <>
              <Text style={styles.quoteMarks}>"</Text>
              <Text style={styles.quoteText}>{quote.content}</Text>
              <View style={styles.quoteDivider} />
              <Text style={styles.quoteAuthor}>— {quote.author}</Text>
            </>
          ) : null}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.refreshBtn} onPress={fetchQuote} disabled={loading}>
            <Text style={styles.refreshBtnText}>
              {loading ? 'Loading...' : '🔄  New Quote'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareBtn} onPress={handleShare} disabled={!quote}>
            <Text style={styles.shareBtnText}>📤  Share</Text>
          </TouchableOpacity>
        </View>

        {/* Motivational chips */}
        <View style={styles.chipsRow}>
          {['💪 Keep Going', '🏆 You Got This', '🔥 Stay Strong'].map((t) => (
            <View key={t} style={styles.motivationChip}>
              <Text style={styles.motivationChipText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#13131E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A35',
  },
  backBtnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FF6B35',
    opacity: 0.04,
    top: -50,
    right: -80,
  },
  decorCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#A855F7',
    opacity: 0.06,
    bottom: 60,
    left: -60,
  },
  tagline: {
    fontSize: 11,
    color: '#FF6B35',
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 24,
  },
  quoteCard: {
    backgroundColor: '#13131E',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    borderWidth: 1,
    borderColor: '#1E1E2E',
    minHeight: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteMarks: {
    fontSize: 72,
    color: '#FF6B35',
    fontWeight: '900',
    lineHeight: 60,
    alignSelf: 'flex-start',
    marginBottom: 8,
    opacity: 0.6,
  },
  quoteText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  quoteDivider: {
    width: 40,
    height: 2,
    backgroundColor: '#FF6B35',
    borderRadius: 2,
    marginVertical: 16,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    width: '100%',
  },
  refreshBtn: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  refreshBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  shareBtn: {
    flex: 1,
    backgroundColor: '#13131E',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A35',
  },
  shareBtnText: {
    color: '#aaa',
    fontWeight: '700',
    fontSize: 15,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  motivationChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#13131E',
    borderWidth: 1,
    borderColor: '#2A2A35',
  },
  motivationChipText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
  },
});