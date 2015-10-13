'use strict';

var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
  Component,
  TabBarIOS
} = React;

class AppContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
      selectedTab: 'feed'
		}
	}
	render() {
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab == 'feed'}
          onPress={()=> this.setState({selectedTab: 'feed'})}
        >
          <Text style={styles.welcome}>Tab Welcome</Text>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab == 'search'}
          onPress={()=> this.setState({selectedTab: 'search'})}
        >
          <Text style={styles.welcome}>Tab Search</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

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
    marginTop: 100
  }
});

module.exports = AppContainer;