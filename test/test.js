const assert = require('assert');
const app = require('../index');

describe('Scenario 1', () => {
  let result = null;
  beforeEach(function() {
    app.addItem('Unlimited 1GB');
    app.addItem('Unlimited 1GB');
    app.addItem('Unlimited 1GB');
    app.addItem('Unlimited 5GB');
    result = app.checkoutCart();
  });

  it('should total to 94.7', () => assert.equal(result.total, 94.7));

  it('should have 3 Unlimited 1GB', () => {
    const { products } = result;
    const names = products.map(product => product.name);
    const index = names.indexOf('Unlimited 1GB');
    assert.equal(products[index].quantity, 3);
  });

  it('should have 1 Unlimited 5GB', () => {
    const { products } = result;
    const names = products.map(product => product.name);
    const index = names.indexOf('Unlimited 5GB');
    assert.equal(products[index].quantity, 1);
  });
});

describe('Scenario 2', () => {
  let result = null;
  beforeEach(function() {
    app.addItem('Unlimited 1GB', 2);
    app.addItem('Unlimited 5GB', 4);
    result = app.checkoutCart();
  });

  it('should total to 209.40', () => assert.equal(result.total, 209.40));

  it('should have 2 Unlimited 1GB', () => {
    const { products } = result;
    const names = products.map(product => product.name);
    const index = names.indexOf('Unlimited 1GB');
    assert.equal(products[index].quantity, 2);
  });

  it('should have 4 Unlimited 5GB', () => {
    const { products } = result;
    const names = products.map(product => product.name);
    const index = names.indexOf('Unlimited 5GB');
    assert.equal(products[index].quantity, 4);
  });
});

describe('Scenario 3', () => {
  let result = null;
  beforeEach(function() {
    app.addItem('Unlimited 1GB');
    app.addItem('Unlimited 2GB', 2);
    result = app.checkoutCart();
  });

  it('should total to 84.70', () => assert.equal(result.total, 84.70));

  it('should have 1 Unlimited 1GB', () => {
    const { products } = result;
    const names = products.map(product => product.name);
    const index = names.indexOf('Unlimited 1GB');
    assert.equal(products[index].quantity, 1);
  });

  it('should have 2 Unlimited 2GB', () => {
    const { products } = result;
    const names = products.map(product => product.name);
    const index = names.indexOf('Unlimited 2GB');
    assert.equal(products[index].quantity, 2);
  });

  it('should have 2 1 GB Data-pack', () => {
    const { products } = result;
    const names = products.map(product => product.name);
    const index = names.indexOf('1 GB Data-pack');
    assert.equal(products[index].quantity, 2);
  });
});

describe('Scenario 4', () => {
  let result = null;
  beforeEach(function() {
    app.addItem('Unlimited 1GB');
    app.addItem('1 GB Data-pack', 'I<3AMAYSIM');
    result = app.checkoutCart();
  });

  it('should total to 31.32', () => assert.equal(result.total, 31.32));

  it('should have 1 Unlimited 1GB', () => {
    const { products } = result;
    const names = products.map(product => product.name);
    const index = names.indexOf('Unlimited 1GB');
    assert.equal(products[index].quantity, 1);
  });

  it('should have 1 1 GB Data-pack', () => {
    const { products } = result;
    const names = products.map(product => product.name);
    const index = names.indexOf('1 GB Data-pack');
    assert.equal(products[index].quantity, 1);
  });
});
