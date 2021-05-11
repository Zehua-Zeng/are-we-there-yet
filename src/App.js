import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import GlobalStyle from './Theme';
// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

// local components and screens
import {CoverageScreen} from './screens';
import {Header, Footer} from './components';


function App() {
  return (
    <Router>
      <GlobalStyle />
      <main>
        <Header />
        <Switch>
          <Route path="/" exact component={CoverageScreen} />
        </Switch>
        <Footer />
      </main>
    </Router>
      
  );
}

export default App;
