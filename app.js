const express = require('express');
const app = express();
const port = 3000;
const fs=require('fs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const task=require('./task.json');

app.get('/tasks',(req,res)=>{
    res.status(200).json(task.tasks)
})

app.get('/tasks/:id',(req,res)=>{
      let data=task.tasks
      let id=req.params.id
      let filter=data.find(val=> val.id==id);
    
      if(filter==undefined){
        res.status(404).json('Data not found')
      }
      else{
        res.status(200).json(filter)
      }
     
})

app.post('/tasks',(req,res)=>{
      let data=req.body
      
      if(data.title===undefined||data.description===undefined|| data.completed===undefined||typeof data.completed!=='boolean'){
         res.status(400).json("Missing data")
      }else{
        const allowedKeys = ['title', 'description', 'completed'];
    const dataKeys = Object.keys(data);
    
    const hasExtraProperties = dataKeys.some(key => !allowedKeys.includes(key));
    
if(hasExtraProperties){
    res.status(400).json("Wrong data")
}else{
    let totalTsk=task
    let modifiedTask=totalTsk;
    let id=modifiedTask.tasks.length;
    data.id=id+1
    modifiedTask.tasks.push(data)
    fs.writeFile('./task.json',JSON.stringify(modifiedTask),{encoding:'utf-8',flag:'w'},(err,data)=>{
      if(err){
         return res.status(500).json("Internal server error")
      }else{
          return res.status(201).json("task created successfully")
      }
    })
}
             
      }     
})

app.put('/tasks/:id',(req,res)=>{
       let id=req.params.id;
       let data=req.body
       let totalTsk=task
       let getask=totalTsk.tasks.findIndex(val=> val.id==id);
           
       if(getask!==-1){
        
        if((data.title!==undefined && typeof data.title==='string')&&(data.description!==undefined && typeof data.description==='string')&&( data.completed!==undefined && typeof data.completed==='boolean' )){
            Object.assign(totalTsk.tasks[getask],data)
         
        fs.writeFile('./task.json',JSON.stringify(totalTsk),{encoding:'utf-8',flag:'w'},(err,data)=>{
            if(err){
               return res.status(500).json("Internal server error")
            }else{
                return res.status(200).json("task updated successfully")
            }
       })
        }else{
            res.status(400).json("Missing data")
        }
      
    }else{
        return res.status(404).json("data not found")
    }
})

app.delete('/tasks/:id',(req,res)=>{
let id=req.params.id;
let totalTsk=task
let getask=totalTsk.tasks.findIndex(val=> val.id==id);
if(getask!==-1){
   
   let data={tasks:totalTsk.tasks.filter(task => task.id !== Number(id))}
    
    fs.writeFile('./task.json',JSON.stringify(data),{encoding:'utf-8',flag:'w'},(err,data)=>{
        if(err){
           return res.status(500).json("Internal server error")
        }else{
            return res.status(200).json("task deleted successfully")
        }
   })
}else{
    return res.status(404).json("data not found")
}
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;