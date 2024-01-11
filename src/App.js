import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddCar from "./Cars/AddCar";
import EditCar from "./Cars/EditCar";
import ViewCar from "./Cars/ViewCar";
import Home from "./Pages/Home";
import NavBar from "./layout/NavBar";
import SearchCar  from "./Cars/SearchCar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addCar" element={<AddCar />} />
          <Route exact path="/editCar/:id" element={<EditCar />} />
          <Route exact path="/viewCar/:id" element={<ViewCar />} />
          <Route exact path="/searchCar/:val" element={<SearchCar/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
