import { Routes, Route } from "react-router-dom";

import TypePage from "./pages/home-page/TypePage";
import SingleMoviePage from "./pages/single-movie-page/SingleMoviePage";
import SinglePersonPage from "./pages/single-person-page/SinglePersonPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<TypePage />} />

        <Route path="/:type" element={<TypePage />} />

        <Route path="/person/:id" element={<SinglePersonPage />} />
        <Route path="/:media_type/:id" element={<SingleMoviePage />} />
      </Routes>
    </>
  );
}

export default App;
