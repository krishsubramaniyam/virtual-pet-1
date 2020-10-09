var dogimg1, dogimg2,milkimg;
var database;
var foodS, foodStock;
var dog;
var canvas;
var food;

function preload()
{
dogimg1 = loadImage("images/dogImg.png");
dogimg2 = loadImage("images/dogImg1.png");
milkimg = loadImage("images/Milk.png");

}

function setup() {
database = firebase.database();

canvas = createCanvas(500, 500);

food = new Food()

dog = createSprite(250,250);
dog.addImage(dogimg1);
dog.scale = 0.2;

foodStock=database.ref('food');
foodStock.on("value",readStock);

feed = createButton("Feed the dog");
feed.position(700,95);
feed.mousepreesed(feedDog);

addFood=createButton("Add food")
addFood.position(800,95);
addFood.mousePressed(addFoods);
}
function draw() {  

  background("green");

  fedTime = databaese.ref('FeedTime');
  fedTime.on("value",function(data){
      lastFed = data.val();
  })

  Fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
     text("Last Feed :" + lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
      text("Last Feed : 12 AM",350,30)
  }else{
   text("Last feed :"+lastFed + "AM",350,30)
  }

  drawSprites();

  textSize(20);
  text("PRESS UP ARROW TO PLEASE FEED ME",80,50)
  text("REMANING FOOD STOCK:"+foodS,100,75);
}

function readStock(data){
foodS = data.val();
food.updateFoodStock(foodS);
}

function feedDog(){
dog.addImage(dogimg2);
food.deductFoodStock();
database.ref('/').update({
  food:food.getFoodStock(),
  feedTime:hour()
   })
}

function addFoods(){
foodS++;
database.ref('/').update({
food:foodS
 })
}

