
import React, { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Pressable, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';
import { FontAwesome5 } from '@expo/vector-icons';

import * as FileSystem from 'expo-file-system';
import { Image } from "react-native";

export default function App() {
  const canvasRef = useRef<SketchCanvasRef>(null);

  const [imageURI, setImageURI] = useState<String | null>(null);
  const [pinyin, setPinyin] = useState<String | null>(null);
  const [english, setEnglish] = useState<String | null>(null);
  const [portuguese, setPortuguese] = useState<String | null>(null);


  const saveImage = async (filename: String | null) => {
    try {

      const result = await canvasRef.current?.toImage()?.encodeToBase64();
      if (result) {
        const filePath = `${FileSystem.documentDirectory}${filename}.png`;
        await FileSystem.writeAsStringAsync(filePath, result, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const file = String(filePath)
        setImageURI(file)
        console.log(file)
        return file;
      }
    } catch (e) {
      //console.log(e);
    }
  };


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <View style={styles.header_content}>
          {/*
          <TouchableOpacity style={styles.header_button}>
            <FontAwesome5 name="play" size={24} color="#FFFFFF" style={{ marginLeft: 5}}/>
          </TouchableOpacity>
          */}
          <View>
            <Text style={styles.text_pinyin}>Ni</Text>
            <Text style={styles.text_character}>你</Text>
            <Text style={styles.text_pinyin}>Você</Text>
          </View>
        </View>
      </View>

      <SketchCanvas
        ref={canvasRef}
        strokeColor={'#FFFFFF'}
        strokeWidth={8}
        containerStyle={styles.viewCanvas}
      />
      <View style={styles.viewMenu}>
        <TouchableOpacity onPress={canvasRef.current?.undo}>
          <FontAwesome5 name="undo" size={24} color="#40DF9F"  />
        </TouchableOpacity>
        <TouchableOpacity  onPress={canvasRef.current?.redo}>
          <FontAwesome5 name="redo" size={24} color="#40DF9F" />
        </TouchableOpacity>
        <TouchableOpacity onPress={canvasRef.current?.reset} >
          <FontAwesome5 name="times-circle" size={26} color="#40DF9F" />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveImage}>
          <FontAwesome5 name="check" size={26} color="#40DF9F" />
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22343C",
    alignItems: 'center',
    justifyContent: "center",
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    height: '20%'
  },
  header_content: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#40DF9F'
  },
  viewCanvas: {
    width: '90%',
    height: '60%',
    backgroundColor: "#30444E",
    borderRadius: 10,
    borderBottom: 0,
    elevation: 2
  },
  buttonContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "#40DF9F",
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  text_pinyin: {
    color: "#FFFFFF",
    textAlign: "center",
    marginLeft: 10,
    fontSize: 15,
  },
  text_character: {
    color: "#FFFFFF",
    textAlign: "center",
    marginLeft: 10,
    fontSize: 60,
  },
  viewMenu: {
    marginTop: 20,
    width: '90%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#30444E',
    borderRadius: 25
  },
}); 