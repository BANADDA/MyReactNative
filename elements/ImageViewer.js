import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage !== null
      ? { uri: selectedImage }
      : placeholderImageSource;
  
    return <Image source={imageSource} style={styles.image} />;
  }
  

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 380,
    borderRadius: 18,
  },
});
