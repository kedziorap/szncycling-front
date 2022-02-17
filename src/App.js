import { Route, Switch } from 'react-router-dom';
import './fontello/css/fontello.css';


import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/about" exact>
          <About/>
        </Route>
        <Route path="/contact" exact>
          <Contact/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
