import ReactDOM from 'react-dom';
import App from './App';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/index';
import './i18n';
import './index.scss';

import Loader from './components/UI/Loader';

ReactDOM.render(
  <Suspense fallback={<Loader initial />}>
    <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
    </BrowserRouter>
  </Suspense>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
