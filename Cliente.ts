class Cliente extends Persona {
  sexo: number;
  edad: number;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    sexo: number,
    edad: number
  ) {
    super(id, nombre, apellido);
    this.sexo = sexo;
    this.edad = edad;
  }
}
