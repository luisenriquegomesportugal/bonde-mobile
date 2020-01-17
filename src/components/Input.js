import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Input({ error, ...rest }) {
    return (
        <View style={styles.viewTextInput}>
            <TextInput
                {...rest}
                style={!!error ? { ...styles.textInput, ...styles.textInputInvalid } : styles.textInput}
                placeholderTextColor={!!error ? 'red' : '#aaa'}
            />
            {!!error && <Text style={styles.textInvalid}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    viewTextInput: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 10
    },
    textInput: {
        height: 24,
        width: 280,
        borderRadius: 3,
        paddingHorizontal: 10,
        marginBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#aaa'
    },
    textInputInvalid: {
        color: 'red',
        borderBottomColor: 'red'
    },
    textInvalid: {
        fontSize: 9,
        color: 'red'
    }
});