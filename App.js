import React from "react";
import { Platform } from "react-native";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Importa as telas
import Login from "./screens/Login";
import Cadastro from "./screens/Cadastro";
import Home from "./screens/Home";
import Ecopoints from "./screens/Ecopoints";
import ChatScreen from "./screens/Chat";
import Perfil from "./screens/Perfil";
import UserListScreen from "./screens/UserListScreen";
import Mudanca from "./screens/Mudanca";
import CreatePost from "./screens/CreatePost";
import { PostProvider } from "./screens/PostContext";
import RewardsScreen from "./screens/components/RewardsScreen";
import QrScannerScreen from "./screens/components/QrScannerScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação de chat usando Stack Navigator
function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserList"
        component={UserListScreen}
        options={{
          title: "Usuários",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#215678" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: "Chat",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#215678" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          tabBarStyle: { display: "none" },
        }}
      />
    </Stack.Navigator>
  );
}

// Configuração do Tab Navigator
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#b0c4de",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#215678",
          borderTopWidth: 0,
          height: Platform.OS === "ios" ? 80 : 60,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          borderRadius: 20,
          bottom: 10,
          left: 10,
          right: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Ecopoints") iconName = focused ? "map" : "map-outline";
          else if (route.name === "QrScanner") iconName = focused ? "qr-code" : "qr-code-outline";
          else if (route.name === "Rewards") iconName = focused ? "wallet" : "wallet-outline";
          else if (route.name === "ChatStack") iconName = focused ? "chatbubble" : "chatbubble-outline";
          else if (route.name === "Perfil") iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size + 5} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Ecopoints" component={Ecopoints} options={{ headerShown: false }} />
      <Tab.Screen name="QrScanner" component={QrScannerScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Rewards" component={RewardsScreen} options={{ headerShown: false }} />
      <Tab.Screen
        name="ChatStack"
        component={ChatStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Chat") return { display: "none" };
            return {
              position: "absolute",
              backgroundColor: "#215678",
              borderTopWidth: 0,
              bottom: 14,
              left: 14,
              right: 14,
              elevation: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              borderRadius: 20,
              height: Platform.OS === "ios" ? 80 : 60,
            };
          })(route),
        })}
      />
      <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// Componente principal
export default function App() {
  return (
    <PostProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{
              title: "Cadastro",
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#215678" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
          <Stack.Screen
            name="Mudanca"
            component={Mudanca}
            options={{
              title: "Alterar Senha",
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#215678" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
          <Stack.Screen name="HomeTabs" component={AppTabs} options={{ headerShown: false }} />
          <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={{
              title: "Criar Postagem",
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#215678" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PostProvider>
  );
}
