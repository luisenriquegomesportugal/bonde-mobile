import React, { useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Platform, TextInput } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input';
import ButtonForm from '../components/Button/Form';

import logo from '../assets/logo-large.png';

const validationSchema = Yup.object().shape({
    firstName: Yup.string('Nome é obrigatório').required('Nome é obrigatório').max(255, "Nome acima do permitido"),
    lastName: Yup.string('Sobrenome é obrigatório').required('Sobrenome é obrigatório').max(255, "Sobrenome acima do permitido"),
    email: Yup.string('Email é obrigatório').required('Email é obrigatório').email('Email está inválido'),
    password: Yup.string('Senha é obrigatória').required('Senha é obrigatória'),
    passwordConfirm: Yup.string('A Confirmação de senha é obrigatória').required('A Confirmação de senha é obrigatória')
        .oneOf([Yup.ref('password'), null], 'Senhas incompátiveis')
});

export default function NewUser({ navigation }) {
    const onAlreadyUserTextPress = useCallback(() => navigation.navigate('Login'), []);

    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
        validationSchema,
        validateOnChange: false,
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        },
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
                            placeholder="Nome"
                            autoCapitalize="words"
                            autoCorrect={false}
                            autoCompleteType="name"
                            multiline={false}
                            error={errors.firstName}
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                        />
                        <Input
                            placeholder="Sobrenome"
                            autoCapitalize="words"
                            autoCorrect={false}
                            autoCompleteType="name"
                            multiline={false}
                            error={touched.lastName && errors.lastName}
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                        />
                        <Input
                            placeholder="Email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            multiline={false}
                            error={errors.email}
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
                            error={errors.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <Input
                            placeholder="Confimação de senha"
                            autoCorrect={false}
                            autoCompleteType="password"
                            secureTextEntry={true}
                            multiline={false}
                            error={errors.passwordConfirm}
                            onChangeText={handleChange('passwordConfirm')}
                            onBlur={handleBlur('passwordConfirm')}
                            value={values.passwordConfirm}
                        />
                        <ButtonForm
                            onPress={handleSubmit}
                            icon={<FontAwesome name="user-plus" size={24} />}>
                            Vamos lá
                            </ButtonForm>
                        <Text style={styles.textLink} onPress={onAlreadyUserTextPress}>
                            Já possui uma conta?
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
        flex: Platform.select({ ios: 2, android: 2 }),
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