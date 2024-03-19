const fs = require("fs");

class ProductManager {
  #products;

  static #autoIncrementingId = 1;
  static #lastId = 0;

  constructor() {
    this.#products = [];
    this.path = "products.json";
  }

  //PARA LEER EL ACHIVO JSON
  leerArchivo = async () => {
    if (fs.existsSync(this.path)) {
      return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" })); //hay que arreglar
    }
    return [];
  };

  //PARA ACTULIZAR LOS CAMBIOS EN EL ACHIVO JSON
  actualizar = async arr => {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(arr, null, 2)); //hay que arreglar
      console.log("Archivo actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el archivo:", error);
    }
  };

  // METODO PARA AGREGAR PRODUCTOS
  addProduct = async obj => {
    try {
      const data = await this.leerArchivo();

      //configuro el obj
      let newProduct = {
        title: obj.title,
        description: obj.description,
        price: obj.price,
        thumbnail: obj.thumbnail,
        code: obj.code,
        stock: obj.stock,
      };

      if (data.some(product => product.code === newProduct.code)) {
        throw new Error("Repeated code");
      }

      // Verificar que todos los campos estén presentes
      for (const prop in newProduct) {
        if (newProduct[prop] === undefined) {
          throw new Error(`Field missing ${prop}`);
        }
      }

      // Asignar un nuevo ID

      // Agregar el nuevo producto
      data.push(newProduct);

      const newId = data.indexOf(obj) + 1;
      obj.id = newId;
      //y actualizar el archivo
      await this.actualizar(data);

      return "Product Loaded Successfully";
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //METODO PARA LEER LOS PRODUCTOS JSON
  getProducts = async () => {
    try {
      return await this.leerArchivo();
    } catch (error) {
      new Error("Error al leer el archivo:"); //arreglarw
    }
  };

  // METODO PARA BUSCAR POR ID EN JSON
  getProductById = prodId => {
    const productoPorId = this.#products.find(e => e.id === prodId);
    return productoPorId ? productoPorId : console.log(`Not found`);
  };

  // METODO PARA MODIFICAR POR ID EN PRODUCTOS
  updateProduct = (idProd, obj) => {
    const eventoDelId = this.#products.find(eve => eve.id === idProd);

    Object.keys(obj).forEach(prop => {
      eventoDelId[prop] = obj[prop];
    });
    return console.log(eventoDelId);
  };

  // METODO PARA ELIMINAR POR ID EN PRODUCTOS
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

const ejecutar = async () => {
  try {
    await ProductManager1.addProduct({
      title: "testing-1",
      description: "testing-1",
      price: 200,
      thumbnail: "testing-1",
      code: "4457",
      stock: 25,
    });
    console.log(await ProductManager1.getProducts());
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
