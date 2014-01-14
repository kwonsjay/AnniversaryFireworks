$(document).ready(function() {
  window.fireworks = [];
  window.colors = ["red", "yellow", "orange", "SpringGreen", "Snow", "Aqua", "Aquamarine"];
  $("body").click(function(event) {
    ready(event.pageX, event.pageY);
  });
});


var ready = function(posX, posY) {
  var number = window.fireworks.length.toString();
  var size = (Math.floor(Math.random() * 6) + 4) * 10;
  
  var shoot = function() {
    var firework = $("<div class='firework " + number + "'></div>").hide().fadeIn(50,
      function() {
        firework.effect("explode", {pieces: 36}, 300, explode);
      });
    firework.css({
      "position":"absolute",
      "height": size.toString(),
      "width": size.toString(),
      "left":(posX - (size / 2)).toString(),
      "top":(posY - (size / 2)).toString(),
      "background":window.colors[Math.floor(Math.random() * window.colors.length)]
    });
    $("body").append(firework);
    window.fireworks.push(firework);
    
    var explode = function() {
      var firework = window.fireworks.shift();
      firework.remove();
    }
  };
  
  var streak = $("<div class='streak " + number + "'></div>").hide().fadeIn(300,
    function() {
      streak.animate({
        "height":(window.innerHeight - posY).toString(),
        "backgroundColor":"red",
        "opacity":"0"
      }, 800, function() {
        streak.remove();
        shoot();
      });
    });
    streak.css({
      "left":(posX - 2).toString()
    });
  $("body").append(streak);
};