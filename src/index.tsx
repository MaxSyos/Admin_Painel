import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SidebarContextProvider } from "./store/sidebarContext";
import { LangContextProvider } from "./store/langContext";
import { ThemeContextProvider } from "./store/themeContext";
import { LoginContextProvider } from "./store/loginContext";
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <LangContextProvider>
    <Provider store={store} >

        <ThemeContextProvider>
          <SidebarContextProvider>
            <App />
          </SidebarContextProvider>
        </ThemeContextProvider>

    </Provider>
  </LangContextProvider>,
  document.getElementById("root")
);
