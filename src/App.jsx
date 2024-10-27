import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Ecommerce from './pages/Ecommerce';
import Invoice from './pages/Invoice';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
