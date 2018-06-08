import { NavigationLeafRoute, NavigationParams, NavigationRouteConfigMap, NavigationScreenProp, NavigationState, StackNavigator } from 'react-navigation';

import Home from '@Components/Home';

export type Navigation = NavigationScreenProp<NavigationLeafRoute | (NavigationLeafRoute & NavigationState), NavigationParams>;

const routes: any | NavigationRouteConfigMap = {
    Home: {
        path: 'Home',
        screen: Home
    },
};

export default StackNavigator(routes, {
    initialRouteName: 'Home',
    navigationOptions: {
        header: null
    }
});