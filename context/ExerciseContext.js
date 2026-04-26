import React, { createContext, useContext, useState } from 'react';

const ExerciseContext = createContext();

// ✅ Correct paths — images are directly in assets/ (no images/ subfolder)
const localImages = {
  strength1:    require('../assets/strength1.jpg'),
  strength2:    require('../assets/strength2.jpg'),
  cardio1:      require('../assets/cardio1.jpg'),
  cardio2:      require('../assets/cardio2.jpg'),
  core1:        require('../assets/core1.jpg'),
  core2:        require('../assets/core2.jpg'),
  flexibility1: require('../assets/flexibility1.jpg'),
  flexibility2: require('../assets/flexibility2.jpg'),
};

// Online fallback pool — used when local images run out
const onlineImagePool = {
  Strength: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
  ],
  Cardio: [
    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=80',
    'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=600&q=80',
    'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=600&q=80',
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&q=80',
  ],
  Core: [
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    'https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=600&q=80',
    'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80',
    'https://images.unsplash.com/photo-1598971639058-fab3c3109a3d?w=600&q=80',
  ],
  Flexibility: [
    'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&q=80',
    'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&q=80',
    'https://images.unsplash.com/photo-1510894347713-fc3dc6166086?w=600&q=80',
    'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=600&q=80',
  ],
};

// Local image queue per category — used in order, 2 per category
const localImageQueue = {
  Strength:    ['strength1', 'strength2'],
  Cardio:      ['cardio1', 'cardio2'],
  Core:        ['core1', 'core2'],
  Flexibility: ['flexibility1', 'flexibility2'],
};

const addedCount = { Strength: 0, Cardio: 0, Core: 0, Flexibility: 0 };

const getNextImage = (category) => {
  const count = addedCount[category] || 0;
  addedCount[category] = count + 1;

  const localQueue = localImageQueue[category] || [];

  if (count < localQueue.length) {
    const key = localQueue[count];
    return { type: 'local', source: localImages[key] };
  } else {
    const pool = onlineImagePool[category] || onlineImagePool['Strength'];
    const onlineIndex = (count - localQueue.length) % pool.length;
    return { type: 'remote', source: pool[onlineIndex] };
  }
};

const defaultExercises = [
  {
    id: '1',
    name: 'Push-Ups',
    category: 'Strength',
    duration: '15 min',
    calories: '120 kcal',
    difficulty: 'Beginner',
    description:
      'A classic upper-body exercise that targets your chest, shoulders, and triceps. Keep your core tight and body in a straight line throughout the movement.',
    imageType: 'local',
    image: localImages['strength1'],
    completed: false,
  },
  {
    id: '2',
    name: 'Running',
    category: 'Cardio',
    duration: '30 min',
    calories: '300 kcal',
    difficulty: 'Intermediate',
    description:
      'One of the most effective cardio exercises. Running improves cardiovascular health, burns calories, and boosts mental well-being. Start slow and build your pace gradually.',
    imageType: 'local',
    image: localImages['cardio1'],
    completed: false,
  },
  {
    id: '3',
    name: 'Plank',
    category: 'Core',
    duration: '10 min',
    calories: '80 kcal',
    difficulty: 'Beginner',
    description:
      'The plank is a full-body isometric exercise that primarily targets your core muscles. Focus on keeping your hips level and breathing steadily throughout.',
    imageType: 'local',
    image: localImages['core1'],
    completed: false,
  },
  {
    id: '4',
    name: 'Squats',
    category: 'Strength',
    duration: '20 min',
    calories: '200 kcal',
    difficulty: 'Beginner',
    description:
      'Squats are a compound movement that works your quads, hamstrings, glutes, and core. Keep your chest up and weight in your heels for proper form.',
    imageType: 'local',
    image: localImages['strength2'],
    completed: false,
  },
  {
    id: '5',
    name: 'Yoga Flow',
    category: 'Flexibility',
    duration: '45 min',
    calories: '150 kcal',
    difficulty: 'All Levels',
    description:
      'A gentle yoga flow to improve flexibility, reduce stress, and enhance mindfulness. Focus on your breathing and move with intention through each pose.',
    imageType: 'local',
    image: localImages['flexibility1'],
    completed: false,
  },
  {
    id: '6',
    name: 'Pull-Ups',
    category: 'Strength',
    duration: '15 min',
    calories: '130 kcal',
    difficulty: 'Advanced',
    description:
      'Pull-ups are one of the best exercises for building back and bicep strength. Use a full range of motion, starting from a dead hang and pulling your chin above the bar.',
    imageType: 'remote',
    image: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=600&q=80',
    completed: false,
  },
  {
    id: '7',
    name: 'Cycling',
    category: 'Cardio',
    duration: '40 min',
    calories: '350 kcal',
    difficulty: 'Intermediate',
    description:
      'Cycling is a low-impact cardio exercise great for building endurance and burning calories. Keep a steady cadence and adjust resistance to match your fitness level.',
    imageType: 'local',
    image: localImages['cardio2'],
    completed: false,
  },
  {
    id: '8',
    name: 'Stretching',
    category: 'Flexibility',
    duration: '20 min',
    calories: '60 kcal',
    difficulty: 'Beginner',
    description:
      'A full-body stretching routine to improve flexibility, reduce muscle tension, and aid recovery. Hold each stretch for 20-30 seconds without bouncing.',
    imageType: 'local',
    image: localImages['flexibility2'],
    completed: false,
  },
  {
    id: '9',
    name: 'Crunches',
    category: 'Core',
    duration: '15 min',
    calories: '90 kcal',
    difficulty: 'Beginner',
    description:
      'Crunches are a foundational core exercise targeting your abdominal muscles. Focus on controlled movement and avoid pulling on your neck.',
    imageType: 'local',
    image: localImages['core2'],
    completed: false,
  },
];

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState(defaultExercises);

  const addExercise = (exercise) => {
    const imgData = getNextImage(exercise.category);
    const newExercise = {
      ...exercise,
      id: Date.now().toString(),
      completed: false,
      imageType: imgData.type,
      image: imgData.source,
    };
    setExercises((prev) => [newExercise, ...prev]);
  };

  const toggleComplete = (id) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, completed: !ex.completed } : ex))
    );
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addExercise, toggleComplete }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => useContext(ExerciseContext);