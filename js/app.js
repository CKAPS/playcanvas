//Problem: No user interaction caused no chanage to the application
//Solution: When user interacts cause change appropriately


var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//When clicking on control list items
$(".controls").on("click","li",function(){
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked elements
  $(this).addClass("selected");
  //cache current color
  color = $(this).css("background-color");
  
});

//When new color is pressed 
$("#revealColorSelect").click(function(){
   //Show color select or hide color select
   changeColor();
   $("#colorSelect").toggle();
});
 

//Update the new color span
function changeColor(){
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}
  
//When the color sliders change
$("input[type=range]").change(changeColor);                     

//When add color is pressed 
$("#addNewColor").click(function(){
    //Append the color to the controls ul
    var $newColor = $("<li></li>");
    $newColor.css("background-color",$("#newColor").css("background-color"));
    $(".controls ul").append($newColor);
    //Select the new color
    $newColor.click();
});

$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  if(mouseDown){
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});



//On mouse events on the canvas 
  //Draw lines