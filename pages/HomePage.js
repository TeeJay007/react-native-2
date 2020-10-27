import React, {Component} from 'react';
import {Button, View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import {kategorijos} from '../recipes.json';

class RecipeCategories extends Component{
  _onPressButton(props) {
    props.nav.navigate('Kategorija', {
      category_id: props.category_id
    });
  }

  render(){
    return(
      <TouchableOpacity onPress={() => this._onPressButton(this.props)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{this.props.name}</Text>
          </View>
      </TouchableOpacity>
    )
  }
}

class HomePage extends Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            {kategorijos.map((v, i) => <RecipeCategories key={v.id} category_id={v.id} name={v.name} nav={this.props.navigation} />)}
          </View>
        </ScrollView>
      </SafeAreaView>
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

export default HomePage;