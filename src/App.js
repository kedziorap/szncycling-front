import { Route, Switch } from 'react-router-dom';
import './fontello/css/fontello.css';
import useTranslator from './hooks/use-translator';
import { useTranslation } from "react-i18next";
import Layout from './components/Layout/Layout';

function App() {
  const content = useTranslator('content_home');
  const { t } = useTranslation();
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {content}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
