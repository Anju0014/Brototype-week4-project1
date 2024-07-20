const express = require('express');   
const app = express();
const hbs = require('hbs');
const nocache=require('nocache')
const port = 3000;
const path = require('path');
const session=require('express-session');

const email="anjumpkr4115@gmail.com"
const password="anjuanju"

app.use(express.static('public'));
app.set('view engine', 'hbs'); 
app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use(nocache());

app.use(session({
    secret:'dream',
    resave:false,
    saveUnintialized:true,
}))


app.get('/', (req, res) => {
   
    if(req.session.user){
        res.render('home')
    }else{
        if(req.session.passwordwrong){
            res.render('login',{msg:'Incorrect Email or Password'});
            req.session.passwordwrong=false;

        }else{
            res.render('login')}
        }
});

app.post('/verify',(req,res)=>{
    
    if(req.body.email === email && req.body.password === password)
    {
        console.log("right");
        req.session.user=req.body.email;
        res.redirect('/home');
    }
    else{
        req.session.passwordwrong=true;
        res.redirect('/');
    }
     
});

app.get('/home',(req,res)=>{

    if(req.session.user){
        res.render('home');
       
    }else{
        
        if(req.session.passwordwrong){
            req.session.passwordwrong=false;
             res.render('login',{msg:'Incorrect Email or Password'});
        }else
        {
            res.render('home')
        }
    }
})
app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.render('login',{msg:'Loggedout'})
});

app.listen(port, () => {
    console.log(`server running on ${port}`);
});
