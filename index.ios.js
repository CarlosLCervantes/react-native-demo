/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} = React;

var Login = require('./login');
var AuthService = require('./auth_service');

var GithubBrowser = React.createClass({
  componentDidMount: function() {
      AuthService.getAuthInfo((err, authInfo)=> {
        this.setState({
          checkingAuth: false,
          isLoggedIn: authInfo != null
        });
      })
  },
  render: function() {
    if(this.state.checkingAuth) {
      return (
          <View style={styles.container}>
            <ActivityIndicatorIOS
              animating={true}
              style={styles.loader}
              size={'large'} />
          </View>
        );
    }

    if(this.state.isLoggedIn) {
      return (
          <View style={styles.container}>
            <Text style={styles.welcome}>Logged In</Text>
          </View>
        );
    } else {
      return (
        <Login onLogin={this.onLogin} />
      );
    }
    
  },
  onLogin: function() {
    this.setState({isLoggedIn: true});
  }, 
  getInitialState() {
      return {
          isLoggedIn: false,
          checkingAuth: true
      };
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
