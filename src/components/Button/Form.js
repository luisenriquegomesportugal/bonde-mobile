import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function ButtonForm({ icon, style, children, ...rest }) {
    return (
        <TouchableOpacity {...rest} style={{ ...styles.actionButton, ...style }}>
            <View style={styles.viewActionButton}>
                {!!icon && icon}
                <View style={styles.viewTextActionButton}>
                    <Text style={styles.textActionButton}>{children}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    actionButton: {
        backgroundColor: '#ffac3c',
        borderColor: '#aaa',
        height: 44,
        width: 280,
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
    }
});