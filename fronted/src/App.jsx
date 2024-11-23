import { BrowserRouter as Router, } from 'react-router-dom';
import './App.css';
import RouterComponent from './routes/Routes';
import ContextProvider from './contextProvider/ContextProvider';

function App() {
  return (
    <>
    <Router>
      <ContextProvider>
      <RouterComponent />
      </ContextProvider>
    </Router>
    </>
  );
}

export default App;
