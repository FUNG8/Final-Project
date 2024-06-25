
import TemporaryDrawer from './components/navbar';

import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import DoctorLogin from './pages/doctorLogin';
import History from './pages/history';
import Favourite from './pages/favourite';
import PatientHome from './pages/patientHomePage';

function App() {

  return (

    <div className="App">
      <TemporaryDrawer />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/doctsorlogin" element={<DoctorLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/patientHome" element={<PatientHome />} />

      </Routes>
    </div>

  );
}

export default App;
