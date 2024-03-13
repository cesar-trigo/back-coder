class ProductManager {
  #products;
  static AUTOINCREMENTING_ID = 1;

  constructor() {
    this.#products = [];
  }

  addProduct(obj) {
    //configuro el obj
    let newProducto = {
      id: ProductManager.AUTOINCREMENTING_ID++,
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

    this.#products.push(newProducto);

    return "Producto Cargado con exito";
  }

  getProducts = () => this.#products;

  getProductById = prodId => {
    const productoPorId = this.#products.find(e => e.id === prodId);
    productoPorId ? productoPorId : console.log(`Not found`);
  };
}

// Nuevas instancias para testear funcionamiento

// Se creo una instancia para poder utilizar los metodos
const ProductManager1 = new ProductManager();
// Metodo para obtener el array de productos
ProductManager1.getProducts();

console.log(
  ProductManager1.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc12",
    stock: 25,
  })
);

/* console.log(
  ProductManager1.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "ieie",
    stock: 25,
  })
);

console.log(
  ProductManager1.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc12",
    stock: 25,
  })
); */

// Metodo para obtener el array de productos
console.log(ProductManager1.getProducts());
// Utilizacion de metodo de busqueda por id
/* ProductManager1.getProductById(1);
ProductManager1.getProductById(3); */
