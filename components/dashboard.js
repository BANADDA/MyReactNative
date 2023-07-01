import { useState, useRef, forwardRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  StyleSheet,
  View,
  Platform,
  Pressable,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

import Button from "../elements/Button";
import ImageViewer from "../elements/ImageViewer";
import CircleButton from "../elements/CircleButton";
import IconButton from "../elements/IconButton";
import EmojiPicker from "../elements/EmojiPicker";
import EmojiList from "../elements/EmojiList";
import EmojiSticker from "../elements/EmojiSticker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native";
// import * as tf from "@tensorflow/tfjs";

// import { TFLiteImageRecognition } from "react-native-tensorflow-lite";

const PlaceholderImage = require("../assets/giffy.gif");

const Dashboard = forwardRef(({ navigation }, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();
  const route = useRoute();

  useEffect(() => {
    const { takenImage } = route.params || {};
    if (takenImage) {
      setSelectedImage(takenImage);
      setShowAppOptions(true);
    }
  }, [route.params]);

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  // async function runModel() {
  //   const model = await tf.loadGraphModel("../assets/TomatoModel/tomatoes.h5");

  //   // Load class labels from a .txt file
  //   const classLabelsResponse = await fetch("../assets/TomatoModel/labels.txt");
  //   const classLabelsText = await classLabelsResponse.text();
  //   const classLabels = classLabelsText.split("\n");

  //   // Create a new image element and load the selected image
  //   const image = new Image();
  //   await new Promise((resolve, reject) => {
  //     image.onload = resolve;
  //     image.onerror = reject;
  //     image.src = selectedImage;
  //   });

  //   // Create a canvas and draw the image
  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");
  //   canvas.width = image.width;
  //   canvas.height = image.height;
  //   ctx.drawImage(image, 0, 0);

  //   // Convert the canvas image data to a TensorFlow tensor
  //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //   const { data, width, height } = imageData;
  //   const tensor = tf.tensor3d(data, [height, width, 4], "int32");
  //   const resizedTensor = tf.image.resizeBilinear(tensor, [224, 224]);
  //   const expandedTensor = resizedTensor.expandDims();

  //   // Normalize the tensor values
  //   const normalizedTensor = expandedTensor.div(255.0);

  //   // Run the image through the model and get predictions
  //   const predictions = await model.predict(normalizedTensor).data();

  //   // Map predicted values to class labels
  //   const mappedPredictions = Array.from(predictions).map(
  //     (prediction, index) => {
  //       return {
  //         classLabel: classLabels[index],
  //         confidence: prediction,
  //       };
  //     }
  //   );

  //   console.log(mappedPredictions);
  // }

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(ref, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      domtoimage
        .toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        })
        .then((dataUrl) => {
          let link = document.createElement("a");
          link.download = "1.jpeg";
          link.href = dataUrl;
          link.click();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone! Save to
          get a shareable url.
        </Text>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            ref={imageRef}
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji !== null ? (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          ) : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Closed");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.baseText}>
                  <View style={styles.titleText}>
                    <Text style={styles.heading}>Diagnosis Results</Text>
                  </View>
                  <View style={[styles.titleText1]}>
                    <Text
                      style={{
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      Predicted Class:{" "}
                    </Text>
                    <Text style={styles.class}>Tomato</Text>
                  </View>
                  <View style={[styles.titleText1]}>
                    <Text
                      style={[
                        {
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          overflow: "hidden",
                        },
                      ]}
                    >
                      Confidence Level:{" "}
                    </Text>
                    <Text style={styles.class}>90%</Text>
                  </View>
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <MaterialIcons name="close" size={38} color="white" />
                </Pressable>
              </View>
            </View>
          </Modal>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton
              onPress={() => {
                setModalVisible(true);
                // runModel();
              }}
            />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <>
          <View style={styles.footerContainer1}>
            <Button
              theme="secondary"
              label="Use Camera"
              onPress={() =>
                navigation.navigate("Camera", {
                  setDashboardImage: setSelectedImage,
                })
              }
            />

            <Button
              theme="primary"
              label="Use Gallery"
              onPress={pickImageAsync}
            />
          </View>
          {/* <View style={styles.footerContainer}>
            <Button
              label="Use this photo"
              onPress={() => setShowAppOptions(true)}
            />
          </View> */}
        </>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
});

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    paddingTop: 58,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  baseText: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "yellow",
    textAlign: "center",
  },
  titleText: {
    flex: 1,
    justifyContent: "center",
    padding: "5%",
    paddingLeft: "0%",
    paddingRight: "0%",
  },
  titleText1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "tomato",
    textAlign: "left",
    padding: "5%",
    paddingLeft: "0%",
    paddingRight: "0%",
  },
  class: {
    color: "white",
  },
  footerContainer1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "2%",
    marginTop: "5%",
    marginBottom: "22%",
    paddingBottom: 0,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "rgba(0,0,0,0.85)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    alignContent: "flex-end",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
