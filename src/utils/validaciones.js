export const validarTarea = (tarea) => {
    const errores = [];

    if (!tarea.titulo || tarea.titulo.trim() === '') {
        errores.push('El título es obligatorio');
    }

    if (tarea.titulo && tarea.titulo.length > 50) {
        errores.push('El título no puede tener más de 50 caracteres');
    }

    if (tarea.descripcion && tarea.descripcion.length > 500) {
        errores.push('La descripción no puede tener más de 500 caracteres');
    }

    return errores;
};

export const crearTarea = (titulo, descripcion = '') => {
    return {
        id: Date.now(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        completada: false,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
    };
}; 