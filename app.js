const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Welcome to this website, Here you can create the blog and see it.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sameer:Test123@cluster0.nyc0xwm.mongodb.net/blogDB",{useNewUrlParser : true});

const postSchema = {
    title : String,
    content : String
};
const Post = mongoose.model("Post",postSchema);


app.get("/posts/:postId", function (req, res) {

  const requiredPostId = (req.params.postId);
  Post.findOne({_id:requiredPostId},function(err,post){
    res.render("post", {title : post.title,content : post.content});
  });

})

app.get("/", function (req, res) {

  Post.find({},function(err,posts){
    res.render("home",{ startingContent: homeStartingContent, posts : posts })
  })
  
})

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
})

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
})

app.get("/compose", function (req, res) {
  res.render("compose");
})

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
     if (!err){
         res.redirect("/");
      }
   });

})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
  console.log("Server has started successfully.");
});
