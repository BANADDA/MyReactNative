import { useState, useRef } from "react";
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
import { Camera } from "expo-camera";

import Button from "../elements/Button";
import ImageViewer from "../elements/ImageViewer";
import CircleButton from "../elements/CircleButton";
import IconButton from "../elements/IconButton";
import EmojiPicker from "../elements/EmojiPicker";
import EmojiList from "../elements/EmojiList";
import EmojiSticker from "../elements/EmojiSticker";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const PlaceholderImage = require("../assets/giffy.gif");

export default function Dashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

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
        const localUri = await captureRef(imageRef, {
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
          link.download = "sticker-smash.jpeg";
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
        Change code in the editor and watch it change on your phone! Save to get a shareable url.
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
            presentationStyle="pageSheet"
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
                    <Text style={{flexDirection: 'row', flexWrap: 'nowrap', overflow: 'hidden'}}>Predicted Class: </Text>
                    <Text style={styles.class}>Tomato</Text>
                  </View>
                  <View style={[styles.titleText1]}>
                    <Text style={[{flexDirection: 'row', flexWrap: 'nowrap', overflow: 'hidden'}]}>Confidence Level: </Text>
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
            <CircleButton onPress={() => setModalVisible(true)} />
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
              onPress={() => navigation.navigate("Camera")}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    paddingTop: 58,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  baseText: {
    fontFamily: "Cochin",
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
    paddingLeft: '0%',
    paddingRight: '0%',
  },
  titleText1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "tomato",
    textAlign: "left",
    padding: "5%",
    paddingLeft: '0%',
    paddingRight: '0%',
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

// import { useState } from 'react';
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View} from "react-native";
// import Button from '.../elements/Button';
// import ImageViewer from '.../elements/ImageViewer';
// import * as ImagePicker from 'expo-image-picker';
// import { Camera } from 'expo-camera';

// const PlaceholderImage = require("../assets/background-image.png");

// export default function Dashboard() {
//   //Gallery
//   const [selectedImage, setSelectedImage] = useState(null);

//   const pickImageAsync = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//       // console.log(result.assets[0].uri)
//     } else {
//       alert('You did not select any image.');
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         <ImageViewer
//           placeholderImageSource={PlaceholderImage}
//           selectedImage={selectedImage}
//         />
//       </View>
//       <View style={styles.footerContainer1}>
//         <Button label="Use this photo" />
//       </View>
//       <View style={styles.footerContainer}>
//         <Button theme="secondary" label="Use Camera"
//           onPress={() => navigation.navigate("Camera")} />
//         <Button theme="primary" label="Use Gallery" onPress={pickImageAsync} />
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//     alignItems: 'center',
//   },
//   imageContainer: {
//     flex: 1,
//     paddingTop: 58,
//   },
//   footerContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     margin: '20%',
//     marginTop: '10%',
//   },
//   footerContainer1: {
//     flex: 1,
//     alignItems: 'center',
//     margin: '20%',
//     marginBottom: '0%',
//   }
// });
