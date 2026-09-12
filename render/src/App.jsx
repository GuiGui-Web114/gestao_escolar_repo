import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './telas/loginScreen';
import CadastroEscolarScreens from './telas/cadastroEscolarScreen';
import Dashboard from './telas/dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path='/cadastroEscolar' element={<CadastroEscolarScreens />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
