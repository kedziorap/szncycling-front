import { Route, Switch } from 'react-router-dom';
import './fontello/css/fontello.css';

import Layout from './components/Layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          Hello App!
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
