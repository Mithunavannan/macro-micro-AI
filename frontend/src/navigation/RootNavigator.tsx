import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import useAuthStore from "../store/useAuthStore";

export default function RootNavigator() {
  const { isLoggedIn } = useAuthStore();

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
