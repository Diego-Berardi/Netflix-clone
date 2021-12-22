import { Routes, Route } from "react-router-dom";

import SearchPage from "./pages/SearchPage";
import TypePage from "./pages/TypePage";
import ProfilePage from "./pages/ProfilePage";
import SingleMoviePage from "./pages/SingleMoviePage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<TypePage />} />

        <Route path="/:type" element={<TypePage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/:media_type/:id" element={<SingleMoviePage />} />
      </Routes>
    </>
  );
}

export default App;
