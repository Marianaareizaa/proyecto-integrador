

class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text())
    }

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        }
        return id || 'home';
    }

    getViewUrlFromId(id) {
        return `views/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `./modules/${id}.js`;
        
    }

    setActiveLink(id) {
        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            if (link.getAttribute('href') === `#/${id}`) {
                link.classList.add('main-nav__link--active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('main-nav__link--active');
                link.removeAttribute('aria-current');
            }
        });
    }
    async initJS(id) {
        const moduleUrl = this.getModuleUrlFromId(id);
        try {
            const {default: module} = await import(moduleUrl);
            if (typeof module.init !== 'function') {
                console.error(`El módulo ${id} no posee un método init().`);
                return;
            }
            module.init();
        } catch (error) {
            console.error(`No se pudo importar el módulo ${moduleUrl}.`);
        }
    }

    async loadTemplate() {
        const id = this.getIdFromHash();
        
        const viewUrl = this.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        document.querySelector('.container').innerHTML = viewContent;

        this.setActiveLink(id);

        this.initJS(id);
    }

    async loadTemplates() {
        this.loadTemplate();
        window.addEventListener('hashchange', () => this.loadTemplate());
    }

    async start() {
        await this.loadTemplates();
    }
    
}

const main = new Main();
main.start();



const changeTitle = document.querySelectorAll('title');

for(let i = 0; i < changeTitle.length; i++){
    changeTitle[i].innerHTML += ' - Mariana Areiza López - Proyecto Integrador: Juguetería Cósmica' 
}

const buttonCart= document.querySelector('button');
const cart= document.querySelector('.cart-modal-container')
let showCart = true;


function openCart(){
    buttonCart.classList.toggle('active', showCart);
    cart.classList.toggle('display',showCart);        
    cart.classList.toggle('cart-modal-container',!showCart)
    showCart = !showCart;
}


buttonCart.addEventListener('click', openCart);




function closeCart() {
    buttonCart.classList.remove('active');
    cart.classList.remove('display');
    cart.classList.add('cart-modal-container');
    showCart = !showCart;
}


window.addEventListener('keydown', ev => {
    if (ev.key === 'Escape') {
      console.warn('cerrar modal');
      closeCart();
    }
});


const buttonClose = document.querySelector('.x');
buttonClose.addEventListener('click', ev =>{
  closeCart()
});

const buttonTrash = document.querySelector('table');

buttonTrash.addEventListener('click', () => {
    console.log(event.target, 'Botón de eliminar presionado')
})


 
const body = document.querySelector('body');
body.addEventListener("blur", (ev) => {
  if (ev.target !== buttonCart && !cart.contains(ev.target)) {
    console.warn('cerrar modal');
    closeModal();
  }
});

