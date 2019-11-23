const Usuarios = require('../models/usuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    }) // expiram em um dia - 86400seg
}


exports.postSignUp = async (req, res) => {
    const { email } = req.body
    try {
        if (await Usuarios.findOne({ email }))
            return res.status(400).send({ message: 'Email already exists' })

        const usuario = await Usuarios.create(req.body)

        //user.password = undefined

        return res.status(201).send({
            usuario,
            token: generateToken({ id: usuario.id })
        })

    } catch (err) {
        return res.status(400).send({ message: 'Falha ao registrar: ' + err })
    }
}

exports.postSignIn = async (req, res) => {
    const { email, senha } = req.body

    const usuario = await Usuarios.findOne({ email }).select('+senha') // .select - devido ao select:false informado no model/usuarios.js

    if (!usuario)
        return res.status(400).send({ message: 'Usuário não encontrado!' })

    // comparando se a senaha digitada é a mesma do DB
    if (!await bcrypt.compare(senha, usuario.senha))
        return res.status(401).send({ error: 'Senha inválida!' })

    res.send({
        usuario,
        token: generateToken({ id: usuario.id })
    })
}



