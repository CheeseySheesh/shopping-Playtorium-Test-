import { PRODUCTS } from "../../products";

  export function applyFixedAmountDiscount(cartTotal, discountAmount) {
    return cartTotal - discountAmount;
  }

  export function applyPercentageDiscount(cartTotal, discountPercentage) {
    const discountAmount = (cartTotal * discountPercentage) / 100;
    return cartTotal - discountAmount;
  }

  export function applyCategoryPercentageDiscount(totalAmount, cartItems, category, discountPercentage) {
    let categoryTotal = 0;
    let noCategory = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        if(itemInfo.category === category){
          categoryTotal += cartItems[item] * itemInfo.price;
        }
        else{
          noCategory += cartItems[item] * itemInfo.price
        }
      }
    }
    const discountAmount = (categoryTotal * discountPercentage) / 100;
    return totalAmount - discountAmount;
  }
  
  export function applyPointsDiscount(cartTotal, customerPoints) {
    const maxDiscount = cartTotal * 0.20;
    const discountAmount = Math.min(customerPoints, maxDiscount);
    return cartTotal - discountAmount;
  }

  export function applySpecialCampaignsDiscount(cartTotal, discountEveryX, discountAmount) {
    const numberOfDiscounts = Math.floor(cartTotal / discountEveryX);
    const totalDiscountAmount = numberOfDiscounts * discountAmount;
    return cartTotal - totalDiscountAmount;
  }