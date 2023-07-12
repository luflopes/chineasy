import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';



const Welcome = () => {
    const [lessonIndex, setLessonIndex] = useState(0);
    const [lessons, setLessons] = useState([]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.icon_header}>
                    <Image source={require('../assets/logo.png')} style={{ width: 30, height: 30 }} />
                </View>
                <View style={styles.title_header}>
                    <Text style={styles.title}>Bem vindo</Text>
                    <Text style={styles.subtitle}>Faça login para continuar</Text>
                </View>
            </View>
            <View style={styles.form_container}>
                <View style={styles.input_container}>
                    <View style={styles.input_icon_user}>
                        <AntDesign name="user" size={20} color='#FFFFFF' />
                    </View>
                    <TextInput style={styles.input}
                        placeholderTextColor='#96A7AF'
                        placeholder='Digite seu usuário'
                    />
                </View>
                <View style={styles.input_container}>
                    <View style={styles.input_icon_pwd}>
                        <AntDesign name="lock1" size={20} color='#FFFFFF' />
                    </View>
                    <TextInput style={styles.input}
                        placeholderTextColor='#96A7AF'
                        placeholder="Digite sua senha"
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.button_container}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.button_text}>
                            Entrar
                        </Text>
                        <AntDesign name="arrowright" size={20} color='#FFFFFF' />
                    </TouchableOpacity>
                    <Text style={styles.button_text_subtitle}>
                        Esqueceu a senha?
                    </Text>
                    <TouchableOpacity style={styles.button_create}>
                        <Text style={styles.button_text_create}>
                            Criar uma conta
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22343C'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 40,
    },
    icon_header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#40DF9F',
        marginBottom: 30
    },
    title_header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },
    title: {
        fontSize: 50,
        color: '#FFFFFF',

    },
    subtitle: {
        fontSize: 20,
        color: '#96A7AF',
    },
    form_container: {

        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '30%'
    },
    input_container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10
    },
    input: {
        height: 50,
        width: '85%',
        padding: 10,
        fontSize: 16,
        color: '#96A7AF',
    },
    input_icon_user: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFC542',
        opacity: 0.6
    },
    input_icon_pwd: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FF575F',
        opacity: 0.6
    },
    button_container: {
        marginTop: 50,
        width: '95%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    button: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#40DF9F',
        borderRadius: 10,
       
    },
    button_text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 10
    },
    button_text_subtitle: {
        marginTop: 20,
        color: '#96A7AF'
    },
    button_create: {
        marginTop: 40,
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#286053',
        borderRadius: 10,
    },
    button_text_create: {
        color: '#3DD598',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 10
    }
})