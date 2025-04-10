const STORAGE_KEY = 'tareas_app';

export const guardarTareas = (tareas) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
    } catch (error) {
        console.error('Error al guardar las tareas:', error);
    }
};

export const cargarTareas = () => {
    try {
        const tareasGuardadas = localStorage.getItem(STORAGE_KEY);
        return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    } catch (error) {
        console.error('Error al cargar las tareas:', error);
        return [];
    }
}; 