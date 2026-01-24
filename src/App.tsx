import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import RecipeDetails from "./pages/RecipeDetails"
import Navbar from "./components/Navbar"
import Favourites from "./pages/Favourites"

const App = () => {
  
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourite" element={<Favourites />}/>
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  )

}


export default App