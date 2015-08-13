/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');

/**
 * Configuration Start
 */
Accel.config.rate   = 10;
Accel.config.sample = 1;
var THRESHOLD       = 500;
/**
 * Configuration end
 */
var main = new UI.Card({
  title: 'Jump Rope Counter',
  body:  'PUSH BUTTON =>'
});
main.show();

main.on('click', 'select', function() {
 
  Accel.init();
  var in_the_air = false;
  var count      = 0;
  var position_x = 0;
  Accel.peek(function(e) {
    position_x = e.accel.x;
  });
  Accel.on('data', function(e) {
    var diff_x = position_x - e.accel.x;
    if(THRESHOLD < diff_x && !in_the_air){
      in_the_air = true;
    }
    if((0 - THRESHOLD) > diff_x && in_the_air){
      count ++;
      in_the_air = false;
      textfield.text(count);
    }
    position_x = e.accel.x;
    console.log('X='+ diff_x +'    in_the_air='+in_the_air);
  });
/**
 *  Counter UI start
 */
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'bitham-42-bold',
    text: count,
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
/**
 *  Counter UI end
 */
});