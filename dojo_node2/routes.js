var express= require("express");
var router =  express.Router();
var db=require("./queries");
router.get('/api/restaurants', db.getAllRestaurant);
router.get('/api/restaurants/:name', db.getRestaurantByName);
router.post('/api/restaurants', db.createRestaurant);
router.delete('/api/restaurants/:id', db.removeRestaurantByName);
router.put('/api/restaurants/:id', db.updateRestaurant);


//router.get('/api/menu', db.getAllmenu),
//router.get('/api/menu/:name', db.getmenuByName)
//router.post('/api/menu', db.createmenu)
//router.delete('/api/menu/:id', db.removemenuByName)
//router.put('/api/menu/:id', db.updatemenu)
module.exports=router;