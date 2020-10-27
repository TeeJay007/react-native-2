import React, {Component} from 'react';
import {Button, View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';

import {receptai} from '../recipes.json';

class CategoryItem extends Component{
    _onPressButton(props){
        props.nav.navigate('Receptas', {
            recipe_data: props.itemData
        });
    }

    render(){
        return (
            <TouchableOpacity onPress={() => this._onPressButton(this.props)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{this.props.itemData.pavadinimas}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


class CategoryPage extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            {receptai.map((v, i) => v.kategorija_id == this.props.route.params.category_id &&
                <CategoryItem key={i} itemData={v} nav={this.props.navigation} />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center'
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white'
    }
});

export default CategoryPage;