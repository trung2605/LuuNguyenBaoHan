import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import MainLayout from './layout/MainLayout/MainLayout';

// ── Pages ──────────────────────────────────────────────────
import HomePage from './pages/HomePage/HomePage';
import SkillExperiencePage from './pages/SkillExperiencePage/SkillExperiencePage';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import PortfolioDetailPage from './pages/PortfolioPage/PortfolioDetailPage';
import EducationPage from './pages/EducationPage/EducationPage';
import { ScrollToTop } from './common';

function App() {
  return (
    <ThemeContextProvider>
      <AppContextProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="experience" element={<SkillExperiencePage />} />
                <Route path="portfolio" element={<PortfolioPage />} />
                <Route path="portfolio/:id" element={<PortfolioDetailPage />} />
                <Route path="education" element={<EducationPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AppContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
