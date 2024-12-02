"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importar los estilos
import '../css/RegistrosTable.css';

import { FaCalendarAlt, FaDownload } from "react-icons/fa";

function RegistrosTable() {
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");

  const registros = [
    {
      id: 1,
      empleado: "Juan Pérez",
      area: "IT",
      entrada: "08:00",
      salida: "17:00",
      estado: "A tiempo",
    },
    {
      id: 2,
      empleado: "María García",
      area: "Recursos Humanos",
      entrada: "08:15",
      salida: "17:30",
      estado: "Tardanza",
    },
    {
      id: 3,
      empleado: "Carlos López",
      area: "Ventas",
      entrada: "07:55",
      salida: "17:00",
      estado: "A tiempo",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Controles */}
      <div className="controls-container">
        <input
          type="text"
          placeholder="Buscar empleado..."
          className="search-input"
        />
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="area-select"
        >
          <option value="">Seleccionar área</option>
          <option value="todas">Todas las áreas</option>
          <option value="rh">Recursos Humanos</option>
          <option value="it">IT</option>
          <option value="ventas">Ventas</option>
        </select>

        <div className="relative">
          <button
            className="date-button"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <FaCalendarAlt />
            {date ? date.toLocaleDateString() : "Seleccionar fecha"}
          </button>
          {showDatePicker && (
            <DatePicker
              selected={date}
              onChange={(selectedDate) => {
                setDate(selectedDate);
                setShowDatePicker(false); // Cierra el DatePicker al seleccionar la fecha
              }}
              dateFormat="yyyy/MM/dd"
              className="absolute mt-2 p-2 border rounded"
              popperPlacement="bottom-start"
            />
          )}
        </div>

        <button className="export-button">
          <FaDownload />
          Exportar a Excel
        </button>
      </div>

      {/* Tabla de registros */}
      <div className="rounded-md border overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Empleado</th>
              <th className="px-4 py-2 text-left">Área</th>
              <th className="px-4 py-2 text-left">Entrada</th>
              <th className="px-4 py-2 text-left">Salida</th>
              <th className="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {registros
              .filter(
                (registro) =>
                  selectedArea === "" ||
                  selectedArea === "todas" ||
                  registro.area.toLowerCase() === selectedArea.toLowerCase()
              )
              .map((registro) => (
                <tr key={registro.id}>
                  <td className="px-4 py-2">{registro.empleado}</td>
                  <td className="px-4 py-2">{registro.area}</td>
                  <td className="px-4 py-2">{registro.entrada}</td>
                  <td className="px-4 py-2">{registro.salida}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        registro.estado === "A tiempo"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {registro.estado}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegistrosTable;
