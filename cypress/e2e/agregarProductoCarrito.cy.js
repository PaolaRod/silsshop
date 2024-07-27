import { shoppingCart } from '../support/pages/Carrito.Page.js';

describe('Silsshop | Carrito | Agregar un producto al carrito', () => {
  before(() => {
    cy.visit('https://silsshop.sils.tech');
    cy.url().should('include', 'sils.tech');
  });
  it('TC1: Agregar un producto al carrito de compras exitosamente', () => {
    shoppingCart.selectRandomCategorie();

    shoppingCart.selectRandomProduct();

    cy.url().should('include', 'product');

    shoppingCart.getProductName();

    shoppingCart.getProductPrice();

    shoppingCart.ClickAddToCartButton();
    shoppingCart.get.shoppingCartIconNumber().contains('1');

    shoppingCart.GoToShoppingCart();
    cy.url().should('include', 'cart');

    cy.get('@productName').then((productName) => {
      shoppingCart.get.shoppingCartItem().eq(1).contains(productName);
    });

    cy.get('@productPrice').then((productPrice) => {
      shoppingCart.get.shoppingCartItem().eq(2).contains(productPrice);
    });
  });
});
