const mongoose = require("mongoose"); // importando el componente mogoose

const areaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    animales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }]
});
module.exports = mongoose.model("Area", areaSchema);