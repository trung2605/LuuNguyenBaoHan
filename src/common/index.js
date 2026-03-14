// common/index.js — Single entry-point for all common UI components

import SectionHeader from './SectionHeader';
import Section from './Section';
import AnimatedButton from './AnimatedButton';
import ExperienceCard from './ExperienceCard';
import PortfolioCard from './PortfolioCard';

// ReactBits Components
import SplitText from './SplitText';
import SpotlightCard from './SpotlightCard';
import ShinyText from './ShinyText';
import CloudinaryUploadWidget from './CloudinaryUploadWidget';
import Squares from './Squares';
import ScrollToTop from './ScrollToTop';
import Portal from './Portal';

export {
  SectionHeader
};
export {
  Section
};
export {
  AnimatedButton
};
export {
  ExperienceCard
};
export {
  PortfolioCard
};
export {
  ScrollToTop
};
export {
  Portal
};

// ReactBits
export {
  SplitText
};
export {
  SpotlightCard
};
export {
  ShinyText
};
export {
  CloudinaryUploadWidget
};
export {
  Squares
};

// Grouped exports
export const UI = {
  SectionHeader,
  Section,
  AnimatedButton,
  SplitText,
  ShinyText,
};

export const Cards = {
  Experience: ExperienceCard,
  Portfolio: PortfolioCard,
  Spotlight: SpotlightCard,
};