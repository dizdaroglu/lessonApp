import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import Logo from '../components/Logo';

import Styles from '../../Styles';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { emailChanged, passwordChanged, joinUser } from '../actions';

import firebase from 'firebase';
import Spinner from '../components/Spinner';

class SignupScreen extends Component {

    onJoin = () => {
        const { email, password } = this.props;
        this.props.joinUser({ email, password })
    }

    renderJoin = () => {
        const { loading } = this.props;
        if (loading) {
            return <Spinner size="large" />
        }
        return (
            <TouchableOpacity onPress={() => this.onJoin()} style={styles.button} activeOpacity={0.5}>
                <Text style={styles.buttonText}>
                    Join
                        </Text>
            </TouchableOpacity>
        )
    }

    onEmailChanged = (text) => {
        this.props.emailChanged(text);
    }
    onPasswordChanged = (text) => {
        this.props.passwordChanged(text);
    }

    render() {
        const { email, password } = this.props
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={{ width: '100%' }} behavior="padding">

                    <Logo
                        title="Create Account"
                    />
                    <View style={styles.inputContainer}>
                        <TextInput autoCapitalize="none" value={email} onChangeText={email => this.onEmailChanged(email)} placeholder="Email" style={styles.input} />
                        <TextInput placeholder="Password" value={password} onChangeText={password => this.onPasswordChanged(password)} secureTextEntry={true} style={styles.input} />
                    </View>
                    <View style={styles.buttonContainer}>
                        {
                            this.renderJoin()
                        }
                    </View>
                    <View style={styles.question}>
                        <Text style={styles.questionText}>
                            Do you have account?
                    </Text>
                        <TouchableOpacity onPress={() => Actions.signin()}>
                            <Text style={{ color: Styles.pink, fontFamily: Styles.fontLight }}> Sign in</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.purple,
        alignItems: 'center',
        paddingVertical: 20
    },
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
        fontSize: 23
    },
    inputContainer: {

        width: '100%',
        paddingHorizontal: 50,
    },
    input: {
        backgroundColor: Styles.pink,
        marginBottom: 20,
        borderRadius: 5,
        height: 55,
        paddingHorizontal: 15,
        color: 'white',
        fontFamily: Styles.fontRegular,
        fontSize: 18
    },
    buttonContainer: {
        marginTop: 40,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 50
    },
    button: {
        backgroundColor: Styles.pink,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        borderRadius: 5,

    },
    buttonText: {
        color: 'white',
        fontFamily: Styles.fontBlack,
        fontSize: 23
    },
    question: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    questionText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: Styles.fontThin
    }
});
const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return {
        email, password, error, loading
    }
}
export default connect(mapStateToProps, { emailChanged, passwordChanged, joinUser })(SignupScreen)