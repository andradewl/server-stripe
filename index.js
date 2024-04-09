import express from "express"
const app = express()
const stripe = require("stripe")('sk_test_51OtaX0JA4oGedNG8rAzctAxCGtoZMKsCjmkTTYTZ3QG4nzZEpYL4029oQ4oHxTfQTzeRtZfUVgzGTW5CZv3uWqZh00NfpQg12i')
import { urlencoded, json } from "body-parser"
import cors from "cors"

app.use(urlencoded({ extended: true }))
app.use(json())

app.use(cors())

app.post("/payment-sheet", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.listen(4002, ()=> console.log("Running on http://localhost:4002"))