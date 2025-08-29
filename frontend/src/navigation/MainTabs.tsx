import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import DiaryScreen from "../screens/Diary/DiaryScreen";
import RecipeScreen from "../screens/Recipes/RecipeScreen";
import CameraScreen from "../screens/Camera/CameraScreen";
import FitnessScreen from "../screens/Fitness/FitnessScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Diary"
        component={DiaryScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipeScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="camera" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Fitness"
        component={FitnessScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="fitness" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
}
