const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const PORT = 8000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const DATA = {
    users: [
        {
            id: 1,
            fname: "John",
            username: "john32",
            password: "12345678",
        },
    ],
    products: [
        {
            id: 1,
            title: "Galaxy",
            price: 400,
            url: "",
            category: "phone",
        },
    ],
};

module.exports = DATA;
