import {  FretboardProvider } from "./context/FretboardContext";
import Header from './components/Header/Header';
import SidebarLeft from './components/SideBar.jsx/SidebarLeft';
import Fretboard from "./components/Fretboard/Fretboard";
import './App.css'

function App() {

  return (
   <FretboardProvider>
    <Header />  
    <div style= {{display: "flex", height: "100vh"}}>
      <Fretboard />
      <SidebarLeft />
    </div>
   </FretboardProvider>
  );
}

export default App
