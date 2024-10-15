const express = require('express');

const app = express();

app.use(express.json());

let user = [
    {
        id : 1,
        name : "adan",
        age : 25,
        email : "ad@mail.com"
    },
    {
        id : 2,
        name : "michael",
        age : 30, 
        email : "michael@mail.com"
    }
]

app.get("/user" , (req , res)=>{
    res.json(user);
})
app.post("/register-user" , (req , res)=>{
    const newuser = {
        id : user.length +1,
        name : req.body.name,
        age: req.body.age,
        email : req.body.email
    }

    user.push(newuser);
    res.status(200).json(newuser);

})
app.delete("/delete-user/:id" , (req, res)=>{
  const deleteuser = req.params.id;

  user = user.filter((user)=> user.id != deleteuser);
  res.json(user);
})

app.put("/update-user/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = user.findIndex((u) => u.id === userId);
  
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
  
    user[userIndex] = { ...user[userIndex], ...req.body };
    res.status(200).json(user[userIndex]);
  });

const Port = 2000;
app.listen(Port , ()=>{
    console.log(`server is listenting on port ${Port}`)
})