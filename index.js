const express = require('express');
const app = express();
const path = require('path');
const {v4: uuid} = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine' , 'ejs');

let comments = [
    {
        id: uuid(),
        username : 'Todd',
        comment : 'Looool that is so funnny'
    },
    {
        id: uuid(),
        username : 'Herkules',
        comment : 'WOOOOOOOOOOFFFFFFFFF WOOOOOOOOOOFFFFF!!!!!'
    },
    {
        id: uuid(),
        username : 'Chleb',
        comment : 'Hello I am a chleb and I am very tasty'
    },
    {
        id: uuid(),
        username : 'Rat',
        comment : 'Rat revolution is coming!!!!!!!'
    },
];


app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments});
});

app.get('/comments/new' , (req,res) =>{
    res.render('comments/new');
})

app.post('/comments',(req,res)=>{
    const {username , comment} = req.body
    comments.push({username,comment , id: uuid()});
    res.redirect('/comments');
})

app.get('/comments/:id',(req,res)=>{
    const {id} = req.params;

    const comment = comments.find(c => c.id === id);
    res.render('comments/show',{comment});
});

app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit',{comment});
})



app.patch('/comments/:id' , (req,res)=>{
    const {id} = req.params;
    const newCommnetText = req.body.comment;
    const foundCommnet = comments.find(c => c.id === id);
    foundCommnet.comment = newCommnetText;
    res.redirect('/comments');
})

app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');

});

app.get('/tacos',(req,res)=>{
    res.send("Get /tacos repond");
});

app.post('/tacos',(req,res)=>{
    const {meat,qty} = req.body;
    res.send (`Hello here is your ${qty} ${meat} tacos`);
});

app.listen(3000,()=>{
    console.log("Listening on port 3000");
});