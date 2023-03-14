import path from 'path';
import playSound from 'play-sound';

const audioPath = path.join(__dirname,'../','media/test.wav');


playSound().play(audioPath,(err)=> {
    if (err) throw err;
})

