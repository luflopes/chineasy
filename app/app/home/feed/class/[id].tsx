import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../../../config/AunthConfig';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

const LessonScreen = () => {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [lessons, setLessons] = useState([]);
  const { id, extra } = useLocalSearchParams();
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isFetched, setIsFetched] = useState(false);


  const handleButtonPress = () => {
    // lógica
  }
  useEffect(() => {

    const getClass = async () => {

      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      const response = await fetch(apiUrl + `lessons/${id}/caracteres`, requestOptions);
      const data = response.json();
      return data
    };
    if (isFetched === false){
      getClass()
      .then(data => setLessons(data))
      .then(() => setIsFetched(true))
      .catch(error => console.error(error));
    } else {
      return
    }
    
  }, [])
  // Dados de exemplo para as lições

  const handleNextLesson = () => {
    if (lessonIndex < lessons.length - 1) {
      setLessonIndex(lessonIndex + 1);
    } else {
      // Exibição adicional após a conclusão da última lição
      console.log('Parabéns! Você concluiu a aula.');
    }
  };

  const lesson = lessons[lessonIndex];

  const playText = async (charactere) => {
    try {
      await Speech.speak(charactere, {
        language: 'zh-CN', // Define o idioma para mandarim simplificado
        rate: 0.7,
      });
    } catch (error) {
      console.error('Ocorreu um erro ao reproduzir o texto:', error);
    }
  };

  const [cardColors, setCardColors] = useState([
    { id: '1', color: '#30444E', character: '面条', pinyin: 'mian tiao', image_uri: require('../../../../assets/characteres/card_img.jpg') },
    { id: '2', color: '#30444E', character: '汤', pinyin: 'tang', image_uri: require('../../../../assets/characteres/tang.jpg') },
    { id: '3', color: '#30444E', character: '包子', pinyin: 'bao zi', image_uri: require('../../../../assets/characteres/baozi.jpg') },
    { id: '4', color: '#30444E', character: '饺子', pinyin: 'jiao zi', image_uri: require('../../../../assets/characteres/jiaozi.jpg') },
  ]);

  const handleCardPress = (charactere, itemId) => {
    //const newColor =  color === '#30444E' ? '#3DD598' : '#30444E';
    setSelectedCardId(itemId);
    playText(charactere);
  };

  const Card = ({ image, pinyin, charactere, color, itemId }) => {
    const imageSource = typeof image === 'number' ? image : { uri: image };
  
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: itemId === selectedCardId ? '#3DD598' : color, }]}
        onPress={() => { handleCardPress(charactere, itemId) }}>
        <Image source={imageSource} style={styles.cardImage} />
        <Text style={styles.cardPinyin}>{pinyin}</Text>
        <Text style={styles.cardCharacter}>{charactere}</Text>
      </TouchableOpacity>
    );
  };
  

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Selecione a tradução de "sopa"</Text>
      </View>
      <View style={styles.cardContainer}>
        {cardColors.map((item) => {
          return (
            <Card
              key={item.id}
              itemId={item.id}
              image={item.image_uri}
              pinyin={item.pinyin}
              charactere={item.character}
              color={item.color}
            />
          )
        })}

        
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>
      {/*lessons.length >= 1 ?
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
          <View style={styles.header_container}>
            <View style={styles.header_content}>
              <TouchableOpacity style={styles.button_header} onPress={() => { }}>
                <AntDesign name="sound" size={15} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.text_pinyin}> {lesson.image}</Text>
            </View>
            <View style={styles.explain_content}>

            </View>
          </View>
          <Text style={{ fontSize: 50, marginBottom: 20 }}>{lesson.portuguese} - {lesson.english}</Text>
          <View style={styles.container_character}>
            <Text style={styles.character}>{lesson.image}</Text>
            <Text style={styles.pronunciation}>{lesson.pronunciation}</Text>
            <View style={styles.container_button}>
              <TouchableOpacity style={styles.button} onPress={() => { }}>
                <MaterialCommunityIcons name="microphone" size={30} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => { }}>
                <AntDesign name="sound" size={30} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleNextLesson}>
                <MaterialCommunityIcons name="arrow-right-thick" size={30} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :
        <View>
          <Text>Carregando</Text>
        </View>
  */}
    </View>
  );
};


export default LessonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22343C',
  },
  header: {
    padding: 10,
    backgroundColor: '#22343C',
    alignItems: 'center',
    justifyContent: 'center',
    height: '15%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  card: {
    width: '47%',
    height: '46%',
    marginBottom: 20,
    borderRadius: 8,
    padding: 0,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  cardPinyin: {
    marginTop: 5,
    fontSize: 14,
    color: '#96A7AF'
  },
  cardCharacter: {
    marginTop: 5,
    marginBottom: 0,
    fontSize: 30,

    color: '#FFFFFF'
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#3ED598',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

})