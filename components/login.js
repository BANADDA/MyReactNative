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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userLogin = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.navigate("Dashboard");
          console.log(user);
        })
        .catch((error) => {
          if (error.code == "auth/missing-password") {
            alert("The password is missing. Please try again");
          } else if (error.code == "auth/missing-email") {
            alert("The email is missing. Please try again");
          } else if (error.code == "auth/operation-not-allowed") {
            alert("Operation not allowed.");
          } else if (error.code == "auth/invalid-email") {
            alert("The email address is not valid.");
          } 
          // else if (errorCode === "auth/wrong-password") {
          //   console.log("Wrong password");
          //   alert("Wrong password.");
          // }
        });
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
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button color="#3740FE" title="Signin" onPress={userLogin} />
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("Signup")}
        >
          Don't have an account? Click here to signup
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
