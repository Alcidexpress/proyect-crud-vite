import React, { useState } from 'react';
import styles from './Tarea.module.css';

const Tarea = ({ tarea, onEliminar, onToggleCompletada, onEditar }) => {
    const [editando, setEditando] = useState(false);
    const [tareaEditada, setTareaEditada] = useState({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion
    });

    const handleEditar = () => {
        onEditar(tarea.id, tareaEditada);
        setEditando(false);
    };

    return (
        <li className={`${styles.tareaItem} ${tarea.completada ? styles.completada : ''}`}>
            {editando ? (
                <div className={styles.editarTarea}>
                    <input
                        type="text"
                        className={styles.input}
                        value={tareaEditada.titulo}
                        onChange={(e) => setTareaEditada({...tareaEditada, titulo: e.target.value})}
                    />
                    <textarea
                        className={styles.textarea}
                        value={tareaEditada.descripcion}
                        onChange={(e) => setTareaEditada({...tareaEditada, descripcion: e.target.value})}
                    />
                    <div className={styles.botonesEdicion}>
                        <button 
                            className={`${styles.boton} ${styles.guardar}`}
                            onClick={handleEditar}
                        >
                            Guardar
                        </button>
                        <button 
                            className={`${styles.boton} ${styles.cancelar}`}
                            onClick={() => setEditando(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.contenido}>
                        <h3 className={styles.titulo}>{tarea.titulo}</h3>
                        {tarea.descripcion && <p className={styles.descripcion}>{tarea.descripcion}</p>}
                    </div>
                    <div className={styles.acciones}>
                        <button 
                            className={`${styles.boton} ${styles.completar}`}
                            onClick={() => onToggleCompletada(tarea.id)}
                        >
                            {tarea.completada ? 'Desmarcar' : 'Completar'}
                        </button>
                        <button 
                            className={`${styles.boton} ${styles.editar}`}
                            onClick={() => setEditando(true)}
                        >
                            Editar
                        </button>
                        <button 
                            className={`${styles.boton} ${styles.eliminar}`}
                            onClick={() => onEliminar(tarea.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default Tarea; 