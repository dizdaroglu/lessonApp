import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import Styles from '../../../Styles';


const Confirm = ({ children, visible, onAccept, onDecline }) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={() => { }}
        >
            <View style={styles.containerStyle}>
                <CardSection style={styles.cardSectionStyle}>
                    <Text style={styles.textStyle}>{children}</Text>
                </CardSection>
                <CardSection>
                    <Button onPress={onAccept}>Yes</Button>
                    <Button onPress={onDecline}> No</Button>

                </CardSection>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    cardSectionStyle: {
        justifyContent: 'center',
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
        color: Styles.pink
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
})

export { Confirm };