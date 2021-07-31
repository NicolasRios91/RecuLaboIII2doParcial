"use strict";
class Cliente extends Persona {
    constructor(id, nombre, apellido, sexo, edad) {
        super(id, nombre, apellido);
        this.sexo = sexo;
        this.edad = edad;
    }
}
