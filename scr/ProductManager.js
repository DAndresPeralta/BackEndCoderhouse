import fs from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = []; // No es necesario.
    }

    async addProduct(product) {
        try {
            const data = await this.readFile(); // Lee y guarda en la variable data el contenido del archivo
            if (data) {
                this.products = JSON.parse(data); // Parsea los datos y lo almacena en el array tipo objetos.
            }
            product.id = this.products.length
                ? this.products.reduce((max, product) => (product.id > max ? product.id : max), 0) + 1 : 1;

                console.log(product.id);
            this.products.push(product);

            await this.writeFile(this.products);
        } catch (error) {
            throw err;
        }
    }

    async getProducts() {
        try {
            const data = await this.readFile();
            this.products = JSON.parse(data);
            return this.products;
        } catch (err) {
            throw err;
        }
    }

    async getProductById(id) {
        try {
            const data = await this.readFile(); // ok
            this.products = JSON.parse(data); // ok
            let p = this.products.find((e) => e.id == id);
            if (id > this.products.length) {
                p = [{ error: "El producto no existe." }];
            }
            return p;
        } catch (err) {
            throw err;
        }
    }

    async updateProduct(id, product) {
        try {
            const data = await this.readFile();
            this.products = JSON.parse(data);
            const index = this.products.findIndex((product) => product.id === id);
            this.products[index] = product;

            await this.writeFile(this.products);
        } catch (err) {
            throw err;
        }
    }

    async deleteProduct(id) {
        try {
            console.log("Entro2");
            const data = await this.readFile();
            this.products = JSON.parse(data);
            const index = this.products.findIndex((product) => product.id === id);
            console.log(index);
            this.products.splice(index, 1);

            await this.writeFile(this.products);
        } catch (err) {
            throw err;
        }
    }

    async readFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, "utf-8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    async writeFile(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.path, JSON.stringify(data, null, "\t"), (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}

export default ProductManager;