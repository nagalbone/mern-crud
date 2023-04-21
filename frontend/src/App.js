import HomePage from "./screens/HomePage";
import { Route, Routes } from "react-router-dom";
import AddUser from "./screens/AddUser";
import EditUser from "./screens/EditUser";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
