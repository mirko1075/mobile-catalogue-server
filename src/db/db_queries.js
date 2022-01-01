const Pool = require('pg').Pool
const Pool = require('pg').Pool
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}:ssl=true`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});
const getPhones = (request, response) => {
    try {
      pool.query('SELECT * FROM phones ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })    
    } catch (error) {
      response.send(error)
    }
  }

  const getPhoneById = (request, response) => {
    const id = parseInt(request.params.id)
    try {
      pool.query('SELECT * FROM phones WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })      
    } catch (error) {
      response.send(error)
    }
  }

  const createPhone = async (request, response) => {
    let {phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram,B64File } = request.body
    console.log('request.body :>> ', request.body);
    console.log('phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram :>> ', phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram);
    console.log('B64File :>> ', B64File);
    if (!ram) ram=0;
    if (!price) price=0;
    if (phone_name) {
        try {
          if (B64File){
            console.log("base64 \'base64\'")
            pool.query('INSERT INTO phones (phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram,file) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id',
            [phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram,B64File], (error, result) => {
              if (error) {
                throw error
              }
              response.status(201).send(`Phone added added with ID: ${result.rows[0].id}`);
            })  
          }else{
            pool.query('INSERT INTO phones (phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',
            [phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram], (error, result) => {
              if (error) {
                throw error
              }
              response.status(201).send(`Phone added added with ID: ${result.rows[0].id}`);
            })  
          }

        } catch (error) {
          response.send(error)
        }
    }else{
      response.status(404).send("Phone name is mandatory field")
    }

  }

  const updatePhone = (request, response) => {
    const id = parseInt(request.params.id)
    const {phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram } = request.body
    console.log('image_file_name :>> ', image_file_name);
    if (phone_name) {
      try {
        pool.query(
          'UPDATE phones SET phone_name = $1, manufacturer=$2, description=$3, color=$4,  price=$5, image_file_name=$6, screen=$7, processor=$8, ram=$9 WHERE id = $10',
          [phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram, id],
          (error, results) => {
            console.log('results :>> ', results);
            if (error) {
              throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
          }
        )
      } catch (error) {
        response.send(error)
      }
    }else{
      response.status(404).send("Phone name is mandatory field")
    }
  }

  const deletePhone = (request, response) => {
    const id = parseInt(request.params.id)
    try {
      pool.query('DELETE FROM phones WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Phone deleted with ID: ${id}`)
      })
    } catch (error) {
      response.send(error)
    }

  }

  module.exports = {
    getPhones,
    getPhoneById,
    createPhone,
    updatePhone,
    deletePhone,
  }