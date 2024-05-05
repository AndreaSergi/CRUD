import { Request, Response } from 'express'
import Joi from 'joi';
import { db } from '../db.js'





  
  console.log(db)
  
  
  // questi controlli typescript li facciamo già col database sopra  ^
  // type Planet = {
    //     id: number,
    //     name: string,
    //   };
    
    //   type Planets = Planet[];
    
    //   let planets: Planets = [
      //     {
        //       id: 1,
        //       name: "Earth",
        //     },
        //     {
          //       id: 2,
          //       name: "Mars",
          //     },
          //   ];
          
          
          
  const getAll = async (req:Request, res:Response) => {
    const planets = await db.many(`SELECT * FROM planets;`)
            
  res.status(200).json(planets)
  }
          
  const getOneById = async (req:Request, res:Response) => {
    const { id } = req.params;
    const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id))
    
    res.status(200).json(planet)
  }

//   VALIDATION USING JOI LIBRARY
  const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
  })
//----------------------------------------------


//CREATION USING JOI VALIDATION
  const create = (req:Request, res:Response) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    const validatedNewPlanet = planetSchema.validate(newPlanet)

    if(validatedNewPlanet.error){
        return res
        .status(400)
        .json({msg: validatedNewPlanet.error.details[0].message})
    } else {
        // planets = [...planets, newPlanet]
        res.status(201).json({ msg: "The planet is created" })
    }
  }
//------------------------------


  const updateById = (req:Request, res:Response) =>{
    const { id } = req.params;
    const { name } = req.body;
    // planets = planets.map((p) => (p.id === Number(id) ? {...p, name} : p) );

    res.status(200).json({ msg: "The planet is updated" });
  }


  const deleteById = (req:Request, res:Response) => {
    const { id } = req.params;
    // planets = planets.filter(p => p.id !== Number(id))

    res.status(200).json({msg: "The planet is deleted"})
  }

  const createImage = async (req:Request, res:Response) => {
    console.log(req.file);
    const {id} = req.params;
    const fileName = req.file?.path;

    if (fileName){
      db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName])
      res.status(201).json({msg: "Planets image uploaded succesfully."})
    } else {
      res.status(400).json({msg: "Planet image failed to upload"})
    }
  }

  export { getAll, getOneById, create, updateById, deleteById, createImage };