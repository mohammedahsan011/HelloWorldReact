import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
export default class App extends Component<Props> {

  state ={
    data:[]       // empty array to fetch the state 
  }

  fetchData= async()=>{
    const response = await fetch('http://youcomputerip/hellodb'); 
    const hellodb =  response.json();
    this.setState({data: hellodb});

  }
componentDidMount(){
  this.fetchData();
}
  render() {
    return (
      <View >
       <Text>Hello World</Text>

       <FlatList
       data={this.state.data}
       keyExtractor={(item,index) => index.toString()}
       renderItem={({item}) =>

       <View style={{backgroundColor:'#abc123',padding:10,margin:10}}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>{item.name}</Text>
          <Text style={{color:'#fff'}}>{item.email}</Text>
          <Text>City: {item.address.city}</Text>
         </View>

       }

       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
