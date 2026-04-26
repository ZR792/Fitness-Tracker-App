# Fitness Tracker App

A mobile fitness tracking app built with React Native and Expo as part of the MAD course assignment.

## Student Info
- **Name:** [Zainab Ramzan]
- **Student ID:** [BSE-23F-018]
- **Course:** Mobile Application Development (MAD)

## Features
- Browse exercises by category (Strength, Cardio, Core, Flexibility)
- View detailed exercise info with images
- Add custom exercises
- Mark exercises as completed
- Daily motivational quotes

## File Structure
``
FitnessTracker/
├── App.js                        → Entry point & navigation
├── context/
│   └── ExerciseContext.js        → Global state for exercises
├── screens/
│   ├── HomeScreen.js             → Exercise list with search & filter
│   ├── ExerciseDetailScreen.js   → Full detail view of an exercise
│   ├── AddExerciseScreen.js      → Form to add a custom exercise
│   └── QuotesScreen.js           → Motivational quotes screen
├── assets/                       → Local exercise images
└── app.json                      → Expo config
``

## How to Run
1. Clone the repository
2. Run `npm install`
3. Run `npx expo start`
4. Scan QR code with Expo Go app

##  Links

**GitHub:** [Fitness Tracker App](https://github.com/ZR792/Fitness-Tracker-App.git)
**APK:** [APK Build File](https://expo.dev/accounts/zainab.r/projects/FitnessTracker/builds/e2ea2c03-3ae8-40c4-b4af-ca0d9627c504)
