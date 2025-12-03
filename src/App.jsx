import { FretboardProvider } from './context/FretboardContext';
import Header from './components/Header/Header';
import Sidebar from './components/SideBar.jsx/Sidebar';
import Fretboard from './components/Fretboard/Fretboard';
import './App.css';

function App() {
  return (
    <FretboardProvider>
      <Header />
      <div style={{ display: 'flex', height: '100vh' }}>
        <Fretboard />
        <Sidebar />
      </div>
    </FretboardProvider>
  );
}

export default App;
