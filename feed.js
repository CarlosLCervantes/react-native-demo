'use strict';

var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
  Component,
  ListView,
  Image,
  TouchableHighlight
} = React;

var PushPayload = require('./push_payload');

class Feed extends Component {
	constructor(props) {
		super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

		this.state = {
      dataSource: ds.cloneWithRows(['A', 'B', 'C'])
		};
	}

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    var AuthService = require("./auth_service");
    AuthService.getAuthInfo((err, authInfo)=> {
      var url = 'https://api.github.com/users/' + authInfo.user.login + '/received_events';
      fetch(url, {
        headers: authInfo.header
      })
      .then((response)=> response.json())
      .then((responseData)=> {
        var feedItems = responseData.filter((ev) => ev.type == 'PushEvent');
        this.setState({dataSource: this.state.dataSource.cloneWithRows(feedItems)});
      });
    });
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Push Event',
      component: PushPayload,
      passProps: {
        pushEvent: rowData
      }
    });
  }

  renderRow(rowData, sectionID, rowID) {
    var name = (rowData.actor) ? rowData.actor.login : "unknown";
    return(
      <TouchableHighlight 
          onPress={()=> this.pressRow(rowData)} underlayColor='#ddd'>
        <Text style={{color: "#333", backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, marginBottom: 10}}>{name}</Text>
      </TouchableHighlight>
    )
  }

	render() {
    if(this.state.dataSource) {
      return (
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
              <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}>
              </ListView>
          </View>
      )
    }
  }
}

module.exports = Feed;


    