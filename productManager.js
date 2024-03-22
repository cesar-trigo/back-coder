const fs = require("fs");

class ProductManager {
  #products;

  constructor() {
    this.#products = [];
    this.path = "products.json"; //--------hay cambiar a una forma correcta!!!
  }

  //PARA LEER EL ACHIVO JSON
  readFile = async () => {
    if (fs.existsSync(this.path)) {
      return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" })); //--------hay que arreglar!!!
    }
    return [];
  };

  //PARA ACTULIZAR ACHIVO JSON
  sendFile = async arr => {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(arr, null, 2)); //--------hay que arreglar!!!!
    } catch (error) {
      console.error("Error updating file");
    }
  };

  // METODO PARA AGREGAR PRODUCTOS
  addProduct = async obj => {
    //arreglar
    try {
      const data = await this.readFile();

      /*       newProduct.id = id++; */

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

      // Asignar un nuevo ID después de actualizar el archivo
      let id = data.length > 0 ? Math.max(...data.map(e => e.id)) + 1 : 1; //--------hay que revisar!!!!
      newProduct.id = id++;

      // Agregar el nuevo producto al array de datos
      data.push(newProduct);

      //y actualizar el archivo
      await this.sendFile(data);

      return "Product Loaded Successfully";
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //METODO PARA LEER LOS PRODUCTOS JSON
  getProducts = async () => {
    try {
      return await this.readFile();
    } catch (error) {
      new Error("Error reading file");
    }
  };

  // METODO PARA BUSCAR POR ID EN JSON
  getProductById = async prodId => {
    try {
      const data = await this.readFile();

      const productById = data.find(e => e.id === prodId);
      if (!productById) {
        throw new Error(`Does not work wrong id: ${prodId}`);
      }
      return productById;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // METODO PARA MODIFICAR POR ID EN PRODUCTOS
  updateProduct = async (idProd, obj) => {
    try {
      const data = await this.readFile();

      const idEvent = data.find(produc => produc.id === idProd);
      if (!idEvent) {
        throw new Error(`error id: ${idProd} not found`);
      }

      Object.keys(obj).forEach(prop => {
        idEvent[prop] = obj[prop];
      });

      await this.sendFile(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // METODO PARA ELIMINAR POR ID EN PRODUCTOS
  deleteProduct = async prodId => {
    try {
      const data = await this.readFile();

      const productById = data.findIndex(e => e.id === prodId);

      return !(productById >= 0)
        ? console.error(`Not found`)
        : (data.splice(productById, 1), await this.sendFile(data));
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
ProductManager.contadorIDs = 1;
const ProductManager1 = new ProductManager();

const ejecutar = async () => {
  try {
    console.log(await ProductManager1.getProducts());
    await ProductManager1.addProduct({
      title: "testing-1",
      description: "testing-1",
      price: 200,
      thumbnail: "testing-1",
      code: "44tengo asffdasds",
      stock: 25,
    });
    await ProductManager1.addProduct({
      title: "testing-2",
      description: "testing-2",
      price: 200,
      thumbnail: "testing-2",
      code: "334",
      stock: 25,
    });
    await ProductManager1.addProduct({
      title: "testing-2",
      description: "testing-2",
      price: 200,
      thumbnail: "testing-2",
      code: "445127",
      stock: 25,
    });
    // await ProductManager1.addProduct({
    //   title: "testing-2",
    //   description: "testing-2",
    //   price: 200,
    //   thumbnail: "testing-2",
    //   code: "47ass1q",
    //   stock: 25,
    // });
    // console.log(await ProductManager1.getProductById(1));
    // await ProductManager1.updateProduct(1, {
    //   title: "9198198",
    //   description: "7827821",
    // });
    // await ProductManager1.deleteProduct(2);
    // await ProductManager1.deleteProduct(3);
    console.log(await ProductManager1.getProducts());
  } catch (error) {
    console.error(error.message);
  }
};

ejecutar();
