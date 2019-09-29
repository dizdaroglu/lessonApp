import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Keyboard, Animated, Dimensions } from 'react-native';
import Styles from '../../Styles';

const { width, height } = Dimensions.get('window');

class Logo extends Component {
    state = {
        imageWidth: new Animated.Value(128),
        imageHeight: new Animated.Value(128),
        textSize: new Animated.Value(23)
    }

    componentDidMount() {
        this.keyboardShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardShow);
        this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardHide);

    }
    componentWillUnmount() {
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    }
    keyboardShow = () => {
        Animated.parallel([
            Animated.timing(this.state.imageWidth, {
                toValue: 64,
                duration: 300
            }),

            Animated.timing(this.state.imageHeight, {
                toValue: 64,
                duration: 300
            }),
            Animated.timing(this.state.textSize, {
                toValue: 11,
                duration: 300
            })
        ]).start();
    }
    keyboardHide = () => {
        Animated.parallel([
            Animated.timing(this.state.imageWidth, {
                toValue: 128,
                duration: 300
            }),

            Animated.timing(this.state.imageHeight, {
                toValue: 128,
                duration: 300
            }),
            Animated.timing(this.state.textSize, {
                toValue: 23,
                duration: 300
            })
        ]).start();
    }
    render() {
        const containerImageSize = [
            {
                width: this.state.imageWidth,
                height: this.state.imageHeight
            }
        ]
        const fontSize = [
            {
                fontSize: this.state.textSize
            }
        ]
        return (
            <View style={[styles.headerLogo]}>
                <Animated.Image
                    style={[styles.logoImage, containerImageSize]}
                    source={require('../images/exam1.png')}
                />
                <Animated.Text style={[styles.headerText, fontSize]}>{this.props.title}</Animated.Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    headerLogo: {
        marginTop: 70,
        marginBottom: 30,
        alignItems: 'center',

    },
    logoImage: {
        marginBottom: 40,


    },
    headerText: {
        color: 'white',
        fontFamily: Styles.fontBlack,
        //    fontSize: 23
    },
})
export default Logo;