const Contador = require("./clases");


const contadorOeste = new Contador("Martin");
const contadorEste = new Contador("jose");


contadorOeste.contar()
contadorEste.contar()
console.log(contadorEste.getCuentasYResp())


console.log(contadorOeste.getResponsable())
console.log(contadorEste.getCuentaGlobal())
console.log(contadorEste.getCuentaIndividual())