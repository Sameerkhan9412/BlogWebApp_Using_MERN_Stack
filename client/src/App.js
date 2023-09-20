import logo from './logo.svg';
import './App.css';
import Login from './components/sameer/Login';
// import { Toaster } from 'react-hot-toast';
import toast, { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import DataProvider from './context/DataProvider';

function App() {
  return (
    <div style={{marginTop:64}}>
      <DataProvider>
      <Toaster/>
      <Home/>
     <Login/>
     </DataProvider>
    </div>
  );
}

export default App;
