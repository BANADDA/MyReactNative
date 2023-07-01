// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/homescreen";
import Dashboard from "./components/dashboard";
import CameraScreen from './components/camera';
import { Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "./database/firebase";
import welcome from "./components/welcome";

function MyStack() {

  const Stack = createStackNavigator();

  const handleSignOut = () => {
    signOut(auth)  
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#7CFC00",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "black",
          fontSize: 25
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: "Tomato App" }} />
      {/* <Stack.Screen
        name="Welcone"
        component={WelcomeScreen}
        // options={[{ title: "Camera" }, { headerLeft: null }]}
      /> */}
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={[{ title: "Login" }, { headerLeft: null }]}
      />
      
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: "Dashboard" }} />
      {/* <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
          headerLeft: null,
          headerRight: () => (
            <Button color="	#8FBC8F" title="Logout" onPress={handleSignOut} size={23} style={{ marginLeft: "20%" }} />
          ),
          headerTitleAlign: 'left',
          headerTitle: props => (
            <Text style={{
              textAlign: 'left',
              fontSize: 25, color: 'black', fontWeight: 'bold',
            }}>
              {props.children}
            </Text>
          ),
        }}
      /> */}
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={[{ title: "Camera" }, { headerLeft: null }]}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
