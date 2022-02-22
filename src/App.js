import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Tracks from './pages/Tracks';
import OneTrack from './pages/OneTrack';
import NotFound from './pages/NotFound';
function App() {

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
        <Route path="/*" exact>
          <NotFound/>
        </Route>
      </Switch>

    </Layout>
  );
}

export default App;
