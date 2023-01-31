import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
// const throttle = require('lodash.throttle');

player.on(
  'timeupdate',
  throttle(function (e) {
    // console.log(e.seconds);
    localStorage.setItem('videoplayer-current-time', JSON.stringify(e.seconds));
  }, 1000)
);

const savedTime = localStorage.getItem('videoplayer-current-time');
const parsedSavedTime = JSON.parse(savedTime);
console.log(parsedSavedTime);
player
  .setCurrentTime(parsedSavedTime)
  .then(function (seconds) {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(0));
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
