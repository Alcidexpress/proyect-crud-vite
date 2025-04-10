import React, { useState } from 'react';
import './FormularioTarea.css';

const FormularioTarea = ({ onAgregarTarea }) => {
    const [tarea, setTarea] = useState({
        titulo: '',
        descripcion: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTarea(prev => ({
            ...prev,
            [name]: value
        }));

        // Validación en tiempo real
        if (name === 'titulo') {
            if (value.length > 50) {
                setError('El título no puede tener más de 50 caracteres');
            } else if (value.trim() === '') {
                setError('El título es obligatorio');
            } else {
                setError('');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación final
        if (tarea.titulo.trim() === '') {
            setError('El título es obligatorio');
            return;
        }

        if (tarea.titulo.length > 50) {
            setError('El título no puede tener más de 50 caracteres');
            return;
        }

        // Llamar a la función onAgregarTarea con la nueva tarea
        onAgregarTarea(tarea);
        
        // Limpiar el formulario
        setTarea({
            titulo: '',
            descripcion: ''
        });
        setError('');
    };

    return (
        <div className="formulario-tarea">
            <h2>Agregar Nueva Tarea</h2>
            <form onSubmit={handleSubmit}>
                <div className="campo-formulario">
                    <label htmlFor="titulo">Título *</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={tarea.titulo}
                        onChange={handleChange}
                        placeholder="Ingrese el título de la tarea"
                        maxLength={50}
                    />
                    {error && <p className="error">{error}</p>}
                </div>

                <div className="campo-formulario">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={tarea.descripcion}
                        onChange={handleChange}
                        placeholder="Ingrese la descripción de la tarea (opcional)"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={!!error || tarea.titulo.trim() === ''}
                >
                    Agregar Tarea
                </button>
            </form>
        </div>
    );
};

export default FormularioTarea; 