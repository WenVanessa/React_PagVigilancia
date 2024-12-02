import React, { useState, useEffect } from 'react';
import Navbar from '../VistasAdmi/Navbar';
import '../css/PerfilAdmi.css';
import Swal from 'sweetalert2';

function PerfilAdmin() {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    // Retrieve the user's data from localStorage
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = JSON.parse(localStorage.getItem(userEmail));
      setUserProfile(userInfo);
      setNombre(userInfo.nombre);
      setIdentificacion(userInfo.identificacion);
      setTelefono(userInfo.telefono);
      setEmail(userInfo.email);
      setDireccion(userInfo.direccion);
      setPassword(userInfo.password);
      setRole(userInfo.role);
    }
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Los cambios se guardarán en tu perfil.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUserInfo = {
          nombre,
          identificacion,
          telefono,
          email,
          direccion,
          password,
          role: userProfile.role, // Mantener el rol existente
        };

        // Actualizar los datos del usuario en localStorage
        localStorage.setItem(email, JSON.stringify(updatedUserInfo));

        setUserProfile(updatedUserInfo);
        setIsEditing(false);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <header className="header-admi">
          <h1>Mi Perfil</h1>
          <p>Bienvenido Administrador</p>
        </header>
        {userProfile && (
          <div className="profile-container">
            <div className="profile-info">
              <h2>Información Personal</h2>
              {isEditing ? (
                <>
                  <div className="profile-field">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="profile-field">
                    <label>Identificación:</label>
                    <input
                      type="text"
                      value={identificacion}
                      onChange={(e) => setIdentificacion(e.target.value)}
                    />
                  </div>
                  <div className="profile-field">
                    <label>Teléfono:</label>
                    <input
                      type="text"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </div>
                  <div className="profile-field">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="profile-field">
                    <label>Dirección:</label>
                    <input
                      type="text"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                    />
                  </div>
                  <div className="profile-field">
                    <label>Contraseña:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="profile-field">
                    <label>Rol:</label>
                    <span>{userProfile.role}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="profile-field">
                    <label>Nombre:</label>
                    <span>{userProfile.nombre}</span>
                  </div>
                  <div className="profile-field">
                    <label>Identificación:</label>
                    <span>{userProfile.identificacion}</span>
                  </div>
                  <div className="profile-field">
                    <label>Teléfono:</label>
                    <span>{userProfile.telefono}</span>
                  </div>
                  <div className="profile-field">
                    <label>Email:</label>
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="profile-field">
                    <label>Dirección:</label>
                    <span>{userProfile.direccion}</span>
                  </div>
                  <div className="profile-field">
                    <label>Contraseña:</label>
                    <span>********</span>
                  </div>
                  <div className="profile-field">
                    <label>Rol:</label>
                    <span>{userProfile.role}</span>
                  </div>
                </>
              )}
            </div>
            {isEditing ? (
              <button className="edit-profile-btn" onClick={handleSaveProfile}>
                Guardar Cambios
              </button>
            ) : (
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                Editar Perfil
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default PerfilAdmin;