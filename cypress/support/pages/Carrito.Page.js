class ShoppingCart {
  get = {
    categorieLink: () => cy.get('a.nav-link.text-capitalize'),
    productCard: () => cy.get('div.product-item-img'),
    productName: () => cy.get('div.product-single .title'),
    productPrice: () => cy.get('div.product-single .price .new-price'),
    addToCartButton: () => cy.get('button.add-to-cart-btn'),
    shoppingCartIconNumber: () => cy.get('.cart-btn .cart-items-value'),
    shoppingCartButton: () => cy.get('.cart-btn'),
    shoppingCartItem: () => cy.get('div.cart-ctr.py-4>').find('span.cart-ctxt'),
    deleteButton: () => cy.get('button.delete-btn').eq(0)
  };

  selectRandomCategorie() {
    this.get.categorieLink().then((categories) => {
      let randomCategorie = Cypress._.random(0, categories.length - 1);
      this.get.categorieLink().eq(randomCategorie).click();
    });
  }

  selectRandomProduct() {
    this.get.productCard().then((products) => {
      let randomProduct = Cypress._.random(0, products.length - 1);
        this.get.productCard().eq(randomProduct).click();
    });
  }

  getProductName() {
    this.get.productName().invoke('text').then((text) => {
        const productName = text.trim();
        cy.wrap(productName).as('productName');
    });
  }

  getProductPrice() {
    this.get.productPrice().invoke('text').then((text) => {
        const productPrice = text.trim();
        cy.wrap(productPrice).as('productPrice');
    });
  }

  GoToShoppingCart() {
    this.get.shoppingCartButton().click();
  }

  ClickAddToCartButton() {
    this.get.addToCartButton().click();
  }

  deleteProduct(){
    this.get.deleteButton().click()
  }
}

export const shoppingCart = new ShoppingCart();
