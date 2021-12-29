import { Routes, Route } from "react-router-dom";

import TypePage from "./pages/TypePage";
import ProfilePage from "./pages/ProfilePage";
import SingleMoviePage from "./pages/SingleMoviePage";
import SinglePersonPage from "./pages/SinglePersonPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<TypePage />} />

        <Route path="/:type" element={<TypePage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/person/:id" element={< SinglePersonPage /> } />
        <Route path="/:media_type/:id" element={<SingleMoviePage />} />
      </Routes>
    </>
  );
}

export default App;
