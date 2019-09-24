import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from './pages/Main';
import Chat from './pages/Chat';

const Routes = createAppContainer(
  createSwitchNavigator({
    Chat,
    Main,
  }),
);

export default Routes;
