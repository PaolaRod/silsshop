import { shoppingCart } from '../support/pages/Carrito.Page.js';

describe('Silsshop | Carrito | Agregar un producto al carrito', () => {
  beforeEach(() => {
    cy.visit('https://silsshop.sils.tech');
    cy.url().should('include', 'sils.tech');
  });
  it('TC1: Agregar un producto al carrito de compras exitosamente', () => {
    //se selecciona una categoria
    shoppingCart.selectRandomCategorie();

     //se selecciona un producto
    shoppingCart.selectRandomProduct();
    cy.url().should('include', 'product');

    //se guarda el nombre y precio
    shoppingCart.getProductName();
    shoppingCart.getProductPrice();

    //se agrega el producto
    shoppingCart.ClickAddToCartButton();
    shoppingCart.get.shoppingCartIconNumber().contains('1');

    shoppingCart.GoToShoppingCart();
    cy.url().should('include', 'cart');

    //se valida que el producto agregado sea el correcto
    cy.get('@productName').then((productName) => {
      shoppingCart.get.shoppingCartItem().eq(1).contains(productName);
    });
    cy.get('@productPrice').then((productPrice) => {
      shoppingCart.get.shoppingCartItem().eq(2).contains(productPrice);
    });
  });

  it('TC2: Eliminar un producto del carrito de compras correctamente', () => {
    //se agrega el primer producto y se guarda el nombre
    shoppingCart.selectRandomCategorie();
    shoppingCart.selectRandomProduct();
    shoppingCart.ClickAddToCartButton();
    shoppingCart.getProductName();

    //se agrega el segundo producto
    shoppingCart.selectRandomCategorie();
    shoppingCart.selectRandomProduct();
    shoppingCart.ClickAddToCartButton();

    //se verifica que se agregaron 2 productos
    shoppingCart.get.shoppingCartIconNumber().contains('2');

    shoppingCart.GoToShoppingCart();
    cy.url().should('include', 'cart');

    //se elimina un producto
    shoppingCart.deleteProduct();
    shoppingCart.get.shoppingCartIconNumber().contains('1');

    //se verifica que no exista el producto eliminado en el carrito
    cy.get('@productName').then((productName) => {
      shoppingCart.get.shoppingCartItem().eq(1).should('not.contain', productName);
    });
  });
});
