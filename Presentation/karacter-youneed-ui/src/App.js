import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainLayout from './components/MainLayout';
import HomePage from './pages/home-page/HomePage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="features" element={<div>Funkcje</div>} />
            <Route path="about" element={<div>O Nas</div>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;