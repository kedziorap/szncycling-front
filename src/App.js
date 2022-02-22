import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';

import Layout from './components/Layout/Layout';
import Loader from './components/UI/Loader';

const Home = React.lazy(()=>import('./pages/Home'));
const Contact = React.lazy(()=>import('./pages/Contact'));
const About = React.lazy(()=>import('./pages/About'));
const Tracks = React.lazy(()=>import('./pages/Tracks'));
const OneTrack = React.lazy(()=>import('./pages/OneTrack'));
const NotFound = React.lazy(()=>import('./pages/NotFound'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader/>}>
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
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
