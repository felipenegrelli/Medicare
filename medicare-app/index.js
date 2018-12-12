/** @format */
let debug = require('debug');
debug.enable('axios');
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
