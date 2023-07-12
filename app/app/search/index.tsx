import { useRouter } from "expo-router";
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Pressable, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { SketchCanvas, SketchCanvasRef, ImageFormat } from 'rn-perfect-sketch-canvas';
import { FontAwesome5 } from '@expo/vector-icons';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Image } from "react-native";

export default function App() {
  const canvasRef = useRef<SketchCanvasRef>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingFileURI, setRecordingFileURI] = useState<String | null>(null);
  const [imageURI, setImageURI] = useState<String | null>(null);
  const [pinyin, setPinyin] = useState<String | null>(null);
  const [english, setEnglish] = useState<String | null>(null);
  const [portuguese, setPortuguese] = useState<String | null>(null);
  const [lesson_id, setLesson_id] = useState<Number | null>(null);

  useEffect(() => {
    Audio.requestPermissionsAsync()
      .then(({ granted }) => {
        if (granted) {
          Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: InterruptionModeIOS.DoNotMix,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            playThroughEarpieceAndroid: false
          })
        }
      })
  }, []);

  async function handleRecordingStart() {
    const { granted } = await Audio.getPermissionsAsync();
    if (granted) {
      try {
        const { recording } = await Audio.Recording.createAsync();
        setRecording(recording);
      } catch (error) {
        Alert.alert("Não foi possível iniciar a gravação do audio")
      }
    }

  };

  async function handleRecordingStop() {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const fileUri = recording.getURI();
        console.log(fileUri);
        setRecordingFileURI(fileUri);
        setRecording(null);
      }
    } catch (erro) {
      Alert.alert("Não foi possível parar a gravação")
    }
  }

  async function handleAudioPlay() {
    try {
      if (recordingFileURI) {
        const { sound } = await Audio.Sound.createAsync({ uri: recordingFileURI }, { shoudPlay: true });
        await sound.setPositionAsync(0);
        await sound.playAsync();
      }
    } catch (erro) {
      Alert.alert("Não foi possível reproduzir a gravação")
    }
  };

  const saveImage = async (filename:String | null ) => {
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
  
  const saveCharacter = async () => {
    const imageUri = await saveImage(pinyin)
   
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        image: imageUri, 
        sound: recordingFileURI, 
        pronunciation: pinyin, 
        english:english, 
        portuguese: portuguese,
        lesson_id: 1
       })
    };
    
    await fetch('http://192.168.0.10:8000/caracteres', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  return (
    <SafeAreaView style={styles.container}>

      {/*<View style={styles.boxTitle}>
        <Text style={styles.textTitle}>Chinese Board</Text>
  </View>*/}
    
      <SketchCanvas
        ref={canvasRef}
        strokeColor={'#343a40'}
        strokeWidth={8}
        containerStyle={styles.viewCanvas}
      />
     
      <View style={styles.viewMenu}>
        <TouchableOpacity >
          <FontAwesome5 name="undo" size={24} color="#FFFFFF" onPress={canvasRef.current?.undo} />
        </TouchableOpacity>
        <TouchableOpacity >
          <FontAwesome5 name="redo" size={24} color="#FFFFFF" onPress={canvasRef.current?.redo} />
        </TouchableOpacity>
        <TouchableOpacity >
          <FontAwesome5 name="times-circle" size={26} color="#FFFFFF" onPress={canvasRef.current?.reset} />
        </TouchableOpacity>
        <Pressable
          onPressIn={() => { handleRecordingStart() }}
          onPressOut={() => { handleRecordingStop() }}>
          {recording ?

            <FontAwesome5 name="microphone-alt" size={24} color="#FFFFFF" /> :
            <FontAwesome5 name="microphone" size={24} color="#FFFFFF" />
          }
        </Pressable>
        {recordingFileURI &&
          <TouchableOpacity onPress={() => { handleAudioPlay() }}>
            <FontAwesome5 name="play-circle" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        }

      </View>
      <Pressable onPress={Keyboard.dismiss} style={styles.form}>
      {/*imageURI && (
        <Image
          source={{ uri: imageURI }}
          style={{ width: 200, height: 200 }}
        />
      )*/}
        <Text style={styles.formLabel}>Pinyin</Text>
        <TextInput
          style={styles.input}
          placeholder="Shì"
          value={pinyin}
          onChangeText={setPinyin}
        />
        <Text style={styles.formLabel}>Inglês</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: be"
          value={english}
          onChangeText={setEnglish}
        />
        <Text style={styles.formLabel}>Português</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: ser"
          value={portuguese}
          onChangeText={setPortuguese}
        />
      </Pressable>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveCharacter}>
          <FontAwesome5 name="save" size={24} color="#FFFFFF" />
          <Text style={styles.text}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: "center",
  },
  viewCanvas: {
    width: '90%',
    height: '35%',
    backgroundColor: "#ffffff",
    borderColor: '#e2e2e2',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,
    borderBottom: 0,
  },
  viewMenu: {
    width: '90%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "#e64c3c",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "#e64c3c",
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  boxTitle: {
    width: '90%',
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    marginTop: 0,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  textTitle: {
    color: "#e64c3c",
    fontSize: 26,
    fontWeight: "bold"
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
    fontSize: 18,
  },
  form: {
    width: "90%",
    paddingTop: 20,
  },
  formLabel: {
    color: "#343a40",
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 5,
    marginTop: 5,
  },
  input: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    height: 50,
    marginTop: 5,
    paddingLeft: 10,
    borderColor: "#e2e2e2",
    borderWidth: 1,
    fontSize: 16,
  },

}); 