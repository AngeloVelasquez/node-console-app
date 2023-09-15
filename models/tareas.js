require("colors")
const Tarea = require('./tarea')

class Tareas {

    _listado = {}

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado;
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareas(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc)

        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {
        // el codigo que hice (Funciona)
        // console.log()
        // for (let i = 0; i < this.listadoArr.length; i++) {
        //     const tareas = this.listadoArr[i];
        //     const number = `${i+1}`.green

        //     if (tareas.completadoEn != null) {
        //         console.log(`${(number)}. ${tareas.desc} :: Completada`.green)
        //     } else {
        //         console.log(`${(number)}. ${tareas.desc} :: Pendiente`.red)
        //     }
        // }
        //Codigo del video

        console.log()
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green
            const { desc, completadoEn } = tarea
            const estado = (completadoEn)
                ? "Completado".green
                : "Pendiente".red
            console.log(`${idx}. ${desc} :: ${estado}`)
        })

    }

    listarPendComp(comp = true) {
        
        console.log();
        let contador = 0

        this.listadoArr.forEach((tarea, i) => {
            const { desc, completadoEn } = tarea
            const estado = (completadoEn)
                            ? "Completada".green
                            : "Pendiente".red

            if (comp) {
                if(completadoEn) {
                    contador += 1
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`)
                }
            } else {
                if(!completadoEn) {
                    contador += 1
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
                }
            }
        })
    }

    toggleCompletadas( ids = []) {

        ids.forEach( id => {

            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null
            }

        })

    }
}

module.exports = Tareas