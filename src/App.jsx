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
        {/* Main horizontal layout: main-area + sidebar */}
        <div className="app__content">
          {/* Main content area: Fretboard + ControlPanel */}
          <div className="main-area">
           <Fretboard />
            <ControlPanel />
         </div>

         {/* Sidebar on the right */}
         <Sidebar />
        </div>
        </div>
    </FretboardProvider>
  );
}

export default App;
