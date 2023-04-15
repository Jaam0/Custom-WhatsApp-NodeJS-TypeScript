import path from 'path';
import playSound from 'play-sound';

const Sound = async (soundName: string) => {
  const audioPath = path.join(__dirname, '../', `media/${soundName}`);
  await playSound().play(audioPath, (err) => {
    if (err) throw err;
  });
};

export { Sound };
