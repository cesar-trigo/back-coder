class Contador {

  //atributos
  //constructor
  //metodos

  responsable;

  static CONTADOR_GLOBAL = 0;

  constructor(n) {
    this.responsable = n;
    this.contadoResponsable = 0;
  };

  getResponsable = () => this.responsable;

  contar() {
    this.contadoResponsable++;
    Contador.CONTADOR_GLOBAL++;
  };

  getCuentaIndividual() {
    return this.contadoResponsable;
  };

  getCuentaGlobal() {
    return Contador.CONTADOR_GLOBAL;
  };

  getCuentasYResp = () => (
    {
      elResponsabl: this.responsable,
      cuentaInd: this.contadoResponsable,
      cuentaGlo: Contador.CONTADOR_GLOBAL
    });
};

module.exports = Contador;
