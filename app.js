const { guardarDB, leerDB } = require("./helpers/guardarArchivo")
const { inquirerMenu, pausa, leerInput, listadoBorrarTareas, confirmar, mostrarListadoChecklist } = require("./helpers/inquirer")
const Tareas = require("./models/tareas")

// console.clear()

const main = async () => {

    let opt = ''
    const tareas = new Tareas();

    const tareasDB = leerDB()

    if (tareasDB) { //cargar tareas
        tareas.cargarTareas(tareasDB)
    }

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case '1': // Crear tarea
                const desc = await leerInput('Descripcion:')
                tareas.crearTarea(desc)
                break;
            case '2': // Lista de todas las tareas
                tareas.listadoCompleto();
                break;
            case '3': // listado de tareas completadas
                tareas.listarPendComp(true);
                break;
            case '4': // Listado de tareas Pendientes
                tareas.listarPendComp(false);
                break;
            case '5': // Completar tareas
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break;
            case '6': // Borrar Tareas
                const id = await listadoBorrarTareas(tareas.listadoArr)
                if (id !== 'o') {
                    const ok = await confirmar('¿Esta seguro que desea eliminar la tarea?')
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log("Tarea Borrada con exito");
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr)

        await pausa()

    } while (opt !== '0')

}

main()