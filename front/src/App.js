import { Route, Routes } from "react-router-dom";
import EditData from "./components/EditData";
import Login from "./components/Login";
import Register from "./components/Register";
import AddData from "./components/AddData";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      {/* <h1>Mahdy Mubasyir</h1> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add' element={<AddData />} />
        <Route path='/edit/:id' element={<EditData />} />
      </Routes>
    </div>
  );
}

export default App;
