import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';  // Asegúrate de importar SweetAlert2
import './Login.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('empleado');  // Por defecto, rol 'empleado'
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Verificar si los campos están vacíos
    if (!email || !password || !confirmPassword) {
      Swal.fire({
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Comprobar si el correo ya está registrado
    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      Swal.fire({
        title: 'Error',
        text: 'Este correo ya está registrado.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Crear el nuevo usuario
    const newUser = { email, password, role };
    localStorage.setItem(email, JSON.stringify(newUser)); // Guardar el usuario en localStorage

    // Alerta de éxito en el registro
    Swal.fire({
      title: '¡Registro Exitoso!',
      text: 'Usuario registrado exitosamente.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      // Limpiar los campos después del registro exitoso
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      navigate("/"); // Redirigir a la página de inicio ("/") después de registrar
    });
  };

  return (
    <div>
      <div className="background"></div>

      <div className="container">
        <div className="content">
          <h2 className="logo">
            <img src="logo.png" alt="Logo" style={{ height: "65px", width: "auto" }} />
          </h2>
          <div className="text-sci">
            <h2>
              SEGURITECK <br />
              <span>Tu aliado en seguridad empresarial.</span>
            </h2>
            <p>
              Regístrate para acceder a las soluciones avanzadas de vigilancia y protección.
            </p>
          </div>
        </div>

        <div className="logreg-box">
          <div className="form-box register">
            <form onSubmit={handleRegister}>
              <h2>Register</h2>

              <div className="input-box">
                <span className="icon">
                  <i className="bx bxs-envelope"></i>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email</label>
              </div>

              <div className="input-box">
                <span className="icon">
                  <i className="bx bxs-lock-alt"></i>
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password</label>
              </div>

              <div className="input-box">
                <span className="icon">
                  <i className="bx bxs-lock-alt"></i>
                </span>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label>Confirm Password</label>
              </div>

              <div className="input-box">
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="empleado">Empleado</option>
                  <option value="administrador">Administrador</option>
                  <option value="vigilante">Vigilante</option>
                </select>
                <label>Role</label>
              </div>

              <button type="submit" className="btn">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
  