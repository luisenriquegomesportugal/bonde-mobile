import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Authentication from './pages/Authentication';
import Detail from './pages/Detail';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import Search from './pages/Search';

export default createAppContainer(
    createSwitchNavigator({
        Authentication,
        Login,
        NewUser,
        Search,
        Detail
    })
);