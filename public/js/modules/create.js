import productController from '../controllers/product.js';

console.warn('🆗: Módulo PageAlta cargado.');



setTimeout(()=>{
  const inputName = document.getElementById('name');
  const inputPrice = document.getElementById('price');
  const inputStock = document.getElementById('stock');
  const inputBrand = document.getElementById('brand');
  const inputCategory = document.getElementById('category');
  const formData = document.getElementById('form');
  const inputShortDescription = document.getElementById('shortdescription');
  const inputLongDescription = document.getElementById('largedescription');
  const inputButton = document.getElementById('btn');
  
  formData.addEventListener('change', () => {
  
    if (
      inputName.value !== '' &&
      inputPrice.value !== '' &&
      inputStock.value !== '' &&
      inputBrand.value !== '' &&
      inputShortDescription.value !== '' &&
      inputLongDescription.value !== ''
  
    ) {
      inputButton.disabled = false;
    }
  });
  console.log(formData)
  },100)


class PageAlta {

    static productsTableContainer;

    static async deleteProduct(e) {
        if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
            return false;
        }
        const row = e.target.closest('tr');
        const _id = row.querySelector('td[data-product-property="_id"]').innerHTML;
        const deletedProduct = await productController.deleteProduct(_id);
        PageAlta.loadTable();
        return deletedProduct;
    }


   





        // console.log(product)
        // const CreatedProduct = await productController.saveProduct(product)
        // console.log(CreatedProduct);
        // PageCreate.loadTable();
        // PageCreate.form.reset();
        // return CreatedProduct;
    

    // static getProductFromRow(row) {
    //     const rowCells = row.children;
    //     const product = {};
    //     for (const cell of rowCells) {
    //         if (cell.dataset.productProperty) {
    //             product[cell.dataset.productProperty] = cell.innerHTML;
    //         }
    //     }
    //     return product;
    // }

    static async completeForm(e) {
        const row = e.target.closest('tr');
        const productToEdit = PageAlta.getProductFromRow(row);
        console.log('productToEdit:', productToEdit);
    }

    static async addTableEvents() {
        PageAlta.productsTableContainer.addEventListener('click', async e => {
            if (e.target.classList.contains('btn-delete')) {
                const deletedProduct = await PageAlta.deleteProduct(e);
                console.log('deletedProduct:', deletedProduct);
                return;
            }
            // if (e.target.classList.contains('btn-edit')) {
            //     PageAlta.completeForm(e);
            //     return;
            // }
        });
    }

    static async createProduct() {
        const formName = document.getElementById('name');
        const formPrice = document.getElementById('price');
        const formStock = document.getElementById('stock');
        const formBrand = document.getElementById('brand');
        const formCategory = document.getElementById('category');
        const formShortDescription = document.getElementById('shortdescription');
    
        const productData = {
          name: formName.value,
          price: formPrice.value,
          stock: formStock.value,
          brand: formBrand.value,
          category: formCategory.value,
          descripcion_corta: formShortDescription.value,
        };
    
        try {
          const response = await productController.saveProduct(productData);
    
          if (response.ok) {
            alert('Producto agregado correctamente');
            form.reset();
            PageAlta.loadTable();
            return response;
          }
        } catch (error) {
          console.error(error);
          alert('Error al agregar el producto');
        }
      }
    


    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        PageAlta.productsTableContainer.innerHTML = html;
    }

    static async loadTable() {
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos.`);
        PageAlta.renderTemplateTable(products);
    }

    static async prepareTable() {
        PageAlta.productsTableContainer = document.querySelector('.products-table');
        await PageAlta.loadTable();
        PageAlta.addTableEvents();
    }

    static async init () {
        console.log('PageAlta.init()');
        const form = document.getElementById('form');
        form.addEventListener('submit', async (e) => {
        await PageAlta.createProduct();
        });
        PageAlta.prepareTable();
    }

}

export default PageAlta;
