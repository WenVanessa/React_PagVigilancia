import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import '../css/EmpleadoForm.css'; 

const formSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  identificacion: z.string().min(5, { message: "La identificación debe tener al menos 5 caracteres." }),
  area: z.string(),
  horarioEntrada: z.string(),
  horarioSalida: z.string(),
  telefono: z.string(),
  direccion: z.string(),
  email: z.string().email({ message: "Por favor ingrese un email válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export function EmpleadoForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      identificacion: "",
      area: "",
      horarioEntrada: "",
      horarioSalida: "",
      telefono: "",
      direccion: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <div className="p-6 border rounded shadow-md">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Nombre</label>
          <input placeholder="Nombre completo" {...form.register("nombre")} />
        </div>
        <div>
          <label>Identificación</label>
          <input placeholder="Número de identificación" {...form.register("identificacion")} />
        </div>
        <div>
          <label>Área</label>
          <input placeholder="Área" {...form.register("area")} />
        </div>
        <div>
          <label>Horario de Entrada</label>
          <input type="time" {...form.register("horarioEntrada")} />
        </div>
        <div>
          <label>Horario de Salida</label>
          <input type="time" {...form.register("horarioSalida")} />
        </div>
        <div>
          <label>Teléfono</label>
          <input placeholder="Número de teléfono" {...form.register("telefono")} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="correo@ejemplo.com" {...form.register("email")} />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" placeholder="********" {...form.register("password")} />
        </div>
        <div>
          <label>Documento de Identificación (PDF)</label>
          <input type="file" accept=".pdf" className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded">
            Guardar Empleado
          </button>
        </div>
      </form>
    </div>
  );
}
