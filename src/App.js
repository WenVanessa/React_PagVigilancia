import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Registro";
import Administrador from "./Administrador";
import Empleado from "./Empleado";
import Vigilante from "./Vigilante";
import ProtectedRoute from "./ProtectedRoute"; 
import Documentos from "./VistasAdmi/Documentos";
import Empleados from "./VistasAdmi/Empleados";
import Estadisticas from "./VistasAdmi/Estadisticas";
import PerfilAdmin from "./VistasAdmi/PerfilAdmin";
import Registros from "./VistasAdmi/Registros";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública de Login y Registro */}
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* Rutas protegidas, solo accesibles si el usuario está autenticado */}
        <Route path="/administrador" element={<ProtectedRoute><Administrador /></ProtectedRoute>} />
        <Route path="/empleado/*" element={<ProtectedRoute><Empleado /></ProtectedRoute>} />
        <Route path="/vigilante" element={<ProtectedRoute><Vigilante /></ProtectedRoute>} />

        {/* Enrutamientos para la vista de Administrador */}
        <Route path="/Documentos" element={<Documentos />} />
        <Route path="/Empleados" element={<Empleados />} />
        <Route path="/Estadisticas" element={<Estadisticas />} />
        <Route path="/PerfilAdmi" element={<PerfilAdmin />} />
        <Route path="/Registros" element={<Registros />} />

      </Routes>
    </Router>
  );
}

export default App;

