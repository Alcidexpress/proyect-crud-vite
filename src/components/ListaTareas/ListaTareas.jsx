import React from 'react';
import Tarea from '../Tarea/Tarea';
import styles from './ListaTareas.module.css';

const ListaTareas = ({ tareas, onEliminarTarea, onToggleCompletada, onEditarTarea }) => {
    return (
        <div className={styles.listaTareas}>
            <h2 className={styles.titulo}>Lista de Tareas</h2>
            {tareas.length === 0 ? (
                <p className={styles.sinTareas}>No hay tareas, ¡agrega una!</p>
            ) : (
                <ul className={styles.lista}>
                    {tareas.map(tarea => (
                        <Tarea
                            key={tarea.id}
                            tarea={tarea}
                            onEliminar={onEliminarTarea}
                            onToggleCompletada={onToggleCompletada}
                            onEditar={onEditarTarea}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListaTareas; 