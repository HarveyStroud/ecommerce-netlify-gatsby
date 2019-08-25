import React from 'react'
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import {Elements, StripeProvider} from 'react-stripe-elements'
import InjectedCheckoutForm from '../components/MyStoreCheckout'

function buySomethingCheapAndCheerful() {
  alert("Buying SomethingCheapAndCheerful!")
}

const SecondPage = class extends React.Component {
  constructor() {
    super();
    this.state = {stripe: null};
  }

  componentDidMount() {
    // Create Stripe instance once Stripe.js loads
    if (window.Stripe) {
      // (componentDidMount only fires in browser/DOM environment)
      this.setState({stripe: window.Stripe('pk_test_NtNh5ztyxJ1Qi7KXNaWPVTdm00Facs4hnt')});
    }
    else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe('pk_test_NtNh5ztyxJ1Qi7KXNaWPVTdm00Facs4hnt')});
      });
    }
  }

  render() {
    // this.state.stripe will either be null or a Stripe instance
    // depending on whether Stripe.js has loaded.
    // Todo: Possibly move StripeProvider higher up (into layout.js?)
    return (
      <Layout>
        <SEO title="Page two" />
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <button onClick={buySomethingCheapAndCheerful}>Buy something cheap 'n' cheerful...</button>
        <br />
        <br />
        <StripeProvider stripe={this.state.stripe}>
          <div className="example">
            <h1>React Stripe Elements Example</h1>
            <Elements>
              <InjectedCheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
        <br />
        <br />
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}

export default SecondPage
