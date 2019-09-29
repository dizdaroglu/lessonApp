import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity, Modal } from 'react-native';
import Styles from '../../Styles';
import MultiSelect from 'react-native-multiple-select';
import _ from 'lodash';
import Communications from 'react-native-communications';

import { Confirm } from '../components/common';

import { connect } from 'react-redux';
import { studentUpdate, studentSave, editClean, studentDelete, selectFormItems, nameChanged, phoneChanged, priceChanged } from '../actions';



const items = [{
    id: '1',
    name: 'Pazartesi',
}, {
    id: '2',
    name: 'Salı',
}, {
    id: '3',
    name: 'Çarşamba',
}, {
    id: '4',
    name: 'Perşembe',
}, {
    id: '5',
    name: 'Cuma',
}, {
    id: '6',
    name: 'Cumartesi',
}, {
    id: '7',
    name: 'Pazar',
}];

class EditScreen extends Component {

    state = {
        showModal: false
    }

    componentWillMount() {
        _.each(this.props.student, (value, prop) => {
            console.log('->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            console.log(value, prop)
            this.props.studentUpdate({ prop, value })
        })
    }
    componentWillUnmount() {
        this.props.editClean();
    }

    onButton = () => {
        const { name, price, phone, selectedItems } = this.props
        this.props.studentSave({ name, phone, price, selectedItems, uid: this.props.student.uid })
    }
    onMessage = () => {
        const { phone } = this.props;
        Communications.text(phone, "Bu bir test mesajı!");
    }
    onAccept = () => {
        const { uid } = this.props.student;
        this.props.studentDelete({ uid })
    }
    onDecline = () => {
        this.setState({ showModal: false })
    }

    onSelectedItemsChange = selectedItems => {

        this.props.selectFormItems({ selectedItems })

    };

    onChangeName = (text) => {
        this.props.nameChanged(text);
    }
    onChangePhone = (text) => {
        this.props.phoneChanged(text);
    }

    onChangePrice = (text) => {
        this.props.priceChanged(text);
    }

    render() {
        const { name, phone, price, selectedItems } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.formContent}>
                    <View style={styles.form}>
                        <Text style={styles.inputName}>Name :</Text>
                        <TextInput style={styles.input} value={name} onChangeText={name => this.onChangeName(name)} />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.inputName}>Phone :</Text>
                        <TextInput style={styles.input} value={phone} keyboardType="number-pad" onChangeText={phone => this.onChangePhone(phone)} />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.inputName}>Price :</Text>
                        <TextInput style={styles.input} value={price} keyboardType="number-pad" onChangeText={price => this.onChangePrice(price)} />
                    </View>
                </View>
                <View style={styles.multiDays}>

                    <MultiSelect
                        items={items}
                        uniqueKey="name"
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Days"
                        styleTextDropdown={{ paddingHorizontal: 10, color: Styles.purple }}
                        styleTextDropdownSelected={{ paddingHorizontal: 10, color: Styles.purple }}
                        searchInputPlaceholderText="Search Days..."
                        onChangeInput={(text) => console.log(text)}
                        altFontFamily={Styles.fontLight}

                        tagRemoveIconColor="#CCC"
                        tagBorderColor={Styles.pink}
                        tagTextColor={Styles.pink}
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor={Styles.pink}
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor={Styles.pink}

                        submitButtonText="Submit"

                    />
                </View>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => this.onButton()}>
                        <Text style={styles.createButton}>
                            Save
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => this.onMessage()}>
                        <Text style={styles.createButton}>
                            Send Message
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        <Text style={styles.createButton}>
                            Fire
                    </Text>
                    </TouchableOpacity>
                    <Confirm
                        visible={this.state.showModal}
                        onAccept={this.onAccept.bind(this)}
                        onDecline={this.onDecline.bind(this)}
                    >
                        Are you sure you want to delete this?
                </Confirm>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        //  position: 'relative',
        flex: 1,
        justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 1
    },
    multiDays: {

        marginTop: 40,
        marginHorizontal: 20
    },
    container: {
        flex: 1,
        backgroundColor: Styles.purple
    },
    input: {
        flex: 1,
        height: 60,
        paddingHorizontal: 15,
        color: 'white',
        fontFamily: Styles.fontRegular,
        fontSize: 21
    },
    inputName: {
        paddingHorizontal: 10,
        color: Styles.purple,
        fontFamily: Styles.fontLight,


    },
    form: {
        backgroundColor: Styles.pink,
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        //marginBottom: 30
        elevation: 8
    },
    formContent: {
        marginHorizontal: 20
    },

    button: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        padding: 10,
        marginHorizontal: 20,
        elevation: 8
    },
    createButton: {
        color: Styles.pink,
        fontFamily: Styles.fontBold,
        fontSize: 21
    },
    buttonContainer: {
        marginTop: 110
    }
})

const mapStateToProps = state => {
    const { name, phone, price, selectedItems } = state.form;
    return {
        name, phone, price, selectedItems
    }
}

export default connect(mapStateToProps, { studentUpdate, studentDelete, editClean, studentSave, selectFormItems, nameChanged, phoneChanged, priceChanged })(EditScreen);