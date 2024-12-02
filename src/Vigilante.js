import React, { useState } from "react";
import "./Vigilante.css";

function Vigilante() {
  const [section, setSection] = useState("inicio");

  const handleLogout = () => {
    // Limpiar los datos de autenticación en localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("rememberMe");

    // Redirigir al Login
    window.location.href = "/";
  };

  return (
    <div className="vigilante-container">
      <nav className="emple-navbar">
        <div className="emple-navbar-content">
          <a href="/empleado">
            <img src="/logo.png" alt="Logo" className="navbar-logo" />
          </a>
        </div>
        <ul className="navbar-links">
          <li onClick={() => setSection("inicio")}>Inicio</li>
          <li onClick={() => setSection("modificar")}>Modificar Información</li>
          <li onClick={() => setSection("entradas")}>Registrar Entradas</li>
          <li onClick={() => setSection("buscar")}>Buscar Empleados</li>
          <li onClick={() => setSection("visualizar")}>Información General</li>
          <li onClick={handleLogout}>Cerrar Sesión</li>
        </ul>
      </nav>

      <div className="content">
        {section === "inicio" && (
          <div>
            <h2>Bienvenido, Vigilante</h2>
            <p>Seleccione una opción del menú para comenzar.</p>
          </div>
        )}

        {section === "modificar" && (
          <div>
            <h2>Modificar Información Básica</h2>
            <form>
              <label>Nombre:</label>
              <input type="text" placeholder="Ingrese su nombre" />
              <label>Teléfono:</label>
              <input type="tel" placeholder="Ingrese su teléfono" />
              <label>Correo:</label>
              <input type="email" placeholder="Ingrese su correo" />
              <button type="submit">Guardar Cambios</button>
            </form>
          </div>
        )}

        {section === "entradas" && (
          <div>
            <h2>Registrar Entradas y Salidas</h2>
            <p>Seleccione el tipo de entrada:</p>

            {/* Dropdown para seleccionar tipo de entrada */}
            <select className="dropdown">
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>

            {/* Lista de empleados con autorización */}
            <p>Lista de empleados con autorización:</p>
            <ul>
              <li>Juan Pérez</li>
              <li>Ana García</li>
              <li>Pedro Martínez</li>
            </ul>

            <button>Registrar</button>
          </div>
        )}

        {section === "buscar" && (
          <div>
            <h2>Buscar Empleados</h2>
            <input type="text" placeholder="Buscar por nombre o ID" />
            <button>Buscar</button>

            {/* Tabla de ejemplo con empleados */}
            <table className="empleados-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Juan Pérez</td>
                  <td>juan.perez@email.com</td>
                  <td>+123456789</td>
                  <td>
                    <button className="edit-button">Editar</button>
                    <button className="delete-button">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Ana García</td>
                  <td>ana.garcia@email.com</td>
                  <td>+987654321</td>
                  <td>
                    <button className="edit-button">Editar</button>
                    <button className="delete-button">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {section === "visualizar" && (
          <div>
            <h2>Información General</h2>
            <p>Aquí puedes visualizar la información relevante.</p>

            {/* Card con estadísticas */}
            <div className="info-card">
              <h3>Estadísticas del día</h3>
              <ul>
                <li>Entradas registradas: 15</li>
                <li>Empleados activos: 40</li>
                <li>Empleados en espera: 5</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vigilante;
