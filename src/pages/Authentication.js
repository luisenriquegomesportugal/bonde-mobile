import React, { useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import logo from '../assets/logo-large.png';

export default function Authentication() {
    const onGoogleButtonPress = useCallback(() => alert('Em breve'), []);
    const onFacebookButtonPress = useCallback(() => alert('Em breve'), []);
    const onEmailButtonPress = useCallback(() => alert('Email'), []);
    const onNewTextPress = useCallback(() => alert('Novo Email'), []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"} />
            <View style={styles.logoContainer}>
                <Image source={logo} />
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={{ ...styles.actionButton, ...styles.googleActionButton }} onPress={onGoogleButtonPress}>
                    <View style={styles.viewActionButton}>
                        <FontAwesome name="google" size={24} />
                        <View style={styles.viewTextActionButton}>
                            <Text style={styles.textActionButton}>Google</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.actionButton, ...styles.facebookActionButton }} onPress={onFacebookButtonPress}>
                    <View style={styles.viewActionButton}>
                        <FontAwesome name="facebook" size={24} color='#fff' />
                        <View style={styles.viewTextActionButton}>
                            <Text style={{ ...styles.textActionButton, color: '#fff' }}>Facebook</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={{ ...styles.actionButton, ...styles.emailActionButton }} onPress={onEmailButtonPress}>
                    <View style={styles.viewActionButton}>
                        <FontAwesome name="sign-in" size={24} />
                        <View style={styles.viewTextActionButton}>
                            <Text style={styles.textActionButton}>Email</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Text style={styles.textLink} onPress={onNewTextPress}>
                    Não possui uma conta?
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButton: {
        height: 44,
        width: 300,
        borderRadius: 3,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
        borderWidth: 1
    },
    viewActionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center'
    },
    viewTextActionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textActionButton: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
        marginHorizontal: 10
    },
    textLink: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    facebookActionButton: {
        backgroundColor: '#2b78e4',
        borderColor: '#3c81e1'
    },
    googleActionButton: {
        backgroundColor: '#dddddd',
        borderColor: '#d4d2d2'
    },
    emailActionButton: {
        backgroundColor: '#ffac3c',
        borderColor: '#fdb640'
    },
});
