import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Platform,
    TextTextInput
} from 'react-native';

import * as Yup from 'yup';
import { FontAwesome } from '@expo/vector-icons';

import TextInput from '../components/TextInput';
import ButtonForm from '../components/Button/Form';
import logo from '../assets/logo-large.png';

const schema = Yup.object().shape({
    firstName: Yup.string('Nome é obrigatório').required('Nome é obrigatório').max(255, "Nome acima do permitido"),
    lastName: Yup.string('Sobrenome é obrigatório').required('Sobrenome é obrigatório').max(255, "Sobrenome acima do permitido"),
    email: Yup.string('Email é obrigatório').required('Email é obrigatório').email('Email está inválido'),
    password: Yup.string('Senha é obrigatória').required('Senha é obrigatória'),
    passwordConfirm: Yup.string('A Confirmação de senha é obrigatória').required('A Confirmação de senha é obrigatória')
        .oneOf([Yup.ref('password'), null], 'Senhas incompátiveis')
});

export default function NewUser({ navigation }) {
    const [values, setValues] = useState({});
    const [erros, setValues] = useState({});

    const onAlreadyUserTextPress = useCallback(() => navigation.navigate('Login'), []);
    const handleChange = useCallback(name => text => setValues(old => ({ ...old, [name]: text })), []);
    const handleSubmit = useCallback(e => {
        e.preventDefault();

        let data = parseFormData();

        try {
            if (schema) {
                await schema.validate(data, {
                    abortEarly: false,
                    stripUnknown: true,
                    context,
                });

                data = schema.cast(data, {
                    stripUnknown: true,
                    context,
                });
            }

            setErrors({});
            onSubmit(data, { resetForm });
        } catch (err) {
            const validationErrors = {};

            /* istanbul ignore next  */
            if (!err.inner) {
                throw err;
            }

            err.inner.forEach((error: ValidationError) => {
                validationErrors[error.path] = error.message;
            });

            setErrors(validationErrors);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView enabled={true} behavior="padding">
                <ScrollView contentContainerStyle={styles.scrollViewContentContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.logoContainer}>
                        <Image source={logo} />
                    </View>
                    <View style={styles.actionsContainer}>
                        <TextInput
                            placeholder="Nome"
                            autoCapitalize="words"
                            autoCorrect={false}
                            autoCompleteType="name"
                            multiline={false}
                            onChangeText={handleChange('firstName')}
                            value={values.firstName}
                        />
                        <TextInput
                            placeholder="Sobrenome"
                            autoCapitalize="words"
                            autoCorrect={false}
                            autoCompleteType="name"
                            multiline={false}
                            onChangeText={handleChange('lastName')}
                            value={values.lastName}
                        />
                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            multiline={false}
                            onChangeText={handleChange('email')}
                            value={values.email}
                        />
                        <TextInput
                            placeholder="Senha"
                            autoCorrect={false}
                            autoCompleteType="password"
                            secureTextEntry={true}
                            multiline={false}
                            onChangeText={handleChange('password')}
                            value={values.password}
                        />
                        <TextInput
                            placeholder="Confimação de senha"
                            autoCorrect={false}
                            autoCompleteType="password"
                            secureTextEntry={true}
                            multiline={false}
                            onChangeText={handleChange('passwordConfirm')}
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
        color: 'blue'
    }
});