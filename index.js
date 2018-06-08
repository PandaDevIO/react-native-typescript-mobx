import App from './src/App';
import { AppRegistry } from 'react-native';
import { useStrict } from 'mobx';

useStrict(true);

AppRegistry.registerComponent('reactnativerepo', () => App);
