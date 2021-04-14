//import './App.css';
import React from "react";
//import CartItem from "./cartItem";
import Cart from "./cart.js";
import Navbar from "./Navbar";
import firebase from "firebase/app";
// import { logDOM } from "@testing-library/dom";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
    this.db = firebase.firestore();
  }
  //Taking data from firebase
  componentDidMount() {
    this.db
      .collection("products")
      .where("price", "==", 50000)
      .where("title",'<=','Necklace')
     // .orderBy('price','desc')
      .onSnapshot((snapshot) => {
        //  HERE WE ATTATCHED A LISTENER SO THAT WHEN SOMETHING CHANGES ON IT GET RENDERED AUTOMATICALLY
        console.log("snapshot:  ", snapshot);
        snapshot.docs.map((doc) => {
          console.log(doc.data());
        });
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({
          products,
          loading: false,
        });
      });
  }

  handleIncreaseQuantity = (product) => {
    // console.log("Heyy!!!", product);
    const { products } = this.state;
    const index = products.indexOf(product);
    //INCREASE QUANTITY IN YOUR LOCAL DATA(IN YOUR SYSTEM)
    // products[index].qty += 1;
    // this.setState({
    //   products: products,
    // });

    //INCREASING QUANTITY DIRECTLY IN FIREBASE
    const docRef = this.db.collection("products").doc(products[index].id);
    //console.log("SHVA   :",docRef)
    docRef
      .update({
        qty: products[index].qty + 1,
      })
      .then(() => {
        console.log("Updated Successfully");
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty === 0) {
      return;
    }
    const docRef = this.db.collection("products").doc(products[index].id);
    //console.log("SHVA   :",docRef)
    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then(() => {
        console.log("Updated Successfully");
      })
      .catch((error) => {
        console.log("Error : ", error);
      });

    // products[index].qty -= 1;
    // this.setState({
    //   products: products,
    // });
  };

  handleDeleteQuantity = (id) => {
    const { products } = this.state;
    console.log("product in delete:", products);
    //This filter will give us an array that does not contain id === id
    // const items = products.filter((item) => item.id !== id);
    const docRef = this.db.collection("products").doc(id);
    docRef
      .delete()
      .then(() => {
        console.log("Deleted Successfully");
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
    // this.setState({
    //   products: items,
    // });
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
      total = total + product.qty * product.price;
    });
    return total;
  };
  //adding data to firebase
  addProduct = () => {
    // console.log("In adding Function");
    this.db
      .collection("products")
      .add({
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSx5AOGdWQFp6iShBka2UoVfn1psBh9mTdiQ&usqp=CAU",
        price: 3000,
        qty: 1,
        title: "T-shirt",
      })
      .then((docRef) => {
        console.log("Product has been added ", docRef);
      });
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCount()} />
        <button
          style={{
            fontFamily: "cursive",
            fontSize: 20,
            padding: 12,
            background: "rgb(226, 145, 159)",
            margin: 12,
            borderRadius: 10,
          }}
          onClick={() => {
            this.addProduct();
          }}
        >
          Add a Product
        </button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDelete={this.handleDeleteQuantity}
        />
        {loading && <h1>Loading...</h1>}
        <div
          style={{
            fontSize: 30,
            margin: 40,
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          TOTAL PRICE :{this.getTotalPrice()}
        </div>
      </div>
    );
  }
}

export default App;

// HERE WE FETCH DATA JUST ONCE
// componentDidMount() {
//   this.db
//     .collection("products")
//     .get()
//     .then((snapshot) => {
//       console.log("snapshot:  ", snapshot);
//       snapshot.docs.map((doc) => {
//         console.log(doc.data());
//       });
//       const products = snapshot.docs.map((doc) => {
//         const data = doc.data()
//         data['id'] = doc.id;
//         return data ;
//       });
//       this.setState({
//         products ,
//         loading:false
//       })
//     });
// }
