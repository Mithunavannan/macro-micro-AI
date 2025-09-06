import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import {
  CameraView,
  CameraType,
  Camera,
} from "expo-camera"; // ✅ Correct imports
import type { CameraCapturedPicture } from "expo-camera";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [foodDetails, setFoodDetails] = useState<any>(null);

  // ✅ Proper camera ref (use CameraView, not Camera)
  const cameraRef = useRef<CameraView | null>(null);

  // ✅ Ask for camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true);

      const photo: CameraCapturedPicture =
        await cameraRef.current.takePictureAsync({ base64: true });

      setCapturedImage(photo.uri);

      try {
        const response = await fetch("http://YOUR_BACKEND_API/food-detect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: photo.base64 }),
        });

        const data = await response.json();
        setFoodDetails(data);
      } catch (error) {
        console.error("Detection failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const saveToDiary = async () => {
    if (!foodDetails) return;

    try {
      await fetch("http://YOUR_BACKEND_API/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodDetails),
      });
      alert("Food saved to diary!");
      setCapturedImage(null);
      setFoodDetails(null);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!capturedImage ? (
        <>
          {/* ✅ Camera preview uses CameraView */}
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing= "back" // ✅ use "facing" instead of "type"
          />

          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={{ color: "black", fontWeight: "bold" }}>Snap</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ScrollView style={styles.resultContainer}>
          <Image source={{ uri: capturedImage }} style={styles.preview} />

          {loading ? (
            <ActivityIndicator size="large" color="blue" style={{ marginTop: 16 }} />
          ) : foodDetails ? (
            <View style={styles.details}>
              <Text style={styles.foodName}>{foodDetails.name}</Text>
              <Text>Calories: {foodDetails.calories}</Text>
              <Text>Macros: {JSON.stringify(foodDetails.macros)}</Text>
              <Text>Micros: {JSON.stringify(foodDetails.micros)}</Text>

              <View style={{ marginTop: 12 }}>
                <Button title="Save to Diary" onPress={saveToDiary} color="#2563EB" />
              </View>
            </View>
          ) : (
            <Text style={styles.errorText}>Processing failed. Try again.</Text>
          )}

          <View style={{ marginTop: 10 }}>
            <Button
              title="Retake"
              onPress={() => {
                setCapturedImage(null);
                setFoodDetails(null);
              }}
              color="#6B7280"
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  camera: { flex: 1 },
  captureButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 50,
  },
  resultContainer: { flex: 1, backgroundColor: "#F9FAFB" },
  preview: { width: "100%", height: 250 },
  details: { padding: 16 },
  foodName: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  errorText: { textAlign: "center", marginTop: 16, color: "red" },
});
