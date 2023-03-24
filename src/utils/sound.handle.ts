import path from 'path';
import playSound from 'play-sound';

const Sound = async () => {
  const audioPath = path.join(__dirname, '../', 'media/test.wav');

  await playSound().play(audioPath, (err) => {
    if (err) throw err;
  });
};

export { Sound };
