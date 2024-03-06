class ProductManager {

  #products;
  static ID_AUTOINCREMENTABLE = 1;


  constructor() {
    this.#products = [];
  };


  addProduct = (title, description, price, thumbnail, code, stock) => {

    const validadorDeCode = this.#products.some(e => e.code === code);

    if (!title || !description || !price || !thumbnail || !code || !stock || validadorDeCode) {
      return console.log(`“Not found”`)
    } else {
      this.#products.push({
        id: ProductManager.ID_AUTOINCREMENTABLE++,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      })
    }
  };

  getProducts = () => console.log(this.#products)

  getProductById = (prodId) => {
    const productoPorId = this.#products.find(e => e.id === prodId)


    if (productoPorId) {
      return console.log(productoPorId)
    } else {
      return console.log(`“Not found”`)
    };
  };

};


const ProductManager1 = new ProductManager();

ProductManager1.getProducts();

ProductManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
ProductManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);


ProductManager1.getProducts();

ProductManager1.getProductById(1)
ProductManager1.getProductById(2)