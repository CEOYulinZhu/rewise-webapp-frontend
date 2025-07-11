import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InstantScrollReset from './components/InstantScrollReset';
import Index from './pages/Index';
import Overview from './pages/Overview';
import CreativeDetail from './pages/CreativeDetail';
import RecycleDetail from './pages/RecycleDetail';
import TradingDetail from './pages/TradingDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import EditProfile from './pages/EditProfile';
import UserAgreement from './pages/UserAgreement';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import Favorites from './pages/Favorites';
import History from './pages/History';

function App() {
  // 根据环境变量确定 basename
  const basename = import.meta.env.PROD ? '/rewise' : '/';

  return (
    <Router basename={basename}>
      <InstantScrollReset />
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/detail/creative" element={<CreativeDetail />} />
          <Route path="/detail/recycle" element={<RecycleDetail />} />
          <Route path="/detail/trading" element={<TradingDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/user-agreement" element={<UserAgreement />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
