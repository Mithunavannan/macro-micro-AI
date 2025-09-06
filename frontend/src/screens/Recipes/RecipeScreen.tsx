// src/screens/Recipes/RecipeScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";

export default function RecipeScreen({ navigation }: any) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [calories, setCalories] = useState("");
  const [macros, setMacros] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Dummy saved recipes
  const [savedRecipes, setSavedRecipes] = useState<string[]>([
    "High Protein Omelette",
    "Grilled Chicken Salad",
    "Vegan Smoothie",
  ]);

  const generateAIRecipe = () => {
    setModalVisible(true);
  };

  const openCamera = () => {
    navigation.navigate("CameraScreen"); // navigates to camera screen
  };

  const addRecipe = () => {
    if (aiPrompt.trim() !== "") {
      setSavedRecipes([...savedRecipes, aiPrompt]);
      setAiPrompt("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Generator</Text>

      {/* AI Recipe Generator */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>AI Recipe Generator</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ingredients..."
          placeholderTextColor="#aaa"
          value={aiPrompt}
          onChangeText={setAiPrompt}
        />
        <TextInput
          style={styles.input}
          placeholder="Target Calories (e.g. 500)"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
        />
        <TextInput
          style={styles.input}
          placeholder="Macros (e.g. 40g P / 50g C / 10g F)"
          placeholderTextColor="#aaa"
          value={macros}
          onChangeText={setMacros}
        />
        <TouchableOpacity style={styles.button} onPress={generateAIRecipe}>
          <Text style={styles.buttonText}>Generate Recipe</Text>
        </TouchableOpacity>
      </View>

      {/* Camera-based Recipe */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Generate from Camera</Text>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Saved Recipes */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Saved Recipes</Text>
        <FlatList
          data={savedRecipes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.recipeItem}>• {item}</Text>}
        />
        <TouchableOpacity style={styles.saveButton} onPress={addRecipe}>
          <Text style={styles.saveButtonText}>+ Save Current Recipe</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for AI recipe results */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>AI Generated Recipe</Text>
            <Text style={styles.recipeItem}>
              (Here we’ll show AI-generated recipe based on: {aiPrompt}, {calories} kcal, {macros})
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
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
    backgroundColor: "rgba(0,0,0,0.95)",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.7)",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "black",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: "white",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  recipeItem: {
    color: "white",
    fontSize: 16,
    marginVertical: 3,
  },
  saveButton: {
    backgroundColor: "rgba(0,0,0,0.85)",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
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
    width: "85%",
    borderColor: "red",
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "red",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginTop: 15,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});
