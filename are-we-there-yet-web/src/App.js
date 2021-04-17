// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
// style for all the tag inputs
// Read more: https://betterstack.dev/projects/react-tag-input/
import "@pathofdev/react-tag-input/build/index.css";
// local components and screens
import {CoverageScreen} from './screens';
import {Header, Footer} from './components';
// styled component
import styled from 'styled-components';

// Global styles
const StyledApp = styled.div`   
    :root {
        box-sizing: border-box;
        font-size: 62.5%;
    }

    *,
    ::before,
    ::after {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
    }

    body {
      height: 100vh;
    }
`;

function App() {
  return (
    <StyledApp className="App">
      <Header />
      <CoverageScreen />
      <Footer />
    </StyledApp>
  );
}

export default App;
