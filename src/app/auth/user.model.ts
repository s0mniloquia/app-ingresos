


export class User {

    public nombre: string;
    public email: string;
    public uid: string;

    constructor( objInterface: DataObj ) {
        this.nombre = objInterface.nombre;
        this.uid = objInterface.uid;
        this.email = objInterface.email;
    }

}

interface DataObj {
    uid: string;
    nombre: string;
    email: string;

}

