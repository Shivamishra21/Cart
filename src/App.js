//import './App.css';
import React from "react";
//import CartItem from "./cartItem";
import Cart from "./cart.js";
import Navbar from "./Navbar";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          price: 999,
          title: "Watch",
          qty: 1,
          img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfmTa3ZJ05StcF0Voy4o9uqqSUPhqvrTLuMA&usqp=CAU",
          id: 1,
        },
        {
          price: 14999,
          title: "Mobile Phone",
          qty: 2,
          img:
            "https://static.digit.in/product/thumb_160001_product_td_300.jpeg",
          id: 2,
        },
        {
          price: 2000,
          title: "Laptop",
          qty: 6,
          img:
            "https://www.macworld.co.uk/cmsdata/reviews/3685152/surface_laptop_2_vs_macbook_pro_1600home_thumb800.jpg",
          id: 3,
        },
      ],
    };
  }
  handleIncreaseQuantity = (product) => {
    // console.log("Heyy!!!", product);
    const { products } = this.state;
    const index = products.indexOf(product);
    products[index].qty += 1;
    this.setState({
      products: products,
    });
  };
  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty === 0) {
      return;
    }
    products[index].qty -= 1;
    this.setState({
      products: products,
    });
  };
  handleDeleteQuantity = (id) => {
    const { products } = this.state;
    console.log("product in delete:", products);
    //This filter will give us an array that does not contain id === id
    const items = products.filter((item) => item.id !== id);
    this.setState({
      products: items,
    });
  };
  getCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  };
  getTotalPrice = () => {
    const { products } = this.state;
    let total = 0;
    products.forEach((product) => {
      total =total+( product.qty * product.price);
    });
    return total;
  };
  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDelete={this.handleDeleteQuantity}
        />

        <div style={{fontSize:30, margin:40,fontWeight:'bold',textDecoration:'underline'}}>TOTAL PRICE :{this.getTotalPrice()}</div>
      </div>
    );
  }
}

export default App;
