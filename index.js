import express from "express";
import { static as expressStatic } from "express";
import { resolve } from "path";
import dotenv from "dotenv";
import stripePackage from "stripe"; // Import stripe using ES module syntax
import cors from "cors"; // Import cors

const app = express();

dotenv.config({ path: "./.env" });

// Initialize stripe with the secret key
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(expressStatic(process.env.STATIC_DIR));

app.use(cors());


// app.get("/", (req, res) => {
//   const path = resolve(process.env.STATIC_DIR + "/index.html");
//   res.sendFile(path);
// });


app.get("/", (req, res) => {
  res.send("<h1>¡Hola!</h1>");
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {

    // const { payment_method_config_id } = req.body; // Obtener el ID de la configuración del método de pago del cuerpo de la solicitud
    // if (!payment_method_config_id) {
    //   throw new Error("ID de la configuración del método de pago no proporcionado");
    // }

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      // payment_method_types: ["card"],
      // payment_method_config: payment_method_config_id,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.listen(4002, () => console.log("Running on http://localhost:4002"));