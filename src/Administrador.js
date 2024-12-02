import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './css/Administrador.css';
import Navbar from './VistasAdmi/Navbar'; 
import RegistrosTable from './VistasAdmi/RegistrosTable'; 
import { EmpleadoForm } from "./VistasAdmi/EmpleadoForm";
import Estadisticas from "./VistasAdmi/Estadisticas";
import { Users, Clock, FileText } from "react-feather"; // Íconos

// Componente Card personalizado
const Card = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex flex-row items-center justify-between pb-2">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-sm font-medium">{children}</h2>
);

const CardContent = ({ children }) => (
  <div>{children}</div>
);

function Administrador() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("registros"); // Estado para las pestañas

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');
    navigate('/');
  };

  return (
    <>
      {/* Navbar en el lado izquierdo */}
      <Navbar />

      {/* Contenedor principal */}
      <div className="content">
        <header className="header-admi">
          <h1>Panel de Administración</h1>
          <p>Bienvenido Administrador</p>
        </header>

        {/* Contenido adicional */}
        <div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Empleados</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">
                  +2 desde el último mes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Entradas Hoy</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">
                  95% de asistencia
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentos Pendientes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  -2 desde la semana pasada
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Component */}
          <div className="tab-container">
            <button
              className={`tab ${activeTab === "registros" ? "active" : ""}`}
              onClick={() => setActiveTab("registros")}
            >
              Registros
            </button>
            <button
              className={`tab ${activeTab === "empleados" ? "active" : ""}`}
              onClick={() => setActiveTab("empleados")}
            >
              Nuevo Empleado
            </button>
            <button
              className={`tab ${activeTab === "estadisticas" ? "active" : ""}`}
              onClick={() => setActiveTab("estadisticas")}
            >
              Estadísticas
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "registros" && <RegistrosTable />}
            {activeTab === "empleados" && <EmpleadoForm />}
            {activeTab === "estadisticas" && <Estadisticas />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Administrador;