import React, {Component} from 'react';
import {Button, View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class CommentHolder extends Component{
  constructor(props){
    super(props)
  }

  async _removeComment(){
    this.itemComments = await AsyncStorage.getItem(this.props.dbName)
    if(this.itemComments != null){
      this.itemComments = JSON.parse(this.itemComments).filter(k => k.id != this.props.id)
      await AsyncStorage.setItem(this.props.dbName, JSON.stringify(this.itemComments))
      this.props.onRemove()
    }
  }

  render(){
    return (
      <View style={styles.commentHolder}>
        <Text style={styles.comment}>{this.props.comment}</Text>
        <Button title='Trinti' onPress={() => this._removeComment()}/>
      </View>
    )
  }
}


class RecipePage extends Component {
  itemData = this.props.route.params.recipe_data

  constructor(props){
    super(props)

    this.state = {
      new_comment: '',
      all_comments: []
    }
  }

  async _getAllComments(){
    let all_com = await AsyncStorage.getItem(this.itemData.pavadinimas)
    if(all_com != null){
      this.setState({all_comments: JSON.parse(all_com)})
    }
  }
  
  async postComment(comment){
    let comms = this.state.all_comments
    comms.push({"id": comms.length, "comment": comment})
    await AsyncStorage.setItem(this.itemData.pavadinimas, JSON.stringify(comms))
    this.setState({all_comments: comms})
  }

  async _handlePostComment(){
    this.postComment(this.state.new_comment)
  }

  componentDidMount(){
    this._doUpdate()
  }

  _doUpdate(){
    this._getAllComments()
  }

  render() {
    return (
      <ScrollView>
      <View>
        <Text style={styles.name}>{this.itemData.pavadinimas}</Text>
        <Text style={styles.heading}>Reikės</Text>
        <View style={styles.ingridents}>
          {this.itemData.ingridentai.map((k, i) => <Text key={i} style={{fontWeight: "bold"}}>{k}</Text>)}
        </View>
        <Text style={styles.heading}>Paruošimo būdas</Text>
        <Text style={styles.making}>{this.itemData.paruosimo_budas}</Text>
      </View>
      <View>
        <Text style={styles.heading}>Komentarai</Text>
        <CommentView onRemove={() => this._doUpdate()} dbName={this.itemData.pavadinimas} comments={this.state.all_comments} />
        <TextInput style={styles.comments} editable maxLength={40} onChangeText={(text) => this.setState({new_comment: text})} />
        <Button title="Įrašyti" onPress={() => this._handlePostComment()} />
      </View>
      </ScrollView>
    );
  }
}

class CommentView extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View>
        {this.props.comments.map((v, i) => <CommentHolder onRemove={() => this.props.onRemove()} dbName={this.props.dbName} key={v.id} id={v.id} comment={v.comment} />)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    textAlign: 'center',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#2196F3'
  },
  heading: {
    backgroundColor: '#ffffff',
    textAlign: 'center',
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold'
  },
  ingridents: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  making: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  comments: {
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderColor: 'gray', borderWidth: 2,
  },
  comment:{
    padding: 10
  },
  commentHolder: {
    marginHorizontal: 20,
  }
});

export default RecipePage;