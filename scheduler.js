var mathJson = require('./math.json');
var physicsJson = require('./physics');

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function scheduler(classes) {
  function meetsRequirements(cls) {
    var flag = true;
    if (cls.prerequisites.length === 0) {
      return true;
    } else {
      cls.prerequisites.forEach(function(c) {
        if (schedule.indexOf(c) === -1) {
          flag = false;
        }
      })
    }
    return flag;
  }

  var schedule = [];
  var clssNoPreReq = random(classes.filter(function(c) { return c.prerequisites.length === 0 }));     //O(n)
  schedule.push(clssNoPreReq.name);
  classes = classes.filter(function(c) { return c.name !== clssNoPreReq.name }); //O(n)
  while(classes.length !== 0) {
    var c = random(classes);
    if (meetsRequirements(c)) { //O(n)
      schedule.push(c.name);
      classes.splice(classes.findIndex(function(x) { return x.name === c.name}), 1);
    }
  }
  console.log("schedule", schedule);
}

scheduler(mathJson);
scheduler(physicsJson);