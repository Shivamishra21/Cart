import React from "react";

const CartItem =(props)=> {
  //  console.log("........", props);
    const { price, title, qty,} = props.product;
    const { product } = props;
    return (
      <div className="cart-item">
        <div className="left-block">
          <img style={styles.image} alt="" src={product.img} />
        </div>
        <div className="right-block">
          <div style={{ fontSize: 30 }}>{title}</div>
          <div style={{ color: "#777" }}>Rs: {price}</div>
           <div style={{ color: "#777" }}>Qty: {qty}</div>
          <div className="cart-item-actions">
            {/*button*/}
            <img
              alt="increase"
              className="action-icons"
              src="https://www.flaticon.com/svg/vstatic/svg/992/992651.svg?token=exp=1617718393~hmac=24bf152f2326087149b49ef1d26114b8"
              onClick={() => {
                props.onIncreaseQuantity(props.product);
              }}
            />
            <img
              alt="decrease"
              className="action-icons"
              src="https://www.flaticon.com/svg/vstatic/svg/992/992683.svg?token=exp=1617718469~hmac=bd10b3554fdad7bd082de7c057722f39"
              onClick={() => props.onDecreaseQuantity(props.product)}
            />
            <img
              alt="delete"
              className="action-icons"
              src="https://www.flaticon.com/svg/vstatic/svg/3096/3096673.svg?token=exp=1617718296~hmac=cdbb95660e687c4ceb5f99f28c59e884"
              onClick={() => {
                props.onDelete(props.product.id);
              }}
            />
          </div>
        </div>
      </div>
    );
  }


const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    background: "grey",
  },
};

export default CartItem;
