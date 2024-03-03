const Contador = require("./clases");


const contadorOeste = new Contador("jose");
const contadorEste = new Contador("Martin");


contadorOeste.contar()
contadorEste.contar()
console.log(contadorEste.getCuentasYResp())


console.log(contadorOeste.getResponsable())
console.log(contadorEste.getCuentaGlobal())
console.log(contadorEste.getCuentaIndividual())