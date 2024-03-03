const nombre = "juan";

/* nombre = "lucas";  */
//Definicion de la clase
class Contadorr {
    //variables que se comparten entre los obj/clases
    //variable global
    static conteoGlobal = 0;
    //construccion del objeto
    constructor() {
        this.conteoIndividual = 0;
    }

    //metodos del Contadorr
    contIncrementa() {
        this.conteoIndividual++
        Contadorr.conteoGlobal++
    }

    muestraContadorres() {
        console.log({ ind: this.conteoIndividual, glo: Contadorr.conteoGlobal })
    }

}
const Contadorr1 = new Contadorr()
//     conteoGlobal:0
// Contadorr1:{
//     conteoIndividual:0
// }

const Contadorr2 = new Contadorr()
//     conteoGlobal:0
// Contadorr2:{
//     conteoIndividual:0
// }
const Contadorr3 = new Contadorr()

Contadorr1.contIncrementa() // ind> 1, glo> 1
Contadorr1.contIncrementa() // ind> 2, glo> 2
Contadorr1.contIncrementa() // ind> 2, glo> 2
Contadorr1.contIncrementa() // ind> 2, glo> 2
Contadorr2.contIncrementa() // ind> 1, glo> 3

// con1 : ind> 2, glob> 3
// con2 :