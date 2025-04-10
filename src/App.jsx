import React, { useState, useEffect } from 'react';
import FormularioTarea from './components/FormularioTarea/FormularioTarea';
import ListaTareas from './components/ListaTareas/ListaTareas';
import { validarTarea, crearTarea } from './utils/validaciones';
import { guardarTareas, cargarTareas } from './utils/persistencia';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [filtro, setFiltro] = useState('todas'); // 'todas', 'completadas', 'pendientes'
  const [error, setError] = useState('');

  // Cargar tareas al iniciar
  useEffect(() => {
    const tareasGuardadas = cargarTareas();
    setTareas(tareasGuardadas);
  }, []);

  // Guardar tareas cuando cambien
  useEffect(() => {
    guardarTareas(tareas);
  }, [tareas]);

  const agregarTarea = (nuevaTarea) => {
    const errores = validarTarea(nuevaTarea);
    if (errores.length > 0) {
      setError(errores[0]);
      return;
    }

    const tareaCompleta = crearTarea(nuevaTarea.titulo, nuevaTarea.descripcion);
    setTareas([...tareas, tareaCompleta]);
    setError('');
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  const toggleCompletada = (id) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id 
        ? { 
            ...tarea, 
            completada: !tarea.completada,
            fechaActualizacion: new Date().toISOString()
          } 
        : tarea
    ));
  };

  const editarTarea = (id, tareaActualizada) => {
    const errores = validarTarea(tareaActualizada);
    if (errores.length > 0) {
      setError(errores[0]);
      return;
    }

    setTareas(tareas.map(tarea => 
      tarea.id === id 
        ? { 
            ...tarea, 
            ...tareaActualizada,
            fechaActualizacion: new Date().toISOString()
          } 
        : tarea
    ));
    setError('');
  };

  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === 'completadas') return tarea.completada;
    if (filtro === 'pendientes') return !tarea.completada;
    return true;
  });

  return (
    <div className="app">
      <h1>Gestor de Tareas</h1>
      {error && <div className="error-global">{error}</div>}
      <FormularioTarea onAgregarTarea={agregarTarea} />
      <div className="filtros">
        <button 
          className={filtro === 'todas' ? 'activo' : ''} 
          onClick={() => setFiltro('todas')}
        >
          Todas
        </button>
        <button 
          className={filtro === 'pendientes' ? 'activo' : ''} 
          onClick={() => setFiltro('pendientes')}
        >
          Pendientes
        </button>
        <button 
          className={filtro === 'completadas' ? 'activo' : ''} 
          onClick={() => setFiltro('completadas')}
        >
          Completadas
        </button>
      </div>
      <ListaTareas 
        tareas={tareasFiltradas} 
        onEliminarTarea={eliminarTarea}
        onToggleCompletada={toggleCompletada}
        onEditarTarea={editarTarea}
      />
    </div>
  );
}

export default App;
