"use strict";
var Main = /** @class */ (function () {
    function Main() {
        this.listaClientes = new Array();
    }
    Main.prototype.handleEvent = function (ev) {
        var boton = ev.target;
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
        }
    };
    Main.prototype.AgregarPersonaLista = function (id) {
        var nombre = document.getElementById("nombre")
            .value;
        var apellido = (document.getElementById("apellido")).value;
        var edad = document.getElementById("edad")
            .value;
        var edadParseada = parseInt(edad);
        var sexo = document.getElementById("sexo").value;
        var c = new Cliente(id, nombre, apellido, parseInt(sexo), edadParseada);
        this.listaClientes.push(c);
    };
    Main.prototype.AgregarPersonas = function () {
        var id = 1;
        if (this.listaClientes.length != 0) {
            var cliente = this.listaClientes;
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
    };
    Main.prototype.AgregarTabla = function (listaClientes) {
        var checkId = (document.getElementById("checkId"));
        var cabeceraId = (document.getElementById("cabecera-id"));
        var checkNombre = (document.getElementById("checkNombre"));
        var cabeceraNombre = (document.getElementById("cabecera-nombre"));
        var checkEdad = (document.getElementById("checkEdad"));
        var cabeceraEdad = (document.getElementById("cabecera-edad"));
        var checkApellido = (document.getElementById("checkApellido"));
        var cabeceraApellido = (document.getElementById("cabecera-apellido"));
        var checkSexo = (document.getElementById("checkSexo"));
        var cabeceraSexo = (document.getElementById("cabecera-sexo"));
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
        var table = (document.getElementById("tCuerpo"));
        table.innerHTML = "";
        listaClientes.forEach(function (e) {
            var id = e.id;
            var nombre = e.nombre;
            var apellido = e.apellido;
            var edad = e.edad;
            var sexo = e.sexo;
            var tr = document.createElement("tr");
            var tdId = document.createElement("td");
            var tdNombre = document.createElement("td");
            var tdApellido = document.createElement("td");
            var tdEdad = document.createElement("td");
            var tdSexo = document.createElement("td");
            var tnId;
            if (checkId.checked) {
                tnId = document.createTextNode(id);
            }
            else {
                tnId = document.createTextNode("");
            }
            tdId.appendChild(tnId);
            tr.appendChild(tdId);
            var tnNombre;
            if (checkNombre.checked) {
                tnNombre = document.createTextNode(nombre);
            }
            else {
                tnNombre = document.createTextNode("");
            }
            tdNombre.appendChild(tnNombre);
            tr.appendChild(tdNombre);
            var tnApellido;
            if (checkApellido.checked) {
                tnApellido = document.createTextNode(apellido);
            }
            else {
                tnApellido = document.createTextNode("");
            }
            tdApellido.appendChild(tnApellido);
            tr.appendChild(tdApellido);
            var tnEdad;
            if (checkEdad.checked) {
                tnEdad = document.createTextNode(edad);
            }
            else {
                tnEdad = document.createTextNode("");
            }
            tdEdad.appendChild(tnEdad);
            tr.appendChild(tdEdad);
            var tnSexo;
            if (checkSexo.checked) {
                tnSexo = document.createTextNode(sexo);
            }
            else {
                tnSexo = document.createTextNode("");
            }
            tdSexo.appendChild(tnSexo);
            tr.appendChild(tdSexo);
            table.appendChild(tr);
        });
    };
    Main.prototype.CalcularPromedio = function () {
        var inputPromedio = document.getElementById("promedio");
        var arrayEdades = this.listaClientes.map(function (e) { return e.edad; });
        var suma = arrayEdades.reduce(function (a, b) { return a + b; }, 0);
        var promedio = suma / arrayEdades.length;
        inputPromedio.value = promedio.toString();
    };
    Main.prototype.FiltrarPorTipo = function () {
        var filtro = document.getElementById("filtro")
            .value;
        if (filtro == "1") {
            var listaFiltrada_1 = this.listaClientes.filter(function (c) { return c.sexo == 1; });
            this.AgregarTabla(listaFiltrada_1);
        }
        else if (filtro == "2") {
            var listaFiltrada = this.listaClientes.filter(function (c) { return c.sexo == 2; });
            this.AgregarTabla(listaFiltrada);
        }
        else {
            this.AgregarTabla(this.listaClientes);
        }
    };
    Main.prototype.LimpiarLista = function () {
        this.listaClientes = [];
        this.AgregarTabla(this.listaClientes);
    };
    return Main;
}());
window.addEventListener("load", function () {
    var main = new Main();
    var btnCheckId = document.getElementById("checkId");
    var btnCheckNombre = document.getElementById("checkNombre");
    var btnCheckApellido = document.getElementById("checkApellido");
    var btnCheckEdad = document.getElementById("checkEdad");
    var btnCheckSexo = document.getElementById("checkSexo");
    var btnAgregar = document.getElementById("btnAgregar");
    var btnPromedio = document.getElementById("btnPromedio");
    var btnFiltro = document.getElementById("filtro");
    var btnLimpiar = document.getElementById("btnLimpiar");
    btnLimpiar.addEventListener("click", function (event) { return main.handleEvent(event); });
    btnAgregar.addEventListener("click", function (event) { return main.handleEvent(event); });
    btnCheckId.addEventListener("change", function (event) { return main.handleEvent(event); });
    btnCheckNombre.addEventListener("change", function (event) { return main.handleEvent(event); });
    btnCheckApellido.addEventListener("change", function (event) {
        return main.handleEvent(event);
    });
    btnCheckEdad.addEventListener("change", function (event) { return main.handleEvent(event); });
    btnCheckSexo.addEventListener("change", function (event) { return main.handleEvent(event); });
    btnPromedio.addEventListener("click", function (event) { return main.handleEvent(event); });
    btnFiltro.addEventListener("change", function (event) { return main.handleEvent(event); });
});
