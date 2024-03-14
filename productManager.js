const fs = require("fs");

class ProductManager {
  #products;
  static AUTOINCREMENTING_ID = 1;

  constructor() {
    this.#products = [];
    this.path = "./products.json";
  }

  leerArchivo = async () => {
    try {
      const datos = await fs.readFile(this.path, "utf8"); //hay que arreglar
      console.log("Contenido del archivo:", datos);
    } catch (error) {
      new Error("Error al leer el archivo:");
    }
  };

  actualizar = async () => {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.#products, null, 2)); //hay que arreglar
      console.log("Archivo actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el archivo:", error);
    }
  };

  addProduct = async obj => {
    try {
      //configuro el obj
      let newProduct = {
        title: obj.title,
        description: obj.description,
        price: obj.price,
        thumbnail: obj.thumbnail,
        code: obj.code,
        stock: obj.stock,
      };

      if (this.#products.some(product => product.code === newProduct.code)) {
        throw new Error("Repeated code");
      }

      // Verificar que todos los campos estén presentes
      for (const prop in newProduct) {
        if (newProduct[prop] === undefined) {
          throw new Error(`Field missing ${prop}`);
        }
      }

      // Asignar un nuevo ID
      newProduct.id = ProductManager.AUTOINCREMENTING_ID++;

      // Agregar el nuevo producto y actualizar el archivo
      this.#products.push(newProduct);
      await this.actualizar();

      return "Product Loaded Successfully";
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getProducts = async () => {
    try {
      const data = await this.getData();
      return JSON.parse(data);
    } catch (error) {
      new Error("Error al leer el archivo:"); //arreglarw
    }
  };

  getProductById = prodId => {
    const productoPorId = this.#products.find(e => e.id === prodId);
    return productoPorId ? productoPorId : console.log(`Not found`);
  };

  updateProduct = (idProd, obj) => {
    const eventoDelId = this.#products.find(eve => eve.id === idProd);

    Object.keys(obj).forEach(prop => {
      eventoDelId[prop] = obj[prop];
    });
    return console.log(eventoDelId);
  };

  deleteProduct = prodId => {
    const productoPorId = this.#products.findIndex(e => e.id === prodId);
    return productoPorId >= 0 ? this.#products.splice(productoPorId, 1) : console.log(`Not found`);
  };
}

//Object.assign(eventoDelId, obj);

// Nuevas instancias para testear funcionamiento

// Se creo una instancia para poder utilizar los metodos
const ProductManager1 = new ProductManager();
// Metodo para obtener el array de productos
/* ProductManager1.getProducts(); */

/* ProductManager1.addProduct({
  id: 18182,
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "ab1c12",
  stock: 25,
}); */

const ejecutar = async () => {
  try {
    await ProductManager1.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc12",
      stock: 25,
    });

    await ProductManager1.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "ieie",
      stock: 25,
    });

    await ProductManager1.getProducts();
  } catch (error) {
    console.error(error.message);
  }
};

ejecutar();

// Metodo para obtener el array de productos
/* console.log(ProductManager1.getProducts()); */
// Utilizacion de metodo de busqueda por id
/* console.log(ProductManager1.getProductById(1)); */
/* ProductManager1.getProductById(3); */

/* ProductManager1.updateProduct(1, {
  title: "9198198",
  description: "7827821",
});

ProductManager1.deleteProduct();

console.log(ProductManager1.getProducts()); */
