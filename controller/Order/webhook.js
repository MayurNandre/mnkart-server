const stripe = require('../../config/stripe')
const addToCartModel = require('../../models/cartProducts')
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY
const orderProductsModel = require('../../models/orderProductsModel')

async function getLineItems(lineItems) {
  let productItems = []

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product)
      const productId = product.metadata.productId

      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images
      }

      productItems.push(productData)
    }
  }
  return productItems
}

const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const payloadString = JSON.stringify(req.body)
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

      const productDetails = await getLineItems(lineItems)
      // console.log("Lineitems ",lineItems)
      // console.log("total amount",session.amount_total/100)
      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status
        },
        shipping_options: session.shipping_options.map(s => {
          return { ...s, shipping_amount: s.shipping_amount / 100 }
        }),
        totalAmount: session.amount_total / 100
      }

      const order = await orderProductsModel(orderDetails)
      const saveOrder = await order.save()

      /* removing ordered items from cart */
      if(saveOrder?._id){
        const deleteCartItems = addToCartModel.deleteMany({userId : session.metadata.userId})

      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
}

module.exports = webhook