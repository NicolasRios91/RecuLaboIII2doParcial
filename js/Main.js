"use strict";
class Main {
    constructor() {
        this.getDatos = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("test");
                }, 1500);
            });
        };
        this.PromesaPromedio = (array) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let suma = array.reduce((a, b) => a + b, 0);
                    let promedio = suma / array.length;
                    resolve(promedio);
                }, 750);
            });
        };
        this.listaClientes = new Array();
    }
    handleEvent(ev) {
        let boton = ev.target;
        switch (boton.id) {
            case "btnAgregar":
                this.AgregarPersonas();
                break;
            case "checkId":
            case "checkNombre":
            case "checkApellido":
            case "checkEdad":
            case "checkSexo":
                this.AgregarTabla(this.listaClientes);
                break;
            case "btnPromedio":
                this.CalcularPromedio();
                break;
            case "filtro":
                this.FiltrarPorTipo();
                break;
            case "btnLimpiar":
                this.LimpiarLista();
                break;
            case "btnEliminar":
                this.EliminarCliente();
        }
    }
    AgregarPersonaLista(id) {
        let nombre = document.getElementById("nombre")
            .value;
        let apellido = (document.getElementById("apellido")).value;
        let edad = document.getElementById("edad")
            .value;
        let edadParseada = parseInt(edad);
        let sexo = document.getElementById("sexo").value;
        let c = new Cliente(id, nombre, apellido, parseInt(sexo), edadParseada);
        this.listaClientes.push(c);
    }
    AgregarPersonas() {
        let id = 1;
        if (this.listaClientes.length != 0) {
            let cliente = this.listaClientes;
            id = cliente.reduce(function (last, i) {
                if (i.id >= last) {
                    return i.id;
                }
                return last;
            }, 0);
            id++;
        }
        this.AgregarPersonaLista(id);
        this.AgregarTabla(this.listaClientes);
        //  this.CerrarForm();
    }
    AgregarTabla(listaClientes) {
        let checkId = (document.getElementById("checkId"));
        let cabeceraId = (document.getElementById("cabecera-id"));
        let checkNombre = (document.getElementById("checkNombre"));
        let cabeceraNombre = (document.getElementById("cabecera-nombre"));
        let checkEdad = (document.getElementById("checkEdad"));
        let cabeceraEdad = (document.getElementById("cabecera-edad"));
        let checkApellido = (document.getElementById("checkApellido"));
        let cabeceraApellido = (document.getElementById("cabecera-apellido"));
        let checkSexo = (document.getElementById("checkSexo"));
        let cabeceraSexo = (document.getElementById("cabecera-sexo"));
        if (checkId.checked) {
            cabeceraId.style.setProperty("visibility", "visible");
        }
        else {
            cabeceraId.style.setProperty("visibility", "hidden");
        }
        if (checkNombre.checked) {
            cabeceraNombre.style.setProperty("visibility", "visible");
        }
        else {
            cabeceraNombre.style.setProperty("visibility", "hidden");
        }
        if (checkEdad.checked) {
            cabeceraEdad.style.setProperty("visibility", "visible");
        }
        else {
            cabeceraEdad.style.setProperty("visibility", "hidden");
        }
        if (checkApellido.checked) {
            cabeceraApellido.style.setProperty("visibility", "visible");
        }
        else {
            cabeceraApellido.style.setProperty("visibility", "hidden");
        }
        if (checkSexo.checked) {
            cabeceraSexo.style.setProperty("visibility", "visible");
        }
        else {
            cabeceraSexo.style.setProperty("visibility", "hidden");
        }
        let table = (document.getElementById("tCuerpo"));
        table.innerHTML = "";
        listaClientes.forEach((e) => {
            let id = e.id;
            let nombre = e.nombre;
            let apellido = e.apellido;
            let edad = e.edad;
            let sexo = e.sexo;
            let tr = document.createElement("tr");
            let tdId = document.createElement("td");
            let tdNombre = document.createElement("td");
            let tdApellido = document.createElement("td");
            let tdEdad = document.createElement("td");
            let tdSexo = document.createElement("td");
            let tnId;
            if (checkId.checked) {
                tnId = document.createTextNode(id);
            }
            else {
                tnId = document.createTextNode("");
            }
            tdId.appendChild(tnId);
            tr.appendChild(tdId);
            let tnNombre;
            if (checkNombre.checked) {
                tnNombre = document.createTextNode(nombre);
            }
            else {
                tnNombre = document.createTextNode("");
            }
            tdNombre.appendChild(tnNombre);
            tr.appendChild(tdNombre);
            let tnApellido;
            if (checkApellido.checked) {
                tnApellido = document.createTextNode(apellido);
            }
            else {
                tnApellido = document.createTextNode("");
            }
            tdApellido.appendChild(tnApellido);
            tr.appendChild(tdApellido);
            let tnEdad;
            if (checkEdad.checked) {
                tnEdad = document.createTextNode(edad);
            }
            else {
                tnEdad = document.createTextNode("");
            }
            tdEdad.appendChild(tnEdad);
            tr.appendChild(tdEdad);
            let tnSexo;
            if (checkSexo.checked) {
                tnSexo = document.createTextNode(sexo);
            }
            else {
                tnSexo = document.createTextNode("");
            }
            tdSexo.appendChild(tnSexo);
            tr.appendChild(tdSexo);
            //TODO ELIMINAR
            tr.addEventListener("click", () => {
                // let index: number = listaClientes.indexOf(e);
                document.getElementById("id").value =
                    e.id.toString();
                document.getElementById("nombre").value = e.nombre;
                document.getElementById("apellido").value =
                    e.apellido;
                document.getElementById("edad").value =
                    e.edad.toString();
                document.getElementById("sexo").value =
                    e.sexo.toString();
            });
            table.appendChild(tr);
        });
    }
    CalcularPromedio() {
        let inputPromedio = document.getElementById("promedio");
        let arrayEdades = this.listaClientes.map((e) => e.edad);
        this.PromesaPromedio(arrayEdades)
            .then((res) => {
            inputPromedio.value = res;
        })
            .catch((error) => {
            console.log("error", error);
        });
    }
    // public CalcularPromedio(): void {
    //   let inputPromedio = <HTMLInputElement>document.getElementById("promedio");
    //   let arrayEdades = this.listaClientes.map((e) => e.edad);
    //   let suma: number = arrayEdades.reduce((a, b) => a + b, 0);
    //   let promedio: number = suma / arrayEdades.length;
    //   inputPromedio.value = promedio.toString();
    // }
    FiltrarPorTipo() {
        let filtro = document.getElementById("filtro")
            .value;
        if (filtro == "1") {
            let listaFiltrada = this.listaClientes.filter((c) => c.sexo == 1);
            this.AgregarTabla(listaFiltrada);
        }
        else if (filtro == "2") {
            var listaFiltrada = this.listaClientes.filter((c) => c.sexo == 2);
            this.AgregarTabla(listaFiltrada);
        }
        else {
            this.AgregarTabla(this.listaClientes);
        }
    }
    LimpiarLista() {
        this.listaClientes = [];
        this.AgregarTabla(this.listaClientes);
    }
    EliminarCliente() {
        let id = parseInt(document.getElementById("id").value);
        this.listaClientes = this.listaClientes.filter((e) => {
            if (e.id != id) {
                return e;
            }
        });
        // this.listaClientes = listaFiltrada;
        this.AgregarTabla(this.listaClientes);
    }
}
window.addEventListener("load", () => {
    let main = new Main();
    let btnCheckId = document.getElementById("checkId");
    let btnCheckNombre = document.getElementById("checkNombre");
    let btnCheckApellido = document.getElementById("checkApellido");
    let btnCheckEdad = document.getElementById("checkEdad");
    let btnCheckSexo = document.getElementById("checkSexo");
    let btnAgregar = document.getElementById("btnAgregar");
    let btnPromedio = document.getElementById("btnPromedio");
    let btnFiltro = document.getElementById("filtro");
    let btnLimpiar = document.getElementById("btnLimpiar");
    let btnEliminar = document.getElementById("btnEliminar");
    btnLimpiar.addEventListener("click", (event) => main.handleEvent(event));
    btnAgregar.addEventListener("click", (event) => main.handleEvent(event));
    btnCheckId.addEventListener("change", (event) => main.handleEvent(event));
    btnCheckNombre.addEventListener("change", (event) => main.handleEvent(event));
    btnCheckApellido.addEventListener("change", (event) => main.handleEvent(event));
    btnCheckEdad.addEventListener("change", (event) => main.handleEvent(event));
    btnCheckSexo.addEventListener("change", (event) => main.handleEvent(event));
    btnPromedio.addEventListener("click", (event) => main.handleEvent(event));
    btnFiltro.addEventListener("change", (event) => main.handleEvent(event));
    btnEliminar.addEventListener("click", (event) => main.handleEvent(event));
});
