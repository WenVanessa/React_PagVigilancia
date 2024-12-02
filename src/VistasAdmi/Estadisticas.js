"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Datos de ejemplo: Ingresos por Hora y Asistencia por Área
const ingresosPorHora = [
  { hora: "7:00", cantidad: 3 },
  { hora: "8:00", cantidad: 12 },
  { hora: "9:00", cantidad: 5 },
  { hora: "10:00", cantidad: 2 },
];

const asistenciaPorArea = [
  { area: "IT", cantidad: 15 },
  { area: "RRHH", cantidad: 8 },
  { area: "Ventas", cantidad: 12 },
  { area: "Admin", cantidad: 5 },
];

function Estadisticas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Forzar un re-render
    const timer = setTimeout(() => {
      setIsMounted(false);
      setTimeout(() => setIsMounted(true), 0);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return <div>Cargando estadísticas...</div>; // Placeholder mientras se carga
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Primer gráfico: Ingresos por Hora */}
      <div className="p-6 border rounded shadow-md">
        <div>
          <h2 className="text-xl font-semibold">Ingresos por Hora</h2>
          <p className="text-sm text-gray-600">
            Distribución de entradas de empleados por hora
          </p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ingresosPorHora}>
              <XAxis
                dataKey="hora"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Bar
                dataKey="cantidad"
                fill="#4CAF50"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Segundo gráfico: Asistencia por Área */}
      <div className="p-6 border rounded shadow-md">
        <div>
          <h2 className="text-xl font-semibold">Asistencia por Área</h2>
          <p className="text-sm text-gray-600">
            Distribución de asistencias por departamento
          </p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={asistenciaPorArea}>
              <XAxis
                dataKey="area"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Bar
                dataKey="cantidad"
                fill="#2196F3"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Estadisticas;