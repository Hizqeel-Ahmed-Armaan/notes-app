import { Routes } from "react-router"
import { Route } from "react-router";
import Homepage from './pages/homepage.jsx'
import Createpage from "./pages/createpage.jsx";
import NoteDetailPage from "./pages/noteDetailPage.jsx";

function App() {
   

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />

      </Routes>
    </>
  )
}

export default App
