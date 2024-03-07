class ProductManager {

  #products;
  static AUTOINCREMENTING_ID = 1;

  constructor() {
    this.#products = [];
  };


  addProduct = (title, description, price, thumbnail, code, stock) => {
    const codeValidator = this.#products.some(e => e.code === code);

    !title || !description || !price || !thumbnail || !code || !stock || codeValidator ? console.log(`Not found`)
      : this.#products.push({ id: ProductManager.AUTOINCREMENTING_ID++, title, description, price, thumbnail, code, stock, })
  };


  getProducts = () => console.log(this.#products)


  getProductById = (prodId) => {
    const productoPorId = this.#products.find(e => e.id === prodId);
    productoPorId ? console.log(productoPorId) : console.log(`Not found`);
  };

};


const ProductManager1 = new ProductManager();

ProductManager1.getProducts();

ProductManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
//ProductManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "ieie", 25);
//ProductManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);


ProductManager1.getProducts();

//ProductManager1.getProductById(1)
//ProductManager1.getProductById(3)