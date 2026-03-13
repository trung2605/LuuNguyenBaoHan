import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import MainLayout from './layout/MainLayout/MainLayout';

// ── Pages ──────────────────────────────────────────────────
import HomePage from './pages/HomePage/HomePage';
import ExperiencePage from './pages/ExperiencePage/ExperiencePage';
import SkillsPage from './pages/SkillsPage/SkillsPage';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import EducationPage from './pages/EducationPage/EducationPage';

function App() {
  return (
    <ThemeContextProvider>
      <AppContextProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="experience" element={<ExperiencePage />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="portfolio" element={<PortfolioPage />} />
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
