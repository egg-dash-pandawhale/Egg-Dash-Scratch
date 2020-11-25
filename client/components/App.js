import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Text, Image, Center, Heading, Badge } from "@chakra-ui/react";
import Navbar from "./Navbar";
import NavbarL from "./NavbarL";
import NavbarC from "./NavbarC";
import SignUp from "./SignUp";
import Login from "./Login";
import Markets from "./Markets";

function App() {
  const defaultState = {
    user: {},
    cart: [],
    total: 0,
    isLoggedIn: false
  }

  const [state, setState] = useState(defaultState);
  console.log('this is state from APP: ', state);

  const [map, setMap] = useState({
    toggled: false,
  });

  function unAuth() {
    setState({
      ...state,
      isLoggedIn: false
    })
  }

  function emptyCart() {
    setState({
      ...state,
      cart: [],
      total: 0
    })
  }

  async function logOut() {
    for (let i = 0; i < cart.length; i++) {
      let quant = cart[i][0];
      let product = cart[i][1];
      let userId = state.id;
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, quant, userId }),
      };
      const response = await fetch("/", request);
      const data = await response.json();
    }
  }

  function toggled() {
    let checker = !map.toggled;
    setMap({ toggled: checker });
  }

  async function updateCart(customer_id, product_id, quantity) {
    try {
      const res = await fetch('/cart', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id, product_id, quantity }),
      })
      const data = await res.json()
      setState({
        ...state,
        cart: data,
      });
      console.log('FROM updateCart', data)
    } catch(e) {
      console.log('Error from updateCart', e)
    }
  }

  // This will be async.
  async function loggedIn(email, password) {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    const response = await fetch("/cust/login", request);
    const data = await response.json();
    console.log("this is data from login:", data);
    let toReturn = false;

    if (data) {
      setState({
        ...state,
        user: data,
        isLoggedIn: true,
      });
      toReturn = true;
    }
    return toReturn;
  }

  // This will be async.
  async function signedUp(
    name,
    lastName,
    addNum,
    addSt,
    addZip,
    username,
    password
  ) {
    name = String(name);
    lastName = String(lastName);
    addNum= Number(addNum);
    addSt = String(addSt);
    addZip = Number(addZip);
    username = String(username);
    password = String(password);

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: name,
        last_name: lastName,
        email: username,
        password: password,
        address_number: addNum,
        address_street: addSt,
        address_zip: addZip
      }),
    };
    const response = await fetch('/cust/signup', request);
    const data = await response.json();
    setState({
      ...state,
      isLoggedIn: true,
      address_number: addNum,
      address_street: addSt,
      address_zip: addZip,
      email: username,
    });
  }

  return (
    <div>
      {state.isLoggedIn ? (
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return (
                <div>
                  {map.toggled ? (
                    <div>
                      <NavbarL toggled={toggled} cart={state.cart} total={state.total} emptyCart={emptyCart} unAuth={unAuth}/>
                      <Markets version={true} state={state} id={state.user.id} setState={setState}/>
                    </div>
                  ) : (
                    <div>
                      <NavbarL toggled={toggled} cart={state.cart} total={state.total} emptyCart={emptyCart} unAuth={unAuth} updateCart={updateCart} state={state}/>
                      <Markets version={false} updateCart={updateCart} id={state.user.id} state={state} setState={setState}/>
                    </div>
                  )}
                </div>
              );
            }}
          />
          <Route
            path="/checkout"
            exact
            render={() => {
              return (
                <div>
                  <NavbarC cart={state.cart} />
                  This is where our checkout page will go.
                </div>
              );
            }}
          />
        </Switch>
      ) : (
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return (
                <div>
                  <Navbar />
                  <br />

                  <Center>
                    <Heading >
                      Welcome to Egg Dash!
                    </Heading>
                  </Center>
                  <br />
                  <Center>
                    <Image width='80%' borderRadius='15px' src="https://www.wegmans.com/wp-content/uploads/1097052-hero-wegmans-organic-farm-1-2048x1032.jpg" />
                  </Center>
                  <br />
                  <Center>
                    <Text>
                      We deliver organic, farm-fresh family meats and produce to any address, anytime.
                    </Text>
                  </Center>
                  <Center>
                    <Text>
                      Press <Badge>Users</Badge> to sign up or log in.
                    </Text>
                  </Center>
                </div>
              );
            }}
          />
          <Route
            path="/login"
            exact
            render={() => (
              <div>
                <Navbar />
                <Login loggedIn={loggedIn} />
              </div>
            )}
          />
          <Route
            path="/signup"
            exact
            render={() => (
              <div>
                <Navbar />
                <SignUp signedUp={signedUp} />
              </div>
            )}
          />
        </Switch>
      )}
    </div>
  );
}

export default App;

//logged out function invoked {
//   loop through our cart
//   for every item in our cart it will make a request to the server with the cart item in the body
// }
// req.body
