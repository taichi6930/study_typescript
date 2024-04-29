// HorseProfileクラスをインポートする
import { HorseProfile } from "./horse-profile";

// 実行時はts-node src/horseProfile.tsで実行する
// TypeScriptからJavaScriptに変換することをトランスパイルという
// TS->JSに変換するのはTypeScriptでは「コンパイル」と呼んでいるらしい
// ちなみにTS->JSにするためのコマンドはtsc src/horseProfile.tsで実行する
const horseProfile: HorseProfile = new HorseProfile("ディープインパクト", new Date("2002-03-25"), "male");
// 年齢を取得する
console.log(horseProfile.getAge());
// 名前を取得する
console.log(horseProfile.name);
// 性別を取得する
console.log(horseProfile.sex);
// 情報を取得する
console.log(horseProfile.getInfo());

// // 競走馬の詳細情報を作成する
// const horseDetail: HorseDetail = new HorseDetail("ディープインパクト");
// // レース戦績を取得する
// console.log(horseDetail.raceResults);