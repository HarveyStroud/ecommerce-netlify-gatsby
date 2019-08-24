import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

/**
 * @ref https://stripe.com/docs/recipes/elements-react
 */
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false, stripe: null};
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_test_12345')});
    }
    else {
        document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe('pk_test_12345')});
      });
    }
  }

  async submit(ev) {
    // User clicked submit
    let {token} = await this.props.stripe.createToken({name: "Name"});
this.stripeEmail = 'harveys@live.fr';
const stripeData = { token, stripeEmail: this.stripeEmail };
    let response = await fetch("/index", {
        method: "POST",
        headers: {"Content-Type": "text/plain"},
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
