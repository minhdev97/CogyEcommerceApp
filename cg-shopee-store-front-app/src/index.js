import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from "./component/GlobalStyles";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.min.css';                       // core css
import 'primeicons/primeicons.css';
import {Provider} from "react-redux";
import {store} from "./app/store";                                 // icons

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <GlobalStyles>
                 <App />
        </GlobalStyles>
    </Provider>
);

reportWebVitals();
