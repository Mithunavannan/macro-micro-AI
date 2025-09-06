import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Button, StyleSheet } from "react-native";

export default function FitnessScreen() {
  const [steps, setSteps] = useState("");
  const [jogDistance, setJogDistance] = useState("");
  const [jogTime, setJogTime] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const handleSave = () => {
    const fitnessLog = {
      steps,
      jogDistance,
      jogTime,
      exerciseType,
      reps,
      weight,
    };
    console.log("Saved log:", fitnessLog);
    alert("Fitness log saved!");
    // TODO: connect this to backend/DB
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Fitness Log</Text>

      {/* Walking Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Walking</Text>
        <TextInput
          placeholder="Steps walked"
          value={steps}
          onChangeText={setSteps}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      {/* Jogging / Running Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Jogging / Running</Text>
        <TextInput
          placeholder="Distance (km)"
          value={jogDistance}
          onChangeText={setJogDistance}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Time (minutes)"
          value={jogTime}
          onChangeText={setJogTime}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      {/* Weight Training Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Weight Training</Text>
        <TextInput
          placeholder="Exercise Type (e.g., Bench Press)"
          value={exerciseType}
          onChangeText={setExerciseType}
          style={styles.input}
        />
        <TextInput
          placeholder="Reps"
          value={reps}
          onChangeText={setReps}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.saveButton}>
        <Button title="Save Log" onPress={handleSave} color="#2563EB" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#F9FAFB",
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 10,
  },
});
