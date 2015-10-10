'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Component
} = React;

class Login extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.logo} source={require('image!logo-purple')} />
				<Text style={styles.heading}>Github Browser</Text>
				<TextInput style={styles.input} placeholder="Github Username"></TextInput>
				<TextInput style={styles.input} 
					secureTextEntry="true"
					placeholder="Github Password"></TextInput>
				<TouchableHighlight style={styles.button}>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableHighlight>
			</View>
		)
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
	}
});

module.exports = Login;