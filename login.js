'use strict';

var React = require('react-native');
var buffer = require('buffer');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS
} = React;

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showProgress: false
		}
	}
	render() {
		var errorCtrl = <View />;

		if(!this.state.success && this.state.badCredentials) {
			errorCtrl = <Text style={styles.error}>
				That username and password combination did not work
			</Text>;
		}
		else if(!this.state.success && this.state.unknownError) {
			errorCtrl = <Text style={styles.error}>
				An unexpected issue occured
			</Text>;
		}

		return (
			<View style={styles.container}>
				<Image style={styles.logo} source={require('image!logo-purple')} />
				<Text style={styles.heading}>Github Browser</Text>
				<TextInput 
					onChangeText={(text)=> this.setState({username: text}) }
					style={styles.input} 
					placeholder="Github Username"></TextInput>
				<TextInput 
					onChangeText={(text)=> this.setState({password: text}) }
					style={styles.input} 
					secureTextEntry="true"
					placeholder="Github Password"></TextInput>
				<TouchableHighlight 
					onPress={this.onLoginPressed.bind(this)}
					style={styles.button}>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableHighlight>

				{{errorCtrl}}

				<ActivityIndicatorIOS
				  animating={this.state.showProgress}
				  size={'large'}
				  style={styles.loader}/>
			</View>
		)
	}
	onLoginPressed() {
		console.log("Someone is loggin in with username " + this.state.username + " and password " + this.state.password)
		this.setState({showProgress: true});
		var authService = require('./auth_service');
		authService.login({
			username: this.state.username,
			password: this.state.password
		}, 
		(results)=> {
			this.setState(results);

			if(results.success && this.props.onLogin) {
				this.props.onLogin();
			}
		});
	}
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		padding: 10,
		paddingTop: 50,
		alignItems: 'center'
	},
	logo: {
		width: 250,
		height: 150
	},
	heading: {
		fontSize: 30,
		marginTop: 15
	},
	input: {
		height: 50,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: 'teal'
	},
	button: {
		height: 50,
		backgroundColor: '#48BBEC',
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 22,
		color: '#fff',
		alignSelf: 'center'
	},
	loader: {
		marginTop: 20
	},
	error: {
		color: 'red',
		marginTop: 10
	}
});

module.exports = Login;