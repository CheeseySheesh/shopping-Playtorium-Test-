import React, { useContext, useState, useEffect} from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import {
  applyFixedAmountDiscount,
  applyPercentageDiscount,
  applyCategoryPercentageDiscount,
  applyPointsDiscount,
  applySpecialCampaignsDiscount,
} from "./discount"

import "./cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [discountType1, setDiscountType1] = useState("");
  const [discountType2, setDiscountType2] = useState("");
  const [discountType3, setDiscountType3] = useState("");
  const [isCartReady, setIsCartReady] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    setIsCartReady(true);
  }, []);

  const handleDiscountChange1 = (event) => {
    setDiscountType1(event.target.value);
  };
  const handleDiscountChange2 = (event) => {
    setDiscountType2(event.target.value);
  };
  const handleDiscountChange3 = (event) => {
    setDiscountType3(event.target.value);
  };

  const isCategory = (category) => {
    if (!isCartReady) {
      return false;
    }
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        if (itemInfo && itemInfo.category === category) {
          return true;
        }
      }
    }
    return false;
  };

  const applyDiscount = () => {
    let discountedPrice = totalAmount;
  
    switch (discountType1) {
      case "fixed":
        discountedPrice = applyFixedAmountDiscount(discountedPrice, 100);
        break;
      case "percentage":
        discountedPrice = applyPercentageDiscount(discountedPrice, 10);
        break;
      case "category(Clothing)":
        discountedPrice = applyCategoryPercentageDiscount(discountedPrice, cartItems, "Clothing", 15);
        break;
      case "category(Electronics)":
        discountedPrice = applyCategoryPercentageDiscount(discountedPrice, cartItems, "Electronics", 10);
        break;
      case "category(Accessories)":
        discountedPrice = applyCategoryPercentageDiscount(discountedPrice, cartItems, "Accessories", 20);
        break;
      case "points":
        discountedPrice = applyPointsDiscount(discountedPrice, 68);
        break;
      case "special campaigns":
        discountedPrice = applySpecialCampaignsDiscount(discountedPrice, 300, 40);
        break;
      default:
        break;
    }
  
    switch (discountType2) {
      case "fixed":
        discountedPrice = applyFixedAmountDiscount(discountedPrice, 100);
        break;
      case "percentage":
        discountedPrice = applyPercentageDiscount(discountedPrice, 10);
        break;
      case "category(Clothing)":
        discountedPrice = applyCategoryPercentageDiscount(discountedPrice, cartItems, "Clothing", 15);
        break;
      case "category(Electronics)":
        discountedPrice = applyCategoryPercentageDiscount(discountedPrice, cartItems, "Electronics", 10);
        break;
      case "category(Accessories)":
        discountedPrice = applyCategoryPercentageDiscount(discountedPrice, cartItems, "Accessories", 20);
        break;
      case "points":
        discountedPrice = applyPointsDiscount(discountedPrice, 68);
        break;
      case "special campaigns":
        discountedPrice = applySpecialCampaignsDiscount(discountedPrice, 300, 40);
        break;
      default:
        break;
    }
  
    switch (discountType3) {
      case "fixed":
        discountedPrice = applyFixedAmountDiscount(discountedPrice, 100);
        break;
      case "percentage":
        discountedPrice = applyPercentageDiscount(discountedPrice, 10);
        break;
      case "category(Clothing)":
        discountedPrice = applyCategoryPercentageDiscount(discountedPrice, cartItems, "Clothing", 15);
        break;
      case "category(Electronics)":
        discountedPrice = applyCategoryPercentageDiscount(discountedPrice, cartItems, "Electronics", 10);
        break;
      case "category(Accessories)":
        discountedPrice = applyCategoryPercentageDiscount(discountedPrice, cartItems, "Accessories", 20);
        break;
      case "points":
        discountedPrice = applyPointsDiscount(discountedPrice, 68);
        break;
      case "special campaigns":
        discountedPrice = applySpecialCampaignsDiscount(discountedPrice, 300, 40);
        break;
      default:
        break;
    }
    return discountedPrice;
  };
  

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <div className="dropdown">
            <select value={discountType1} onChange={handleDiscountChange1}>
              <option value="">Select Discount Type</option>
              <option value="fixed">Discount 100฿</option>
              <option value="percentage">Discount 10%</option>
              <option value="category(Clothing)" disabled={!isCategory("Clothing")}>
                Discount 15%(Clothing)
              </option>
              <option value="category(Electronics)" disabled={!isCategory("Electronics")}>
                Discount 10%(Electronics)
              </option>
              <option value="category(Accessories)" disabled={!isCategory("Accessories")}>
                Discount 20%(Accessories)
              </option>
              <option value="points">Discount by points</option>
              <option value="special campaigns" disabled={totalAmount < 300}>
                Special campaigns(discount 40฿ per 300฿ spend)
              </option>
            </select>
          </div>
          <div className="dropdown">
            <select value={discountType2} onChange={handleDiscountChange2}>
              <option value="">Select Discount Type</option>
              <option value="fixed" disabled={discountType1 === "percentage" || "fixed"}>Discount 100฿</option>
              <option value="percentage"disabled={discountType1 === "percentage" || "fixed"}>Discount 10%</option>
              <option value="category(Clothing)" disabled={!isCategory("Clothing") || (discountType1 === "category(Clothing)") || (discountType1 === "category(Electronics)") || (discountType1 === "category(Accessories)")}>
                Discount 15%(Clothing)
              </option>
              <option value="category(Electronics)" disabled={!isCategory("Electronics") || (discountType1 === "category(Clothing)") || (discountType1 === "category(Electronics)") || (discountType1 === "category(Accessories)")}>
                Discount 10%(Electronics)
              </option>
              <option value="category(Accessories)" disabled={!isCategory("Accessories") || (discountType1 === "category(Clothing)") || (discountType1 === "category(Electronics)") || (discountType1 === "category(Accessories)")}>
                Discount 20%(Accessories)
              </option>
              <option value="points" disabled={(discountType1 === "category(Clothing)") || (discountType1 === "category(Electronics)") || (discountType1 === "category(Accessories)")}>Discount by points</option>
              <option value="special campaigns" disabled={totalAmount < 300 || discountType1 === "special campaigns"}>
                Special campaigns(discount 40฿ per 300฿ spend)
              </option>
            </select>
          </div>
          <div className="dropdown">
            <select value={discountType3} onChange={handleDiscountChange3}>
              <option value="">Select Discount Type</option>
              <option value="fixed" disabled={discountType1 || discountType2 === "percentage" || "fixed"}>Discount 100฿</option>
              <option value="percentage" disabled={discountType1 || discountType2 === "percentage" || "fixed"}>Discount 10%</option>
              <option value="category(Clothing)" disabled={!isCategory("Clothing") || (discountType2 === "category(Clothing)" || "category(Electronics)" || "category(Accessories)")}>
                Discount 15%(Clothing)
              </option>
              <option value="category(Electronics)" disabled={!isCategory("Electronics") || (discountType2 === "category(Clothing)" || "category(Electronics)" || "category(Accessories)")}>
                Discount 10%(Electronics)
              </option>
              <option value="category(Accessories)" disabled={!isCategory("Accessories") || (discountType2 === "category(Clothing)" || "category(Electronics)" || "category(Accessories)")}>
                Discount 20%(Accessories)
              </option>
              <option value="points" disabled={discountType2 === "category(Clothing)" || "category(Electronics)" || "category(Accessories)"}>Discount by points</option>
              <option value="special campaigns" disabled={totalAmount < 300 || discountType1 === "special campaigns" || discountType2 === "special campaigns"}>
                Special campaigns(discount 40฿ per 300฿ spend)
              </option>
            </select>
          </div>

          {discountType1 && discountType2 && discountType3 && <p>Applied Coupon: {discountType1}, {discountType2}, {discountType3}</p>}

          <p>Total price: {applyDiscount()}฿</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <h1>Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
