const express = require("express");
const app = express();
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;
require("dotenv").config();
const cors = require("cors");
const { response } = require("express");
app.use(cors());
app.use(express.json()); //if incoming body is json, convert it into request.body

const cart = [
	{ id: "1232df", item: "apple", quantity: 9 },
	{ id: "124354tgf", item: "orange", quantity: 8 },
	{ id: "093riefjk", item: "pear", quantity: 8 },
	{ id: "09283rwfejd", item: "grapes", quantity: 4 },
	{ id: "1290r8eofidl", item: "durian", quantity: 1 },
];

app.use(express.static(__dirname + "/static"));

app.get("/cart", (req, res) => {
	console.log(cart);
	res.status(200);
	res.type("application/json");
	//res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(cart);
});

app.get("/cart/:id", (req, res) => {
	const id = req.params.id;
	// const getSelectedData = cart.find(i=> i.id === id) directly gets the object
	const getSelectedData = cart.findIndex((i) => i.id === id);
	res.type("application/json");

	if (getSelectedData == -1) {
		res.status(404);
		res.json({});
		return;
	}
	res.status(200);

	res.json(cart[getSelectedData]);
});

app.put("/cart/:id", (req, res) => {
	const payload = req.body;
	const id = req.params.id;
	const findIndex = cart.findIndex((i) => i.id == id);
	if (findIndex < 0) {
		cart.push(payload);
	} else {
		cart[findIndex] = payload;
	}
	console.log(payload);
	res.status(200);
	res.type("application/json");
	res.json({});
});

app.delete("/cart/:id", (req, res) => {
	const id = req.params.id;
	const findItemIndex = cart.findIndex((i) => i.id == id);
	res.type("application/json");
	if (findItemIndex < 0) {
		res.status(200);
		res.json({ message: "no such cart item" });
	} else {
		cart.splice(findItemIndex, 1);
		res.status(200);
		res.json({ message: `item ${id} deleted` });
	}
});

app.post("/cart/addItem", (req, res) => {
	const payload = req.body;
	const findItemIndex = cart.findIndex((i) => i.id == payload.id);
	if (findItemIndex < 0) {
		cart.push(payload);
		res.status(200);
		res.json({
			message: `Item ${payload.id} of qty:${payload.quantity} added to cart`,
		});
	} else {
		//update
		cart[findItemIndex] = payload;
		res.status(200);
		res.json({
			message: `Item ${payload.id} exist in cart and is updated`,
		});
	}
});
app.listen(PORT, () => {
	console.log(`Application started on ${PORT}`);
});
