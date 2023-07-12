import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from "expo-router";
import { apiUrl } from "../../../config/AunthConfig";


export default function Root() {

  const [lessons, setLessons] = useState<Array<String> | null>([])
  const [progress, setProgress] = useState(0.5);


  const increaseProgress = () => {
    if (progress < 1) {
      setProgress(progress + 0.1);
    }
  };

  useEffect(() => {

    const getLessons = async () => {

      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      const response = await fetch(apiUrl + 'lessons', requestOptions);
      const data = response.json();
      return data
    };
    getLessons()
      .then(data => setLessons(data))
      .catch(error => console.error(error));

  }, [])

  const ProgressBar = ({ progress }) => {
    return (
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress * 100}%` }]}></View>
      </View>
    );
  };
  
  const renderCard = ({ item }) => (
    //<Link href={"draw"} style={{flex:1, width: "40%"}}>
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={{ marginRight: 10 }}>
          <Image source={require('../../../assets/aula1.png')} style={{ width: 50, height: 50, }} />
        </View>
        <View style={styles.text_and_bar}>
          <Text style={styles.textTitle}>{item.lesson_name}</Text>
          <View >
            <Text style={styles.textTopic}>{item.lesson_topic}</Text>
          </View>
          <ProgressBar progress={progress} />
        </View>

      </View>
      <View style={styles.play_button}>
        <Link href={`home/feed/class/${item.lesson_id}`}><Feather name="play" size={20} color="#40DF9F" /></Link>
      </View>
    </View>
    //</Link>
  );

  const LessonThemes = () => {
    const data = [
      { id: 1, theme: '1', color: '#1A282F', font: '#3DD598', borderColor: '#3DD598', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
      { id: 2, theme: '2', color: '#30444E', font: '#FFFFFF', borderColor: '#3DD598', borderWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' },
      { id: 3, theme: '3', color: '#30444E', font: '#FFFFFF', borderColor: '#3DD598', borderWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' },
      { id: 4, theme: '4', color: '#30444E', font: '#FFFFFF', borderColor: '#3DD598', borderWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' },
      { id: 5, theme: '5', color: '#30444E', font: '#FFFFFF', borderColor: '#3DD598', borderWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' },
      { id: 6, theme: '6', color: '#30444E', font: '#FFFFFF', borderColor: '#3DD598', borderWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    ];

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.lessonsType}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.item, { backgroundColor: item.color, borderColor: item.borderColor, borderWidth: item.borderWidth, justifyContent: item.justifyContent, alignItems: item.alignItems }]}>
            <Text style={[styles.themeText, { color: item.font, fontWeight: 'bold', fontSize: 16 }]}>{item.theme}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (

    <View style={styles.container}>

      {/*<View style={styles.containerNews}>
        <View style={styles.newsContent}>
          <View>
            <Text style={styles.newsTitle}>Curiosidades da Semana</Text>
          </View>
          <View>
            <Text style={styles.newsText}>Veja o que os chineses fazem em seu tempo livre</Text>
          </View>
        </View>
        <View>
          <Image source={require('../../../assets/logo_white.png')} style={{ width: 150, height: 150, }} />
        </View>

      </View>
      */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={30} color="#96A7AF" />
          <TextInput
            style={styles.input}
            placeholder="Pesquisar"
            placeholderTextColor="#96A7AF"
          />
        </View>

        <TouchableOpacity style={styles.iconContainer}>
          <Feather name="settings" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.listHeader}>
          <View>
            <Text style={styles.headerTitle}>Níveis HSK</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Ver Todos</Text>
          </View>
        </View>
        {LessonThemes()}
        {lessons?.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.listClasses}
            data={lessons}
            renderItem={renderCard}
            keyExtractor={(item) => item.lesson_id}
          />) :
          (<View style={{display: 'flex', width: 'auto', height: '60%', justifyContent:'flex-start', alignItems: 'center'}}>
            <Image
              source={require('../../../assets/loading.gif')}
              style={styles.gif}
            />
            <Text style={{color:'#96A7AF'}}>Carregando Aulas</Text>
          </View>

          )
        }

      </View>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22343C",
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  containerNews: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    height: '30%',
    width: '90%',
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  newsContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '60%',
    height: '70%'
  },
  newsTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  newsText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#FFFFFF',
  },
  header: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    margin: '5%',
  },
  searchContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A282F',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    height: 60,
    marginRight: 3,
  },
  input: {
    flex: 1,
    color: '#96A7AF',
    marginLeft: 10,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  iconContainer: {
    marginLeft: 10,
    backgroundColor: '#40DF9F',
    height: 60,
    width: 50,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listClasses: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    height: 'auto',
  },
  listHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    maxWidth: '100%',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  lessonsType: {
    height: 60,
    paddingLeft: '4%',
    marginBottom: 5,
  },
  item: {
    backgroundColor: '#475E69',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginRight: 10,
    height: 50,
    width: 60,

  },
  themeText: {
    fontSize: 16,
  },
  textTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',

  },
  textTopic: {
    color: '#96A7AF',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  textLearn: {
    color: '#40DF9F',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginHorizontal: 10,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '90%',
    maxWidth: '92%',
    height: 100,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#30444E",
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  text_and_bar: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  progressBar: {
    marginTop: 10,
    width: '80%',
    height: 8,
    backgroundColor: '#2A3C44',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: 8,
    backgroundColor: '#40DF9F',
  },
  play_button: {
    right: 20,
    top: 25,
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#1A282F',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#40DF9F',
    borderWidth: 1,
  },
  gif: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },

});

