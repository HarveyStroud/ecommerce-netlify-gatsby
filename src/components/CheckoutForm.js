import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

/**
 * @ref https://stripe.com/docs/recipes/elements-react
 */
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    let {token} = await this.props.stripe.createToken({name: "Name"});

//this.stripeEmail = 'harveys@live.fr';
//const stripeData = { token, stripeEmail: this.stripeEmail };

/*
stripeEmail: payload.stripeEmail,
stripeAmt: Math.floor(getters.cartTotal * 100), //it expects the price in cents, as an integer
stripeToken: "tok_visa", //testing token, later we would use payload.data.token
stripeIdempotency: uuidv1() //we use this library to create a unique id
*/
const cartTotal = 123.45;
const stripeData = {
stripeEmail: 'harveys@live.fr',
stripeAmt: Math.floor(cartTotal * 100), //it expects the price in cents, as an integer
stripeToken: "tok_visa", //testing token, later we would use payload.data.token
stripeIdempotency: Math.floor(Math.random() * 1000000000000000000000);//uuidv1() //we use this library to create a unique id
};

//    let response = await fetch("/index", {
let response = await fetch("https://suspicious-wescoff-b3ac78.netlify.com/.netlify/functions/index", {
        method: "POST",
        headers: {"Content-Type": "text/application/json"},
        body: stripeData
    });

    if (response.ok) {
        this.setState({complete: true});
        console.log("Purchase Complete!")
    }
}

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
