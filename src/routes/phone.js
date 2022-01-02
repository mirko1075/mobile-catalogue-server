const {ConnectionPool} = require("../conf/ConnectionDb");
const {PG_USER, PG_DATABASE, PG_PASSWORD, PG_PORT, PG_HOST, NODE_ENV} = process.env;
console.log('PG_USER, PG_DATABASE, PG_PASSWORD, PG_PORT, PG_HOST, NODE_ENV :>> ', PG_USER, PG_DATABASE, PG_PASSWORD, PG_PORT, PG_HOST, NODE_ENV);
const isProduction = NODE_ENV === "production";
const sslObj = isProduction?  {
  require: false, 
  rejectUnauthorized: false
}
: false;
const connectionPool = new ConnectionPool(sslObj )
console.log('connectionPool :>> ', connectionPool);
connectionPool.pool.on('error', function(error) {
  console.log('error :>> ', error);
  return;
});

const getPhones = async (request, response) => {
    try {
      await connectionPool.pool.query('SELECT * FROM phones ORDER BY id ASC', (error, result) => {
        console.log('result :>> ', result);
        console.log('error :>> ', error);
        if (error) {
          response.send({message:"Error in DB", status: "error", error})
        }
        if (result?.rowCount===0){
          response.status(404).send({message:"No phone with this id", status: "error", error})
        }else{
          response.status(200).json(result.rows)          
        }
      })    
    } catch (error) {
      console.log(`error`, error)
      //response.status(404).send({message:"Phones not found server error", status: "error", error})
    }
  }

  const getPhone = async (request, response) => {
    const id = parseInt(request.params.id)
    try {
      await connectionPool.pool.query('SELECT * FROM phones WHERE id = $1', [id], (error, result) => {
        if (error) {
          response.send({message:"Error in DB", status: "error", error})
        }
        if (result?.rowCount===0){
          response.status(404).send({message:"No phone with this id", status: "error", error})
        }else{
          response.status(200).json(result.rows)          
        }
      })      
    } catch (error) {
      response.status(404).send({message:"Phone not found server error",id, status: "error", error})
    }
  }

  const postPhone = async (request, response) => {
    let {phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram,B64File } = request.body
    const phone = {phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram,file:B64File}
    if (!ram) ram=0;
    if (!price) price=0;
    if (phone_name) {
        try {
          await connectionPool.pool.query('INSERT INTO phones (phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram,file) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id',
          [phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram,B64File], (error, result) => {
            if (error) {
              console.log('error :>> ', error);
              throw error
            }
            response.status(201).send({message: "Phone successfully added!",id: result.rows[0].id, ...phone });
          })  
        } catch (error) {
          console.log('error :>> ', error);
          response.status(404).send({message:"Phone not added server error", status: "error", error})
        }
    }else{
      response.status(404).send({message:"Phone name is mandatory field", status: "error"})
    }

  }

  const updatePhone = async (request, response) => {
    const id = parseInt(request.params.id)
    const {phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram,B64File } = request.body
    const phone = {phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram,file:B64File}
    if (phone_name) {
      try {
        await connectionPool.pool.query(
          'UPDATE phones SET phone_name = $1, manufacturer=$2, description=$3, color=$4,  price=$5, image_file_name=$6, screen=$7, processor=$8, ram=$9, file=$10 WHERE id = $11',
          [phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram,B64File, id],
          (error, result) => {
            if (error) {
              throw error
            }
            if (result?.rowCount===0){
              response.status(400).send({message: "No phone with id" +id, status : "error"});
            } else {
              response.status(200).send({message: "Phone successfully modified", status: "success", id, ...phone });
            }
            
          }
        )
      } catch (error) {
        response.send(error)
      }
    }else{
      response.status(404).send({message: "Phone name is mandatory field", status: "error"})
    }
  }

  const deletePhone = async (request, response) => {
    const id = parseInt(request.params.id)
    try {
      connectionPool.pool.query('DELETE FROM phones WHERE id = $1', [id], (error, result) => {
        if (error) {
          console.log('error :>> ', error);
          throw error
        }
        if (result?.rowCount===0) {
         response.status(400).send({message: `Phone with ID: ${id} not found`, status: "error",})
        }else{
          response.status(200).send({message: `Phone deleted with ID: ${id}`, status: "success",})
        }
        
      })
    } catch (error) {
      console.log('error :>> ', error);
      response.status(404).send({message: `Phone with ID: ${id} not deleted`, status: "error", error})
    }

  }

  module.exports = {
    getPhones,
    getPhone,
    postPhone,
    updatePhone,
    deletePhone,
  }