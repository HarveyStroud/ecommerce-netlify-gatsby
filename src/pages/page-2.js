import React from 'react'
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from '../components/CheckoutForm'

function buySomethingCheapAndCheerful() {
  alert("Buying SomethingCheapAndCheerful!")
}

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <button onClick={buySomethingCheapAndCheerful}>Buy something cheap 'n' cheerful...</button>
    <br />
    <br />
    <StripeProvider apiKey="pk_test_NtNh5ztyxJ1Qi7KXNaWPVTdm00Facs4hnt">
      <div className="example">
        <h1>React Stripe Elements Example</h1>
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    </StripeProvider>
    <br />
    <br />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
