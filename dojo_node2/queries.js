var promise = require ('bluebird');
var options = {
	promiseLib : promise
};

var pgp = require('pg-promise')(options);
var connectionString='postgres://niqwjeci:aqj8hgD6M-0X2ZaoXEwNSr2rADD_oWgD@elmer.db.elephantsql.com:5432/niqwjeci'
var db = pgp(connectionString);
function getAllRestaurant (req,res,next) {
	db.any('select * from restaurant')
	.then(function(data){
	res.status(200)
	.json({
		status:'exitoso',
		data: data,
		massage:'Recuperados todos los restaurantes'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function getRestaurantByName (req,res,next){
	var name = req.params.name;
	db.any('select * from  restaurant where name=$1', name)
	.then(function(data){
		res.status(200)
		.json({
			status:'exitoso',
			data: data,
			massage:'Recuperados restaurantes por nombre'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function createRestaurant (req,res,next){
	db.none('insert into restaurant(name,city,address,phone) ' + 'values($1,$2,$3,$4)',
		[req.body.name, req.body.city, req.body.address, parseInt(req.body.phone)])
	.then(function(){
		res.status(200)
		.json({
			status:'exitoso',
			massage:'creado restaurante'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function removeRestaurantByName (req,res,next){
	var restaurantID = parseInt(req.params.id);
	db.result('delete from restaurant where id=$1', restaurantID)
	.then(function(data){
		res.status(200)
		.json({
			status:'exitoso',
			data: data,
			massage:'eliminado restaurantes por id'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function updateRestaurant (req,res,next){
	db.none('update restaurant set name=$1, city=$2, address=$3, phone=$4 where id=$5',
		[req.body.name, req.body.city, req.body.address, parseInt(req.body.phone), parseInt(req.params.id)])
	.then(function(){
		res.status(200)
		.json({
			status:'exitoso',
			massage:'actualizado'
		});
	})
	.catch(function(err){
		return next(err);
	})
};

module.exports={
	getAllRestaurant:getAllRestaurant,
	getRestaurantByName:getRestaurantByName,
	createRestaurant:createRestaurant,
	removeRestaurantByName:removeRestaurantByName,
	updateRestaurant:updateRestaurant
}