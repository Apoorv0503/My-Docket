const express = require("express");
// const https=require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set("view engine","ejs");

let items=[];
let workItems=[];

app.get("/",function(req,res){
  var today = new Date();
  var currDay = today.getDay();
  var day="";

  var options={
    weekday:'long',
    day:'numeric',
    month:'long',

  };

   day=today.toLocaleDateString("en-US", options);
    res.render("list" ,{  listTitle : day,  newListItem : items  });


});

app.post("/",function(req,res){
   let item= req.body.newItem;

   if(req.body.list === "Work")
   {
     workItems.push(item);
     res.redirect("/work");
   }
   else{
     items.push(item);
     res.redirect("/");
  }

});

 //---------------get and post for work list-------------------
 app.get("/work",function(req,res){
   res.render("list" ,{
     listTitle : "Work",
     newListItem : workItems

   });

 });
 app.post("/work",function(req,res){
    let item=req.body.newItem;
    items.push(item);
    res.redirect("/");

 });




app.listen(3000, function() {
  console.log("server started at port 3000");
})
