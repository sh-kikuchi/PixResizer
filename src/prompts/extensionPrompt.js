import imageFormats  from '../config.js';

export default {
  type: 'list',
  name: 'extension',
  message: '変換したい画像形式は',
  choices: imageFormats,
};
