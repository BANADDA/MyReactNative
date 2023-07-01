import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TFLiteImageRecognition } from 'react-native-tensorflow-lite';

const MyImageClassifier = () => {
  const [result, setResult] = useState({});

  useEffect(() => {
    const initializeClassifier = async () => {
      try {
        const classifier = new TFLiteImageRecognition({
          model: '../assets/TomatoModel/tomato_model.tflite', // Your tflite model in assets folder.
          labels: '../assets/TomatoModel/labels.txt', // Your label file
        });
        classifyImage(classifier, '../assests/tomato.jpeg'); // Your image path.

        return () => {
          classifier.close(); // Must close the classifier when destroying or unmounting component to release object.
        };
      } catch (err) {
        alert(err);
      }
    };

    initializeClassifier();
  }, []);

  const classifyImage = async (classifier, imagePath) => {
    try {
      const results = await classifier.recognize({
        image: imagePath, // Your image path.
        inputShape: 224, // the input shape of your model. If none given, it will be default to 224.
      });

      const resultObj = {
        name: 'Name: ' + results[0].name,
        confidence: 'Confidence: ' + results[0].confidence,
        inference: 'Inference: ' + results[0].inference + 'ms',
      };
      setResult(resultObj);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View>
      <View>
        <Text >{result.name}</Text>
        <Text >{result.confidence}</Text>
        <Text >{result.inference}</Text>
      </View>
    </View>
  );
};

export default MyImageClassifier;
