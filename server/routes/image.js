var express = require('express')
const fs = require('fs')
var router = express.Router()

// router.get("*",(req,res,next)=>{
//   console.log(">> Images.js hit <<");
//   console.log(req.url)
//   next();
// })
router.get("/:folder/:subfolder",(req,res,next)=>{
  const folderObj = {folder:req.params.folder,subfolder:req.params.subfolder}
  const fileName = req.query.name
  fs.readFile('./images/'+folderObj.folder+'/'+folderObj.subfolder+'/'+fileName+'.png',(err,data)=>{
    if(err){
      console.error(err)
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})
router.get("/:folder",(req,res,next)=>{
  const folderName = req.params.folder
  const fileName = req.query.name
  fs.readFile('./images/'+folderName+'/'+fileName+'.png',(err,data)=>{
    if(err){
      console.error(err)
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})
module.exports = router;