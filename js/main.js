$(function(){
  $("#carousel").carousel({ interval: 3000 });
  $("#headerCarousel").carousel({ interval: 3000 });
      })
/////////////ChefsPage
$(".col-md-3").on("mouseenter",function(){
  $(this).children(".imgDiv").css("opacity","0.6");
  $(this).children(".imgDiv").children("a").css("opacity","1");
})
$(".col-md-3").on("mouseleave",function(){
  $(this).children(".imgDiv").css("opacity","0");
  
})