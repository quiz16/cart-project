'use strict';

const ProductMatrix = [
  {
    id: 1,
    name: 'Unlimited 1GB',
    price: 24.90,
  },
  {
    id: 2,
    name: 'Unlimited 2GB',
    price: 29.90,
  },
  {
    id: 3,
    name: 'Unlimited 5GB',
    price: 44.90,
  },
  {
    id: 4,
    name: '1 GB Data-pack',
    price: 9.90,
  },
];

const Cart = [];
const Promo = 'I<3AMAYSIM';
let HasPromo = false;

const addItem = (item, opt = 1)  => {
  const names = ProductMatrix.map(product => product.name);
  const ids = Cart.map(product  => product.id);
  const indexName = names.indexOf(item);
  const product = ProductMatrix[indexName];
  const indexCart = ids.indexOf(product.id);
  let quantity = opt;

  if (opt === Promo) {
    quantity = 1;
    HasPromo = true;
  }

  // check if product is existing in the cart
  if (indexCart > -1) {
    // update quantity if existing
    return Cart[indexCart] = {
      ...Cart[indexCart],
      quantity: Cart[indexCart].quantity + quantity
    };
  }

  return Cart.push({
    ...product,
    quantity
  });
};

const checkoutCart = () => {
  const finalCart = [];
  let total = 0;

  Cart.forEach(item => {
    const {id, ...finalProd} = item;
    const {price, quantity: count} = finalProd;
    const names = finalCart.map(product => product.name);

    finalCart.push(finalProd);

    switch(id) {
      case 1:
        if (!(count % 3)) {
          return total += price * 2;
        }
        return total += price * count;
      case 2:
        const {id, ...res} = ProductMatrix[3]; // get free product
        finalCart.push({
          ...res,
          quantity: count,
        });
        return total += price * count;
      case 3:
        if ((count > 3)) {
          const priceOverride = 39.90;
          const subTotal = count * priceOverride;
          return total += subTotal;
        }
        return total += price * count;
      case 4:
        return total += price * count;

    }
  });

  if (HasPromo) {
    total *= .9; // 10% discount;
  }

  Cart.length = 0; // reset Cart

  return {
    total: Math.round(total * 100) / 100,
    products: finalCart,
  }
};

module.exports = {
  addItem,
  checkoutCart,
};
