import { FretboardProvider } from './context/FretboardContext';
import Header from './components/Header/Header';
import Sidebar from './components/SideBar/Sidebar';
import Fretboard from './components/Fretboard/Fretboard';
import ControlPanel from './components/ControlPanel/ControlPanel';
import './App.css';

function App() {
  return (
    <FretboardProvider>
      <div className="app-container">
        <Header />

        <div className="app__content">
          <div className="main-area">
            <Fretboard />
            <ControlPanel />
          </div>
          <Sidebar />
        </div>
      </div>

      {/* Overlay shown on small screens */}
      <div className="small-screen-overlay">
        <div className="small-screen-message">
          <h2>Please use a larger screen</h2>
          <p>
            This fretboard app isn’t available on small screens yet.  
            Try resizing your window or use our mobile apps in the App Store or Google Play.
          </p>
        </div>
      </div>
    </FretboardProvider>
  );
}

export default App;
