import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function Home({ navigation }) {
  const signupPressed = () => {
    navigation.navigate("Signup");
  };

  const loginPressed = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.container}>
          {/* <Text style={styles.title}>Tomato Disease Diagnosis</Text> */}
          <Text style={styles.paragraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
          <TouchableOpacity onPress={signupPressed}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={loginPressed}>
            <Text style={styles.login}>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 200,
    height: 140,
    alignSelf: "center",
    marginTop: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 5,
  },
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "10%",
    textAlign: "center",
  },
  title: {
    margin: 24,
    marginBottom: 5,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  text: {
    color: "white",
    marginTop: "-25%",
    marginLeft: "20%",
  },
  signup: {
    backgroundColor: "white",
    color: "#3A59FF",
    width: "75%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: "11%",
    padding: "2%",
    fontSize: 27,
    marginTop: 20,
    marginBottom: 20,
  },
  login: {
    backgroundColor: "#3A59FF",
    color: "white",
    width: "75%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: "11%",
    padding: "2%",
    fontSize: 27,
    marginBottom: 70,
  },
});
