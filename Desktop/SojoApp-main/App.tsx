import "react-native-gesture-handler"
import React from 'react';
import {Provider} from "react-redux";
import store from "./src/reduxStore/store";
import AppEntry from "./AppEntry";
import {enableLatestRenderer} from 'react-native-maps';
import {NavigationContainer} from "@react-navigation/native";

enableLatestRenderer()

const App :React.FC = () => {
     return (
          <Provider store={store}>
               <NavigationContainer>
                    <AppEntry/>
               </NavigationContainer>
          </Provider>
     );
};

export default App;
