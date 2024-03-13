class ProductManager {
  #products;
  static AUTOINCREMENTING_ID = 1;

  constructor() {
    this.#products = [];
  }

  addProduct(obj) {
    //configuro el obj
    let newProducto = {
      title: obj.title,
      description: obj.description,
      price: obj.price,
      thumbnail: obj.thumbnail,
      code: obj.code,
      stock: obj.stock,
    };

    if (this.#products.some(product => product.code == newProducto.code)) return "Codigo repetido";

    for (const prop in newProducto) {
      if (newProducto[prop] == undefined) {
        throw new Error(`Falta completar el campo ${prop}`);
      }
    }

    newProducto.id = ProductManager.idCounter++;

    this.#products.push(newProducto);

    return "Producto Cargado con exito";
  }

  getProducts = () => this.#products;

  getProductById = prodId => {
    const productoPorId = this.#products.find(e => e.id === prodId);
    productoPorId ? productoPorId : console.log(`Not found`);
  };
}

const ProductManager1 = new ProductManager();

ProductManager1.getProducts();

ProductManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
ProductManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "ieie",
  25
);
ProductManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

ProductManager1.getProducts();

ProductManager1.getProductById(1);
ProductManager1.getProductById(3);
