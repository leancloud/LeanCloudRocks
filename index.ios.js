/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var AV = require('avoscloud-sdk').AV;

AV.initialize('your app id', 'your app key');

var Item = AV.Object.extend('Item');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  AlertIOS,
} = React;

var LeanCloudRocks = React.createClass({
  getInitialState: function() {
    return {
      content: '',
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} onChange={this.onTextChange} value={this.state.content} placeholder='What to do now?'/>
        <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.onSubmitText}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  },
  onTextChange: function(event) {
    this.setState({content: event.nativeEvent.text});
  },
  onSubmitText: function(event) {
    var item = new Item();
    item.set('content', this.state.content);
    item.save().then(function() {
      AlertIOS.alert('保存成功');
    }).catch(function(e) {
      AlertIOS.alert('保存失败', e.message);
    });
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 50,
    padding: 4,
    margin: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  button: {
    height: 50,
    margin: 10,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
});

AppRegistry.registerComponent('LeanCloudRocks', () => LeanCloudRocks);
