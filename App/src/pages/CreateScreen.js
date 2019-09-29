import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity } from 'react-native';
import Styles from '../../Styles';
import MultiSelect from 'react-native-multiple-select';

import { connect } from 'react-redux';
import { createForm, selectFormItems, nameChanged, phoneChanged, priceChanged } from '../actions';


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

class CreateScreen extends Component {

    onCreate = () => {
        const { selectedItems, name, phone, price } = this.props;
        this.props.createForm({ selectedItems, name, phone, price })
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
        const { selectedItems, name, phone, price } = this.props;
        console.log(name, phone, selectedItems)
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


                <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => this.onCreate()}>
                    <Text style={styles.createButton}>
                        Create
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        marginTop: 200,
        padding: 20,
        marginHorizontal: 20,
        elevation: 8
    },
    createButton: {
        color: Styles.pink,
        fontFamily: Styles.fontBold,
        fontSize: 21
    }
})

const mapStateToProps = (state) => {
    const { name, phone, days, selectedItems, price } = state.form;
    return {
        name, phone, days, selectedItems, price
    }
}

export default connect(mapStateToProps, { createForm, selectFormItems, phoneChanged, nameChanged, priceChanged })(CreateScreen)