import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainLayout from './components/MainLayout';
import HomePage from './pages/home-page/HomePage';
import {AddServiceProviderPage} from './pages/add-service-provider-page/AddServiceProviderPage';
import {LoginPage} from './pages/login-page/LoginPage';
import {TermsOfServicePage} from './pages/text-pages/TermsOfServicePage';
import {PrivacyPolicyPage} from './pages/text-pages/PrivacyPolicyPage';
import {RegisterPage} from './pages/register-page/RegisterPage';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="add-service-provider" element={<AddServiceProviderPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="terms-of-service" element={<TermsOfServicePage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="features" element={<div>Funkcje</div>} />
            <Route path="about" element={<div>O Nas</div>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;