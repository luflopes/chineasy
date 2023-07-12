import { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import { View, Text, Pressable, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Modal() {
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  const [selectedValue, setSelectedValue] = useState<String>('');

  const countries = ["Aula 1", "Aula 2", "Aula 3", "Aula 4"];

  return (
    <View style={styles.container}>

      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {/*!isPresented && <Link href="../">Dismiss</Link>*/}

      <Pressable style={styles.form}>
        <Text style={styles.formLabel}>Título da aula</Text>
        <SelectDropdown
        buttonStyle={styles.input}
        buttonTextStyle={{textAlign: 'justify', color:"#96A7AF"}}
        defaultButtonText='Selecione um título'
        dropdownStyle={{}}
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        <Text style={styles.formLabel}>Tópico a ser estudado</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: Tons"
          placeholderTextColor="#96A7AF"
          value={''}
          onChangeText={() => ''}
        />
        <Text style={styles.formLabel}>Nível HSK</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: Tons"
          placeholderTextColor="#96A7AF"
          value={''}
          onChangeText={() => ''}
        />
        <Text style={styles.formLabel}>Descrição</Text>
        <TextInput
          style={styles.inputTextArea}
          placeholder="ex: Estrutura de tons do Mandarim"
          placeholderTextColor="#96A7AF"
          value={''}
          onChangeText={() => ''}
          multiline
          numberOfLines={4} // Especifica o número de linhas desejado
        />
      </Pressable>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <FontAwesome5 name="save" size={24} color="#FFFFFF" />
          <Text style={styles.text}>Salvar</Text>
        </TouchableOpacity>
      </View>
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22343C",
    alignItems: 'center',
    justifyContent: "flex-start",
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
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "#40DF9F",
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
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
    color: "#FFFFFF",
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 5,
    marginTop: 5,
  },
  input: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#1A282F",
    height: 60,
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  inputTextArea: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#1A282F",
    height: 120,
    marginTop: 5,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  
}); 