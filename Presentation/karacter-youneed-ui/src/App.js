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
import ActivateServiceProviderPage from './pages/activate-service-provider-page/ActivateServiceProviderPage';
import { Notifications } from '@mantine/notifications';
import { ProtectedRoute } from './components/ProtectedRoute';
import ServiceProviderDashboardPage from './pages/service-provider-dashboard-page/ServiceProviderDashboardPage';
import { AdminDashboard } from './components/admin-dashboard/AdminDashboard';
import { ChangePasswordPage } from './pages/change-password/ChangePasswordPage';
import { ResetPasswordPage } from './pages/reset-password-page/ResetPasswordPage';

function App() {
  return (
    <Provider store={store}>
      <Notifications
        position="top-right"
        zIndex={9999999}
        autoClose={4000}
        limit={5}
        containerWidth={320}
        style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999999 }}
        styles={(theme) => ({
          root: {
            position: 'fixed',
            top: 20,
            right: 20,
            width: 320,
            zIndex: 9999999,
            '&::before': {
              backgroundColor: 'transparent',
            },
          },
          notification: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            border: `1px solid ${theme.colors.gray[2]}`,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            '&[data-type="success"]': {
              backgroundColor: 'rgba(220, 252, 231, 0.95)',
              borderColor: theme.colors.green[3],
            },
            '&[data-type="error"]': {
              backgroundColor: 'rgba(254, 226, 226, 0.95)',
              borderColor: theme.colors.red[3],
            },
          },
          title: {
            fontWeight: 600,
            fontSize: '1rem',
            marginBottom: '0.25rem',
          },
          description: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
          closeButton: {
            color: theme.colors.gray[6],
            '&:hover': {
              backgroundColor: 'transparent',
              color: theme.colors.gray[7],
            },
          },
        })}
      />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="activation/:id" element={<ActivateServiceProviderPage />} />
            <Route path="add-service-provider" element={<AddServiceProviderPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            
            {/* Chronione routy */}
            <Route path="service-provider/*" element={
              <ProtectedRoute>
                <ServiceProviderDashboardPage />
              </ProtectedRoute>
            } />

            <Route path="admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/account/change-password" element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            } />
 
            {/* Publiczne routy */}
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