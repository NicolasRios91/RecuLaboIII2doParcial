class Main implements EventListenerObject {
  listaClientes: Array<Cliente>;

  constructor() {
    this.listaClientes = new Array<Cliente>();
  }
  public handleEvent(ev: Event) {
    let boton: HTMLElement = <HTMLElement>ev.target;
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

  public AgregarPersonaLista(id: number): void {
    let nombre: string = (<HTMLInputElement>document.getElementById("nombre"))
      .value;
    let apellido: string = (<HTMLInputElement>(
      document.getElementById("apellido")
    )).value;
    let edad: string = (<HTMLInputElement>document.getElementById("edad"))
      .value;
    let edadParseada: number = parseInt(edad);

    let sexo = (<HTMLInputElement>document.getElementById("sexo")).value;

    let c: Cliente = new Cliente(
      id,
      nombre,
      apellido,
      parseInt(sexo),
      edadParseada
    );
    this.listaClientes.push(c);
  }
  public AgregarPersonas(): void {
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

  public AgregarTabla(listaClientes: Array<Cliente>): void {
    let checkId: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("checkId")
    );
    let cabeceraId: HTMLTableDataCellElement = <HTMLTableDataCellElement>(
      document.getElementById("cabecera-id")
    );

    let checkNombre: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("checkNombre")
    );
    let cabeceraNombre: HTMLTableDataCellElement = <HTMLTableDataCellElement>(
      document.getElementById("cabecera-nombre")
    );

    let checkEdad: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("checkEdad")
    );
    let cabeceraEdad: HTMLTableDataCellElement = <HTMLTableDataCellElement>(
      document.getElementById("cabecera-edad")
    );

    let checkApellido: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("checkApellido")
    );
    let cabeceraApellido: HTMLTableDataCellElement = <HTMLTableDataCellElement>(
      document.getElementById("cabecera-apellido")
    );

    let checkSexo: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("checkSexo")
    );
    let cabeceraSexo: HTMLTableDataCellElement = <HTMLTableDataCellElement>(
      document.getElementById("cabecera-sexo")
    );

    if (checkId.checked) {
      cabeceraId.style.setProperty("visibility", "visible");
    } else {
      cabeceraId.style.setProperty("visibility", "hidden");
    }
    if (checkNombre.checked) {
      cabeceraNombre.style.setProperty("visibility", "visible");
    } else {
      cabeceraNombre.style.setProperty("visibility", "hidden");
    }

    if (checkEdad.checked) {
      cabeceraEdad.style.setProperty("visibility", "visible");
    } else {
      cabeceraEdad.style.setProperty("visibility", "hidden");
    }

    if (checkApellido.checked) {
      cabeceraApellido.style.setProperty("visibility", "visible");
    } else {
      cabeceraApellido.style.setProperty("visibility", "hidden");
    }

    if (checkSexo.checked) {
      cabeceraSexo.style.setProperty("visibility", "visible");
    } else {
      cabeceraSexo.style.setProperty("visibility", "hidden");
    }

    let table: HTMLTableElement = <HTMLTableElement>(
      document.getElementById("tCuerpo")
    );
    table.innerHTML = "";

    listaClientes.forEach((e) => {
      let id: any = e.id;
      let nombre: string = e.nombre;
      let apellido: string = e.apellido;
      let edad: any = e.edad;
      let sexo: any = e.sexo;

      let tr: HTMLTableRowElement = document.createElement("tr");
      let tdId: HTMLTableDataCellElement = document.createElement("td");
      let tdNombre: HTMLTableDataCellElement = document.createElement("td");
      let tdApellido: HTMLTableDataCellElement = document.createElement("td");
      let tdEdad: HTMLTableDataCellElement = document.createElement("td");
      let tdSexo: HTMLTableDataCellElement = document.createElement("td");
      let tnId: Text;
      if (checkId.checked) {
        tnId = document.createTextNode(id);
      } else {
        tnId = document.createTextNode("");
      }
      tdId.appendChild(tnId);
      tr.appendChild(tdId);

      let tnNombre: Text;
      if (checkNombre.checked) {
        tnNombre = document.createTextNode(nombre);
      } else {
        tnNombre = document.createTextNode("");
      }
      tdNombre.appendChild(tnNombre);
      tr.appendChild(tdNombre);

      let tnApellido: Text;
      if (checkApellido.checked) {
        tnApellido = document.createTextNode(apellido);
      } else {
        tnApellido = document.createTextNode("");
      }
      tdApellido.appendChild(tnApellido);
      tr.appendChild(tdApellido);

      let tnEdad: Text;
      if (checkEdad.checked) {
        tnEdad = document.createTextNode(edad);
      } else {
        tnEdad = document.createTextNode("");
      }
      tdEdad.appendChild(tnEdad);
      tr.appendChild(tdEdad);

      let tnSexo: Text;
      if (checkSexo.checked) {
        tnSexo = document.createTextNode(sexo);
      } else {
        tnSexo = document.createTextNode("");
      }
      tdSexo.appendChild(tnSexo);
      tr.appendChild(tdSexo);
      //TODO ELIMINAR
      tr.addEventListener("click", () => {
        // let index: number = listaClientes.indexOf(e);
        (<HTMLInputElement>document.getElementById("id")).value =
          e.id.toString();
        (<HTMLInputElement>document.getElementById("nombre")).value = e.nombre;
        (<HTMLInputElement>document.getElementById("apellido")).value =
          e.apellido;
        (<HTMLInputElement>document.getElementById("edad")).value =
          e.edad.toString();

        (<HTMLInputElement>document.getElementById("sexo")).value =
          e.sexo.toString();
      });
      table.appendChild(tr);
    });
  }

  public PromesaPromedio = (array: Array<number>) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let suma: number = array.reduce((a, b) => a + b, 0);
        let promedio: number = suma / array.length;

        resolve(promedio);
      }, 750);
    });
  };
  public CalcularPromedio(): void {
    let inputPromedio = <HTMLInputElement>document.getElementById("promedio");
    let arrayEdades = this.listaClientes.map((e) => e.edad);
    this.PromesaPromedio(arrayEdades)
      .then((res: any) => {
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

  public FiltrarPorTipo(): void {
    let filtro: string = (<HTMLInputElement>document.getElementById("filtro")!)
      .value;

    if (filtro == "1") {
      let listaFiltrada = this.listaClientes.filter((c) => c.sexo == 1);
      this.AgregarTabla(listaFiltrada);
    } else if (filtro == "2") {
      var listaFiltrada = this.listaClientes.filter((c) => c.sexo == 2);
      this.AgregarTabla(listaFiltrada);
    } else {
      this.AgregarTabla(this.listaClientes);
    }
  }
  public LimpiarLista(): void {
    this.listaClientes = [];
    this.AgregarTabla(this.listaClientes);
  }

  public EliminarCliente(): void {
    let id: number = parseInt(
      (<HTMLInputElement>document.getElementById("id")).value
    );

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
  let main: Main = new Main();

  let btnCheckId = <HTMLElement>document.getElementById("checkId");
  let btnCheckNombre = <HTMLElement>document.getElementById("checkNombre");
  let btnCheckApellido = <HTMLElement>document.getElementById("checkApellido");
  let btnCheckEdad = <HTMLElement>document.getElementById("checkEdad");
  let btnCheckSexo = <HTMLElement>document.getElementById("checkSexo");
  let btnAgregar = <HTMLElement>document.getElementById("btnAgregar");
  let btnPromedio = <HTMLElement>document.getElementById("btnPromedio");
  let btnFiltro = <HTMLElement>document.getElementById("filtro");
  let btnLimpiar = <HTMLElement>document.getElementById("btnLimpiar");
  let btnEliminar = <HTMLElement>document.getElementById("btnEliminar");

  btnLimpiar.addEventListener("click", (event) => main.handleEvent(event));
  btnAgregar.addEventListener("click", (event) => main.handleEvent(event));
  btnCheckId.addEventListener("change", (event) => main.handleEvent(event));
  btnCheckNombre.addEventListener("change", (event) => main.handleEvent(event));
  btnCheckApellido.addEventListener("change", (event) =>
    main.handleEvent(event)
  );
  btnCheckEdad.addEventListener("change", (event) => main.handleEvent(event));
  btnCheckSexo.addEventListener("change", (event) => main.handleEvent(event));
  btnPromedio.addEventListener("click", (event) => main.handleEvent(event));
  btnFiltro.addEventListener("change", (event) => main.handleEvent(event));
  btnEliminar.addEventListener("click", (event) => main.handleEvent(event));
});
