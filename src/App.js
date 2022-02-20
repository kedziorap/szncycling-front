import { Route, Switch } from 'react-router-dom';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Tracks from './pages/Tracks';
import OneTrack from './pages/OneTrack';
import Loader from './components/UI/Loader';
import AppContext from './store/app-context';
function App() {
  const ctxApp = useContext(AppContext);
  const {setLoadingLang, loadingLang} = ctxApp;
  const { i18n } = useTranslation();
  i18n.on('languageChanged', () => {
    setLoadingLang(false)
  });
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/tracks" exact>
          <Tracks />
        </Route>
        <Route path="/tracks/:id" exact>
          <OneTrack />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
      </Switch>
      {loadingLang && <Loader fullWindow/>}
    </Layout>
  );
}

export default App;
