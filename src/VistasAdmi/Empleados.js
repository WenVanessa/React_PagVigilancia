import React, { useState } from 'react';
import Navbar from '../VistasAdmi/Navbar';
import '../css/Empleados.css';

function Empleados() {
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: 'Juan Pérez', area: 'IT', entrada: '07:00', salida: '17:00', estado: 'A tiempo' },
    { id: 2, nombre: 'María García', area: 'Recursos Humanos', entrada: '08:15', salida: '17:30', estado: 'Tardanza' },
    { id: 3, nombre: 'Carlos López', area: 'Ventas', entrada: '07:30', salida: '17:00', estado: 'A tiempo' },
    { id: 4, nombre: 'Ana Martínez', area: 'IT', entrada: '07:05', salida: '17:10', estado: 'A tiempo' },
    { id: 5, nombre: 'Pedro Sánchez', area: 'Ventas', entrada: '08:30', salida: '17:45', estado: 'Tardanza' }
  ]);

  const [empleadoEditando, setEmpleadoEditando] = useState(null); // Estado para el empleado que se está editando

  // Función para agregar un nuevo empleado
  const handleAddEmployee = (empleado) => {
    setEmpleados([...empleados, { ...empleado, id: empleados.length + 1 }]);
  };

  // Función para editar un empleado
  const handleEditEmployee = (id, updatedEmpleado) => {
    setEmpleados(empleados.map((empleado) =>
      empleado.id === id ? { ...empleado, ...updatedEmpleado } : empleado
    ));
    setEmpleadoEditando(null); // Limpiar después de editar
  };

  // Función para eliminar un empleado
  const handleDeleteEmployee = (id) => {
    setEmpleados(empleados.filter(empleado => empleado.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <header className="header-admi">
          <h1>Empleados</h1>
          <p>Bienvenido Administrador</p>
        </header>

        {/* Tabla de empleados */}
        <table className="employee-table">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Área</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.length > 0 ? (
              empleados.map((empleado) => (
                <tr key={empleado.id}>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.area}</td>
                  <td>{empleado.entrada}</td>
                  <td>{empleado.salida}</td>
                  <td className={empleado.estado === 'A tiempo' ? 'status-a-tiempo' : 'status-tardanza'}>
                    {empleado.estado}
                  </td>
                  <td>
                    {/* Botones para editar y eliminar */}
                    <button onClick={() => setEmpleadoEditando(empleado)}>Editar</button>
                    <button onClick={() => handleDeleteEmployee(empleado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No se encontraron empleados</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Formulario para agregar o editar empleados */}
        <div className="add-employee-form">
          <h3>{empleadoEditando ? 'Editar empleado' : 'Registrar nuevo empleado'}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newEmpleado = {
                nombre: e.target.nombre.value,
                area: e.target.area.value,
                entrada: e.target.entrada.value,
                salida: e.target.salida.value,
                estado: e.target.estado.value
              };

              if (empleadoEditando) {
                // Si estamos editando, actualizamos al empleado existente
                handleEditEmployee(empleadoEditando.id, newEmpleado);
              } else {
                // Si estamos agregando, añadimos un nuevo empleado
                handleAddEmployee(newEmpleado);
              }

              setEmpleadoEditando(null); // Limpiar después de guardar
            }}
          >
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              defaultValue={empleadoEditando ? empleadoEditando.nombre : ''}
              required
            />
            <select name="area" defaultValue={empleadoEditando ? empleadoEditando.area : ''} required>
              <option value="IT">IT</option>
              <option value="Ventas">Ventas</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Vigilante">Vigilante</option>
              <option value="Empleados">Empleados</option>
            </select>
            <input
              type="time"
              name="entrada"
              defaultValue={empleadoEditando ? empleadoEditando.entrada : ''}
              required
            />
            <input
              type="time"
              name="salida"
              defaultValue={empleadoEditando ? empleadoEditando.salida : ''}
              required
            />
            <select name="estado" defaultValue={empleadoEditando ? empleadoEditando.estado : ''} required>
              <option value="A tiempo">A tiempo</option>
              <option value="Tardanza">Tardanza</option>
            </select>
            <button type="submit">{empleadoEditando ? 'Guardar cambios' : 'Agregar'}</button>
          </form>
        </div>

        {/* Botones de acción */}
        <div className="actions">
          <button><span className="clock-icon">⏰</span>Marcar hora</button>
          <button><span className="excel-icon">📊</span>Exportar a Excel</button>
        </div>
      </div>
    </>
  );
}

export default Empleados;
