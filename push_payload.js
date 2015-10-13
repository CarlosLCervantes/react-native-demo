'use strict';

var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
  Component,
  ListView,
  Image,
} = React;

class PushPayload extends Component {
	constructor(props) {
		super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

		this.state = {
      dataSource: ds.cloneWithRows(props.pushEvent.payload.commits),
      pushEvent: props.pushEvent
		};
	}

  renderRow(rowData) {
    return (
      <View 
        style={{
          flex: 1, 
          justifyContent: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1,
          paddingTop: 20,
          paddingBottom: 20,
          padding: 10
        }}>
        <Text>{rowData.sha.substring(0, 6)} - {rowData.message}</Text>
      </View>
    )
  }

	render() {
      return (
          <View style={{flex: 1, padding: 80, justifyContent: 'flex-start', alignItems: 'center'}}>
            <Image 
              source={{uri: this.state.pushEvent.actor.avatar_url}}
              style={{height: 120, width: 120, borderRadius: 60}} />
            <Text style={{paddingTop: 20, paddingBottom: 20, fontSize: 20}}>
              {this.state.pushEvent.created_at}
            </Text>
            <Text>{this.state.pushEvent.actor.login}</Text>
            <Text>{this.state.pushEvent.payload.ref.replace('ref/heads')}</Text>
            <Text>at {this.state.pushEvent.repo.name}</Text>

            <ListView
              contentInset={{top: -50}}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)} />

          </View>
      )
  }
}

module.exports = PushPayload;


    