import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";

export default function Signup({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateInputVal = (val, prop) => {
    switch (prop) {
      case "displayName":
        setDisplayName(val);
        break;
      case "email":
        setEmail(val);
        break;
      case "password":
        setPassword(val);
        break;
    }
  };

  const registerUser = async () => {
    if (email === "" || password === "" || displayName === "") {
      Alert.alert("Enter details to signup!");
    } else {
      setIsLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
          displayName
        );
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Login");
      } catch (error) {
        if (error.code == "auth/email-already-in-use") {
          alert("The email address is already in use");
        } else if (error.code == "auth/invalid-email") {
          alert("The email address is not valid.");
        } else if (error.code == "auth/operation-not-allowed") {
          alert("Operation not allowed.");
        } else if (error.code == "auth/weak-password") {
          alert("The password is too weak.");
        }
      }
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={displayName}
          onChangeText={(val) => updateInputVal(val, "displayName")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={email}
          onChangeText={(val) => updateInputVal(val, "email")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(val) => updateInputVal(val, "password")}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button color="#3740FE" title="Signup" onPress={registerUser} />
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("Login")}
        >
          Already Registered? Click here to login
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: "rgba(240, 240, 240, 0.85)",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "55%",
    padding: 35,
  },
  inputStyle: {
    width: "100%",
    fontWeight: "bold",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
