$(document).ready(function() {
  window.fireworks = [];
  window.colors = ["red", "yellow", "orange", "SpringGreen", "Snow", "Aqua", "Aquamarine"];
  $("body").click(function(event) {
    ready(event.pageX, event.pageY);
  });
});


var ready = function(posX, posY) {
  var number = window.fireworks.length.toString();
  var size = (Math.floor(Math.random() * 5) + 6) * 10;
  var center = size / 2;
  var pieces = [10, 12, 15, 20][Math.floor(Math.random() * 4)];
  var rand = Math.floor(Math.random() * 4);
  
  var shoot = function() {
    var firework = $("<div class='firework " + number + "'></div>").hide().fadeIn(50,
      function() {
        // firework.effect("explode", {pieces: 36}, 300, remove);
        if (rand == 3) {
          swirl(firework, posX, posY, size, 40, remove);
        }
        else if (rand == 2) {
          shell(firework, posX, posY, size, pieces, remove);
        }
        else if (rand == 1) {
          halo(firework, posX, posY, size, pieces, remove);
        }
        else {
          dblhalo(firework, posX, posY, size, pieces, remove);
        }
      });
    firework.css({
      "position":"absolute",
      "height": size.toString(),
      "width": size.toString(),
      "left":(posX - center).toString(),
      "top":(posY - center).toString(),
      "background":window.colors[Math.floor(Math.random() * window.colors.length)]
    });
    $("body").append(firework);
    window.fireworks.push(firework);
    
    var remove = function() {
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


// Define custom effects and helper functions

var convdegr = function(deg) {
  return (deg / 180) * Math.PI;
};

var convrdeg = function(rad) {
  return (rad / Math.PI) * 180;
};

var halo = function(parent, posX, posY, size, pieces, callback) {
  var variance = [];
  var particles = [];
  var theta = 0;
  var partSize = Math.floor(size / (pieces / 2));
  var center = partSize / 2;
  var color = parent.css("backgroundColor");
  var del = (Math.floor(Math.random() * 4) + 6) * 100;
  
  for(i = 0; i < pieces; i ++) {
    rad = convdegr(theta);
    x = Math.floor(Math.cos(rad) * size);
    y = Math.floor(Math.sin(rad) * size);
    variance.push([posX + x, posY + y]);
    fragment = $("<div class='fragment'></div>").hide();
    fragment.css({
      "position":"absolute",
      "left":(posX - center).toString(),
      "top":(posY - center).toString(),
      "height":partSize.toString(),
      "width":partSize.toString(),
      "background":color,
      "border-radius":"50%"
    });
    $("body").append(fragment);
    particles.push(fragment);
    theta += (360 / pieces);
  }
  
  particles.forEach(function(particle, idx) {
    particle.show();
    particle.animate({
      "left":variance[idx][0].toString(),
      "top":variance[idx][1].toString(),
      "height":"2px",
      "width":"2px",
      "opacity":"0"
    }, del, function(){ particle.remove() });
  });
  
  callback();
};

var dblhalo = function(parent, posX, posY, size, pieces, callback) {
  var variance = [];
  var particles = [];
  var theta = 0;
  var partSize = Math.floor(size / (pieces / 2));
  var center = partSize / 2;
  var color = parent.css("backgroundColor");
  var altcolor = window.colors[Math.floor(Math.random() * window.colors.length)];
  var del = (Math.floor(Math.random() * 4) + 6) * 100;
  
  for(i = 0; i < pieces; i ++) {
    rad = convdegr(theta);
    x = Math.floor(Math.cos(rad) * size);
    y = Math.floor(Math.sin(rad) * size);
    variance.push([posX + x, posY + y]);
    variance.push([posX + (x / 2), posY + (y / 2)]);
    fragment = $("<div class='fragment'></div>").hide();
    fragment.css({
      "position":"absolute",
      "left":(posX - center).toString(),
      "top":(posY - center).toString(),
      "height":partSize.toString(),
      "width":partSize.toString(),
      "background":color,
      "border-radius":"50%"
    });
    sfragment = $("<div class='sfragment'></div>").hide();
    sfragment.css({
      "position":"absolute",
      "left":(posX - center).toString(),
      "top":(posY - center).toString(),
      "height":partSize.toString(),
      "width":partSize.toString(),
      "background":altcolor,
      "border-radius":"50%"
    });
    $("body").append(fragment);
    $("body").append(sfragment);
    particles.push(fragment);
    particles.push(sfragment);
    theta += (360 / pieces);
  }
  
  particles.forEach(function(particle, idx) {
    particle.show();
    particle.animate({
      "left":variance[idx][0].toString(),
      "top":variance[idx][1].toString(),
      "height":"2px",
      "width":"2px",
      "opacity":"0"
    }, del, function(){ particle.remove() });
  });
  
  callback();
};

var swirl = function(parent, posX, posY, size, pieces, callback) {
  var variance = [];
  var particles = [];
  var theta = 0;
  var partSize = Math.floor(size / (pieces / 2));
  var center = partSize / 2;
  var color = parent.css("backgroundColor");
  var del = 0;
  
  for(i = 0; i < pieces; i ++) {
    rad = convdegr(theta);
    x = Math.floor(Math.cos(rad) * size);
    y = Math.floor(Math.sin(rad) * size);
    variance.push([posX + x, posY + y]);
    fragment = $("<div class='fragment'></div>").hide();
    fragment.css({
      "position":"absolute",
      "left":(posX - center).toString(),
      "top":(posY - center).toString(),
      "height":partSize.toString(),
      "width":partSize.toString(),
      "background":color,
      "border-radius":"50%"
    });
    $("body").append(fragment);
    particles.push(fragment);
    theta += (720 / pieces);
  }
  
  particles.forEach(function(particle, idx) {
    del += 50;
    particle.show();
    particle.animate({
      "left":variance[idx][0].toString(),
      "top":variance[idx][1].toString(),
      "height":"2px",
      "width":"2px",
      "opacity":"0"
    }, del, function(){ particle.remove() });
  });
  
  callback();
};

var shell = function(parent, posX, posY, size, pieces, callback) {
  var variance = [];
  var particles = [];
  var theta = 0;
  var partSize = Math.floor(size / (pieces / 2));
  var center = partSize / 2;
  var color = parent.css("backgroundColor");
  var del = (Math.floor(Math.random() * 4) + 6) * 100;
  
  for(i = 0; i < pieces; i ++) {
    factor = (i + 1) / pieces;
    rad = convdegr(theta);
    x = Math.floor(Math.cos(rad) * size);
    y = Math.floor(Math.sin(rad) * size);
    variance.push([posX + (x * factor), posY + (y * factor)]);
    fragment = $("<div class='fragment'></div>").hide();
    fragment.css({
      "position":"absolute",
      "left":(posX - center).toString(),
      "top":(posY - center).toString(),
      "height":partSize.toString(),
      "width":partSize.toString(),
      "background":color,
      "border-radius":"50%"
    });
    $("body").append(fragment);
    particles.push(fragment);
    theta += (720 / pieces);
  }
  
  particles.forEach(function(particle, idx) {
    particle.show();
    particle.animate({
      "left":variance[idx][0].toString(),
      "top":variance[idx][1].toString(),
      "height":"2px",
      "width":"2px",
      "opacity":"0"
    }, del, function(){ particle.remove() });
  });
  
  callback();
};