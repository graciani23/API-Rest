const express = require('express')

exports.get = (req, res) => {
    res.send({ ok: true, userId: req.userId })
}
