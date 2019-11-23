const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    // header de autorização
    const authHeader = req.headers.authorization

    // verificando se o token foi informado
    if (!authHeader)
    return res.status(401).send({ message: 'No token provided!' })

    // verificando se o token está no formato esperado = Bearer w23dfdt4fhuytjhnhbuyiy35HJ437hfgg342F
    const parts = authHeader.split(' ')

    if (!parts.length === 2)
    return res.status(401).send({ message: 'Token error!' })

    // desestruturando -> scheme = bearer e token = token 
    const [ scheme, token ] = parts

    // Regex
    if(!/^Bearer$/i.test(scheme))
    return res.status(401).send({ message: 'Token malformatted!' })

    // validação final
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ message: 'Token invalid' })

        req.userId = decoded.id
        return next()
    })
}