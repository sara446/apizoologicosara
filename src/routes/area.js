const express = require("express");
const router = express.Router(); //manejador de rutas de express
const animalSchema = require("../models/animal");
const areaSchema = require("../models/area");

//areas
router.post("/areas", (req, res) => {
    const area = areaSchema(req.body);
    area
        .save().then((data) => {
            res.json(data)
        }).catch((error) => res.send(error));
});

//Modificar los datos de un área para agregar un animal
router.put("/areas/:id", async (req, res) => {
    const { id } = req.params;
    const animal = animalsSchema(req.body);
    var idAnimal = null;

    const animalConsulta = await animalsSchema.findOne({ codigo: req.body.codigo });
    if (!animalConsulta) {
        await animal.save().then((dataAnimal) => {
            idAnimal = dataAnimal._id;
        });
    } else {
        idAnimal = animalConsulta._id;
    }

areaSchema
    .updateOne({ _id: id }, {
        //$push >> agrega un nuevo elemento sin importar si ya existe
        //$addToSet >> agrega un nuevo elemento sin repetirlo
        $addToSet: { animales: idAnimal }
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;

