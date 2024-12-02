import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, Routes, Route } from "react-router-dom"; 
import 'boxicons/css/boxicons.min.css';
import './empleado.css';
import Swal from 'sweetalert2'; // Importar SweetAlert2

// Componente Home
function Home() {
  const handleSubmit = (e) => {
    e.preventDefault();  // Evita el comportamiento predeterminado del formulario

    Swal.fire({
      icon: 'success',
      title: 'Solicitud Enviada',
      text: 'Tu solicitud ha sido enviada exitosamente.',
    });
  };

  return (
    <div className="emple-formulario">
      <form onSubmit={handleSubmit}>
        <h2>Formulario de Solicitud</h2>

        <label htmlFor="nombre">Nombre Completo:</label>
        <input type="text" id="nombre" required />

        <label htmlFor="identificacion">Número de Identificación:</label>
        <input type="text" id="identificacion" required />

        <label htmlFor="telefono">Teléfono:</label>
        <input type="tel" id="telefono" required />

        <label htmlFor="fechaPermiso">Fecha del Permiso:</label>
        <input type="date" id="fechaPermiso" required />

        <label htmlFor="tipoSolicitud">Tipo de Solicitud:</label>
        <select id="tipoSolicitud" required>
          <option value="permiso">Permiso</option>
          <option value="incapacidad">Incapacidad</option>
        </select>

        <label htmlFor="archivo">Subir Archivo:</label>
        <input type="file" id="archivo" required />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

// Componente About (Información General)
function About() {
  const data = [
    {
      nombre: "Juan Pérez",
      identificacion: "123456789",
      telefono: "987654321",
      direccion: "Av. Principal 123",
      area: "Recursos Humanos"
    },
  ];

  return (
    <div className="emple-about">
      <h2>Información General</h2>
      {data.map((item, index) => (
        <div key={index} className="emple-info-card">
          <div className="emple-info-item">
            <strong>Nombre:</strong> {item.nombre}
          </div>
          <div className="emple-info-item">
            <strong>Identificación:</strong> {item.identificacion}
          </div>
          <div className="emple-info-item">
            <strong>Teléfono:</strong> {item.telefono}
          </div>
          <div className="emple-info-item">
            <strong>Dirección:</strong> {item.direccion}
          </div>
          <div className="emple-info-item">
            <strong>Área:</strong> {item.area}
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente Contact
function Contact() {
  const handleSaveChanges = () => {
    Swal.fire({
      icon: 'info',
      title: 'Cambios Guardados',
      text: 'Tus cambios han sido guardados correctamente.',
    });
  };

  return (
    <div className="emple-formulario">
      <form>
        <h2>Modificar Información Básica</h2>

        <label htmlFor="nombre">Nombre Completo:</label>
        <input type="text" id="nombre" required />

        <label htmlFor="identificacion">Número de Identificación:</label>
        <input type="text" id="identificacion" required />

        <label htmlFor="telefono">Teléfono:</label>
        <input type="tel" id="telefono" required />

        <label htmlFor="direccion">Dirección:</label>
        <input type="text" id="direccion" required />

        <label htmlFor="pdf">Subir Documento PDF:</label>
        <input type="file" id="pdf" accept="application/pdf" required />

        <button type="button" onClick={handleSaveChanges}>Guardar Cambios</button>
      </form>
    </div>
  );
}

// Componente Bienvenida
function Bienvenida() {
  return (
    <div className="bienvenida-container">
      <div className="bienvenida-content">
        <h2>¡Bienvenido a la Plataforma de Gestión de Permisos e Incapacidades!</h2>
        <p>Estamos encantados de que estés aquí. Esta plataforma te permitirá gestionar tus permisos e incapacidades de forma rápida y sencilla.</p>
        <p><strong>¿Cómo usar la plataforma?</strong></p>
        <ul>
          <li><i className="bx bx-check-circle"></i> En la sección "Subir permisos o incapacidades", podrás enviar solicitudes de permisos o reportar incapacidades.</li>
          <li><i className="bx bx-check-circle"></i> En "Información general", encontrarás todos los detalles relacionados con tu perfil.</li>
          <li><i className="bx bx-check-circle"></i> En "Modificar información", podrás actualizar tus datos personales cuando sea necesario.</li>
        </ul>
        <p>Si necesitas ayuda adicional, no dudes en contactarnos. ¡Estamos aquí para ayudarte!</p>
      </div>
    </div>
  );
}

// Componente Empleado
function Empleado() {
  const navigate = useNavigate();

  // Función de logout
  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');
    
    Swal.fire({
      icon: 'warning',
      title: 'Has cerrado sesión',
      text: '¡Hasta pronto!',
    });

    navigate('/');
  };

  return (
    <div className="empleado-container">
      <header className="emple-navbar">
        <div className="emple-navbar-content">
          <a href="/empleado">
            <img src="/logo.png" alt="Logo" style={{ height: "75px", width: "auto" }} />
          </a>
        </div>
        <nav className="emple-nav-links">
          <Link to="/empleado/home" className="emple-nav-link">Subir permisos o incapacidades</Link>
          <Link to="/empleado/about" className="emple-nav-link">Información general</Link>
          <Link to="/empleado/contact" className="emple-nav-link">Modificar info general</Link>
          <Link className="emple-logout-button" onClick={handleLogout}>
            <i className="bx bx-log-out"></i>   Cerrar sesión
          </Link>
        </nav>
      </header>

      <div className="emple-container">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/" element={<Bienvenida />} /> {/* Ruta de bienvenida */}
        </Routes>
      </div>
    </div>
  );
}

export default Empleado;
