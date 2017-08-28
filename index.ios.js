import { AppRegistry } from 'react-native'
import Orientation from 'react-native-orientation'
import Ashure from './src/'

Orientation.lockToLandscape()

AppRegistry.registerComponent('ashure', () => Ashure)
