import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import Swal from 'sweetalert2'; 
import 'boxicons/css/boxicons.min.css';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Verificar si hay un usuario guardado en localStorage al cargar el componente
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true'; // Convertir de string a boolean

    if (savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(savedRememberMe);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Comprobar si el usuario existe en localStorage
    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
      Swal.fire({
        title: 'Error',
        text: 'Correo o contraseña incorrectos.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      // Limpiar los campos de email y contraseña después de un error
      setEmail('');
      setPassword('');
      return;
    }

    const user = JSON.parse(storedUser);

    // Verificar si la contraseña es correcta
    if (user.password === password) {
      // Si las credenciales son correctas, guardar en localStorage y redirigir
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', rememberMe);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }

      // Limpiar los campos después del login exitoso
      setEmail('');
      setPassword('');

      // Alerta de éxito en el inicio de sesión
      Swal.fire({
        title: 'Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Redirigir según el rol del usuario
        if (user.role === "administrador") {
          navigate('/administrador');
        } else if (user.role === "empleado") {
          navigate('/empleado');
        } else if (user.role === "vigilante") {
          navigate('/vigilante');
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Rol de usuario no válido.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });

    } else {
      Swal.fire({
        title: 'Error',
        text: 'Correo o contraseña incorrectos.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      // Limpiar los campos de email y contraseña después de un error
      setEmail('');
      setPassword('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si los campos están vacíos
    if (!email || !password) {
      Swal.fire({
        title: 'Campos vacíos',
        text: 'Por favor, ingresa tu correo y contraseña.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    handleLogin(e); // Llamamos a la función de login si los campos no están vacíos
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
            <p>En Seguriteck, nos especializamos en ofrecer soluciones avanzadas de vigilancia y protección para tu empresa. 
                    Contamos con tecnología de última generación y un equipo altamente capacitado para garantizar la seguridad y tranquilidad 
                    de tu negocio, empleados y clientes.
            </p>
            <div className="social-icons">
              <Link><i class="bx bxl-linkedin"></i></Link>
              <Link><i class="bx bxl-facebook"></i></Link>
              <Link><i class="bx bxl-instagram"></i></Link>
              <Link><i class="bx bxl-twitter"></i></Link>
            </div>
          </div>
        </div>

        <div className="logreg-box">
          <div className="form-box login">
            <form onSubmit={handleSubmit}>
              <h2>Sign In</h2>

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

              <div className="rember-forgot">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" className="btn">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
