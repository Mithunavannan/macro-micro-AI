// src/screens/Diary/DiaryScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from "react-native";

const defaultMeals = ["Breakfast", "Lunch", "Dinner", "Snacks"];

export default function DiaryScreen() {
  const [meals, setMeals] = useState(defaultMeals);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openAddFood = (meal: string) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };

  const addCustomMeal = () => {
    const newMeal = `Meal ${meals.length + 1}`;
    setMeals([...meals, newMeal]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Diary</Text>

      <ScrollView>
        {meals.map((meal, index) => (
          <View key={index} style={styles.mealContainer}>
            <Text style={styles.mealTitle}>{meal}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => openAddFood(meal)}>
              <Text style={styles.addText}>+ Add Food</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addMealButton} onPress={addCustomMeal}>
          <Text style={styles.addText}>+ Add Meal</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for food search */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Food to {selectedMeal}</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search food..."
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)", // faded black
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
  mealContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "rgba(0,0,0,0.85)",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  addText: {
    color: "white",
    fontSize: 16,
  },
  addMealButton: {
    backgroundColor: "rgba(0,0,0,0.85)",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    borderColor: "red",
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: "black",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: "white",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "red",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});
