import React from "react";

const Navbar=(props)=> {
  
    return (
      <div style={style.nav}>
        <div style={style.cartIconContainer}>
          <img
            src="https://image.flaticon.com/icons/png/128/709/709782.png" style={style.cartIcon}
            alt="cart-img"
          />
          <span style={style.cartCount}>{props.count}</span>
        </div>
      </div>
    );
  }

const style = {
  cartIcon: {
    height: 32,
    marginRight: 20,
  },
  nav: {
    height: 70,
    background: "#4267b2",
    display: 'flex',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cartIconContainer: {
    position: "relative",
  },
  cartCount: {
    background: "yellow",
    borderRadius: "70%",
    padding: "2px 7px",
    position: "absolute",
    right: 0,
    top: -9,
  },
};
export default Navbar;
