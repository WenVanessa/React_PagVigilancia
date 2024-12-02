import React, { useState } from 'react';
import Navbar from '../VistasAdmi/Navbar';
import '../css/Registros.css';
import { FaSearch, FaFileExcel } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import * as XLSX from 'xlsx'; // Importamos la librería xlsx

function Registros() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Lista de empleados
  const empleados = [
    { nombre: 'Juan Pérez', area: 'IT', entrada: '07:00', salida: '17:00', estado: 'A tiempo' },
    { nombre: 'María García', area: 'Recursos Humanos', entrada: '08:15', salida: '17:30', estado: 'Tardanza' },
    { nombre: 'Carlos López', area: 'Ventas', entrada: '07:30', salida: '17:00', estado: 'A tiempo' },
    { nombre: 'Ana Martínez', area: 'IT', entrada: '07:05', salida: '17:10', estado: 'A tiempo' },
    { nombre: 'Pedro Sánchez', area: 'Ventas', entrada: '08:30', salida: '17:45', estado: 'Tardanza' }
  ];

  // Filtrar empleados según el término de búsqueda y la hora de entrada
  const filteredEmpleados = empleados.filter(empleado => {
    const matchesSearch = empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTime = selectedTime ? empleado.entrada.startsWith(selectedTime) : true;
    return matchesSearch && matchesTime;
  });

  // Función para exportar a Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredEmpleados); // Convertimos los datos a una hoja de Excel
    const wb = XLSX.utils.book_new(); // Creamos un libro de Excel
    XLSX.utils.book_append_sheet(wb, ws, 'Registros'); // Agregamos la hoja al libro
    XLSX.writeFile(wb, 'Registros_Entradas_Salidas.xlsx'); // Descargamos el archivo
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <header className="header-admi">
          <h1>Registros de Entradas y Salidas</h1>
          <p>Bienvenido Administrador</p>
        </header>
        <div className="search-and-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar empleado"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="actions">
            <div className="select-date">
            <label htmlFor="horaEntrada" className="label-blanco">
            <FaRegClock className="clock-icon" /> Seleccionar hora de entrada:
            </label>
              <input
                type="time"
                id="horaEntrada"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
            <button className="export-to-excel" onClick={exportToExcel}>
              <FaFileExcel className="excel-icon" /> Exportar a Excel
            </button>
          </div>
        </div>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Area</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmpleados.length > 0 ? (
              filteredEmpleados.map((empleado, index) => (
                <tr key={index}>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.area}</td>
                  <td>{empleado.entrada}</td>
                  <td>{empleado.salida}</td>
                  <td className={empleado.estado === 'A tiempo' ? 'status-a-tiempo' : 'status-tardanza'}>
                    {empleado.estado}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No se encontraron empleados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Registros;
