// const tf = require("@tensorflow/tfjs-node");
// const fs = require("fs");
// const { decode } = require('base64-arraybuffer');
// const { fetch } = require('react-native');

// // Classes
// const classes = ["Tomato_healthy", "Tomato_mosaic_virus"];

// const loadModel = async () => {
//   const modelJSON = JSON.parse(fs.readFileSync("../assets/model.json"));
//   const modelWeights = fs.readFileSync("../assets/group1.bin");
//   const model = await tf.loadLayersModel(
//     tf.io.fromMemory(modelJSON, modelWeights)
//   ).catch((e) => {
//     console.log("[LOADING ERROR] info:", e);
//   });
//   return model;
// };

// const transformImageToTensor = async (uri) => {
//   const response = await fetch(uri);
//   const data = await response.arrayBuffer();

//   const imgBuffer = decode(data);
//   let imgTensor = tf.node.decodeImage(imgBuffer, 3);
//   const scalar = tf.scalar(255);
//   // Resize the image
//   imgTensor = tf.image.resizeBilinear(imgTensor, [224, 224]);
//   // Normalize; if a normalization layer is in the model, this step can be skipped
//   const tensorScaled = imgTensor.div(scalar);
//   // Final shape of the tensor
//   const img = tf.reshape(tensorScaled, [1, 224, 224, 3]);
//   return img;
// };


// const getPredictions = async (imagesTensor) => {
//   const model = await loadModel();
//   // Cast output prediction to tensor
//   const predictionsData = model.predict(imagesTensor);
//   let pred = tf.split(predictionsData, 1); // Split by batch size

//   // Get class probabilities
//   const probabilities = await pred[0].array();

//   // Get the predicted class index
//   const predictedClassIndex = tf.argMax(predictions[0], 1).arraySync()[0];

//   // Return the predicted class and its probability
//   return {
//     class: classes[predictedClassIndex],
//     probability: probabilities[0][predictedClassIndex],
//   };
// };

// module.exports = {
//   getPredictions,
//   transformImageToTensor,
//   loadModel,
// };
