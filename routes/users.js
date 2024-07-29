const express = require("express");
const router = express.Router();
const { users } = require("../server");

router.get("/", (req, res) => {
    if (!users.length) {
        return res.status(400).json({
            msg: "No users found",
            variant: "error",
            payload: null,
        });
    }
    res.status(200).json({
        msg: "All Users",
        variant: "success",
        payload: users,
        total: users.length,
    });
});

router.post("/", (req, res) => {
    const existUser = users.find(user => user.username === req.body.username);
    if (existUser) {
        return res.status(400).json({
            msg: "Username already exists",
            variant: "warning",
            payload: null,
        });
    }

    const newUser = {
        id: new Date().getTime(),
        fname: req.body.fname,
        username: req.body.username,
        password: req.body.password,
    };

    users.push(newUser);

    res.status(201).json({
        msg: "User added",
        variant: "success",
        payload: newUser,
    });
});

router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex < 0) {
        return res.status(400).json({
            msg: "User not found",
            variant: "error",
            payload: null,
        });
    }

    users.splice(userIndex, 1);

    res.status(200).json({
        msg: "User deleted",
        variant: "success",
        payload: null,
    });
});

router.put("/:id", (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex < 0) {
        return res.status(400).json({
            msg: "User not found",
            variant: "error",
            payload: null,
        });
    }

    const updatedUser = {
        id,
        ...req.body,
    };

    users[userIndex] = updatedUser;

    res.status(201).json({
        msg: "User updated",
        variant: "success",
        payload: updatedUser,
    });
});

module.exports = router;
