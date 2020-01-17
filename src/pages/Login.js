import React, { useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Platform, TextInput } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input';
import ButtonForm from '../components/Button/Form';

import logo from '../assets/logo-large.png';

const validationSchema = Yup.object().shape({
    email: Yup.string('Campo requirido').required('Campo requirido').email('Email Inválido'),
    password: Yup.string('Campo requirido').required('Campo requirido')
});

export default function Login({ navigation }) {
    const onNewTextPress = useCallback(() => navigation.navigate('NewUser'), []);

    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView enabled={true} behavior="padding">
                <ScrollView contentContainerStyle={styles.scrollViewContentContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.logoContainer}>
                        <Image source={logo} />
                    </View>
                    <View style={styles.actionsContainer}>
                        <Input
                            placeholder="Email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            multiline={false}
                            error={touched.email && errors.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <Input
                            placeholder="Senha"
                            autoCorrect={false}
                            autoCompleteType="password"
                            secureTextEntry={true}
                            multiline={false}
                            error={touched.password && errors.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <ButtonForm
                            onPress={handleSubmit}
                            icon={<FontAwesome name="sign-in" size={24} />}>
                            Vamos lá
                        </ButtonForm>
                        <Text style={styles.textLink} onPress={onNewTextPress}>
                            Não possui uma conta?
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollViewContentContainer: {
        flexGrow: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        flex: Platform.select({ ios: 2, android: 3 }),
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionsContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLink: {
        color: 'blue',
        textDecorationLine: 'underline'
    }
});