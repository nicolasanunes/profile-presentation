import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePresentation from './pages/profile-presentation/ProfilePresentation.jsx'
import CreateProfile from './pages/create-profile/CreateProfile.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ProfilePresentation />} />
        <Route path="/create-profile" element={<CreateProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App