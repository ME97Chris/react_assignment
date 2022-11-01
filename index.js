import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('X', () => App);

if (Platform.OS === 'android') {
    const rootTag = document.getElementById('root') || document.getElementById('X');
    AppRegistry.runApplication('X', { rootTag });
}