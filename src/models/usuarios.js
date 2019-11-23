const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UsuariosSchema = new mongoose.Schema({
    nome: { type: String },
    email: { type: String },
    senha: { type: String },
    telefone: [{
        numero: { type: Number },
        ddd: { type: Number }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    versionKey: false
})

UsuariosSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash

    next()
})
const Usuarios = mongoose.model('Usuarios', UsuariosSchema)

module.exports = Usuarios