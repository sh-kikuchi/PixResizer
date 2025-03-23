import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import sharp from 'sharp';
import prompts from './prompts/index.js';
import imageFormats from './config.js';

/**
 * 画像変換プロセスを実行する関数
 * - ユーザー入力を取得
 * - 指定フォルダ内の画像を処理
 * - 画像を指定サイズにリサイズし、選択した拡張子で保存
 */
export async function runPrompts() {
  // 定数定義
  const FIT_TYPE = 'fill'; // リサイズ時のフィット方法
  const IN_DIR  = 'src/data/input/';  // 変換前の画像フォルダ
  const OUT_DIR = 'src/data/output/'; // 変換後の画像フォルダ

  // プロンプト起動（ユーザー入力を取得）
  const answers = await inquirer.prompt(prompts);

  // 入力値を数値に変換
  const width  = parseInt(answers.width, 10);
  const height = parseInt(answers.height, 10);
  const selectedFormat = answers.extension; // ユーザーが選択した拡張子

  // 数値チェック（正の整数であることを確認）
  if (isNaN(width) || width <= 0) {
    console.error("エラー: 幅は正の整数で入力してください。");
    return;
  }
  if (isNaN(height) || height <= 0) {
    console.error("エラー: 高さは正の整数で入力してください。");
    return;
  }

  // 入力フォルダ内のファイル一覧を取得
  const filelist = fs.readdirSync(IN_DIR);
  
  // フォルダ内のファイルを一つずつ処理
  filelist.forEach((filename) => {
    const filepath = path.join(IN_DIR, filename);
    
    // ファイルかどうか確認（ディレクトリを除外）
    if (fs.statSync(filepath).isFile()) {
      // 拡張子のチェック（ドットを除去して照合）
      if (imageFormats.includes(path.extname(filepath).replace('.', ''))) {
        
        // 出力ファイル名（拡張子を選択したものに変更）
        const outputFilename = path.basename(filename, path.extname(filename)) + '.' + selectedFormat;
        const outputFilePath = path.join(OUT_DIR, outputFilename);

        // Sharp を使用して画像をリサイズ & 変換
        sharp(filepath)
          .withMetadata() // メタデータ保持
          .resize({
            width: width,
            height: height,
            fit: FIT_TYPE
          })
          .toFormat(selectedFormat) // 選択した拡張子に変換
          .toFile(outputFilePath, (err, info) => {
            if (err) {
              console.error(`エラー: ${filename} の変換に失敗しました`, err);
              return;
            }
            console.log(`変換完了: ${filename} → ${outputFilename}`);
          });    
      } else {
        console.log(`スキップ: ${filename}（対応していない拡張子）`);
      }
    }
  });
}
