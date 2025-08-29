import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";

export default function HomeScreen({ navigation }: any) {
  const lastWeight = "72.5 kg"; // Example — later connect with weight tracker
  const calories = "1200 / 2500"; // Example — connect with food diary
  const steps = "4,532"; // Example — connect with pedometer
  const sleep = "6h 45m"; // Example — connect with sleep tracker

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏠 Dashboard</Text>

      {/* Weight Tracker */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Last Logged Weight</Text>
        <Text style={styles.cardValue}>{lastWeight}</Text>
      </View>

      {/* Calories */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Calories</Text>
        <Text style={styles.cardValue}>{calories}</Text>
      </View>

      {/* Steps */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Step Count</Text>
        <Text style={styles.cardValue}>{steps}</Text>
      </View>

      {/* Sleep */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sleep Tracking</Text>
        <Text style={styles.cardValue}>{sleep}</Text>
      </View>

      {/* Workouts */}
      <TouchableOpacity
        style={styles.workoutBtn}
        onPress={() => navigation.navigate("FitnessScreen")}
      >
        <Text style={styles.btnText}>💪 Workouts</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.95)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  workoutBtn: {
    width: "90%",
    marginTop: 20,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
