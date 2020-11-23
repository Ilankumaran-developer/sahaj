const joi = require('joi')


const BUILD = joi.object({
    number_of_floors: joi.number().required(),
    number_of_main_corridors: joi.number().required(),
    number_of_sub_corridors: joi.number().required(),
  });

  const corridorCoordinate = joi.object({
      floor : joi.string().required(),
      corridor: joi.string().required()
  })

  const PROCESSSENSORINPUT = joi.object({
      movement : joi.boolean().required(),
      location : joi.array().items(corridorCoordinate).required()
  })

  module.exports = {
    BUILD,
    PROCESSSENSORINPUT
  }
  