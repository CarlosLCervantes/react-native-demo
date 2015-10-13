var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

const AUTH_KEY = 'auth';
const USER_KEY = 'user';

class AuthService {
	getAuthInfo(cb) {
		AsyncStorage.multiGet([AUTH_KEY, USER_KEY], (err, val) => {
			if(err) {
				return cb(err);
			}

			if(!val) {
				return cb();
			}

			var zippedObj = _.zipObject(val);
			if(!zippedObj[AUTH_KEY]) {
				return cb();
			}

			var authInfo = {
				header: {
					Authorization: 'Basic ' + zippedObj[AUTH_KEY]
				},
				user: JSON.parse(zippedObj[USER_KEY])
			}

			return cb(null, authInfo);
		});
	}

	login(creds, cb) {
		var b = new buffer.Buffer(creds.username + ':' + creds.password);
		var encodedAuth = b.toString('base64');
		console.log(encodedAuth);

		fetch('https://api.github.com/user', {
			headers : {
				'Authorization' : 'Basic ' + encodedAuth
			}
		})
		.then((response) => {
			if(response.status >= 200 && response.status < 300) {
				return response;
			}

			throw {
				badCredentials: response.status == 401,
				unknownError: response.status != 401
			}
		})
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			console.log(result);
			AsyncStorage.multiSet([
				[AUTH_KEY, encodedAuth],
				[USER_KEY, JSON.stringify(result)]
			], (err)=> {
				if(err) {
					throw err;
				}
				return cb({success: true})
			});
		})
		.catch((err) => {
			console.log("Login failed" + err);
			return cb(err);
		})
		.finally(() => {
			return cb({showProgress: false});
		})
	}
}

module.exports = new AuthService();