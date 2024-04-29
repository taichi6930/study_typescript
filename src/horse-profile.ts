// loggedメソッドのimport
import { logged } from "./logged";

// 競走馬の性別の型エイリアス宣言
// 本当は競走馬の性別は年齢によっても変わるが、今回は簡略化のためにこのようにしている
// geldingは去勢された馬のこと
// 異なる型を持つ変数を定義するためにunion型を使っている
// また、型は固有の文字列を持つため、文字列リテラル型を使っている
type Sex = "male" | "female" | "gelding"

// 競走馬のプロフィールを表すクラス
export class HorseProfile {
    // ここでプロパティの定義と同時に初期化している
    constructor(
        // 名前
        public name: string,
        // 生年月日
        // 年齢は変わらないため、readonlyをつけている
        // ここでプロパティの定義と同時に初期化している
        readonly birth: Date,
        // 性別
        // 性別を変更する際にはchangeSexToGeldingメソッドを使うため、ここではreadonlyをつけていない
        readonly sex: Sex,
    ) { }

    // 性別を去勢された馬に変更する
    @logged
    changeSexToGelding(horseProfile: HorseProfile): HorseProfile {
        // 性別がmale以外の場合はエラーを投げる
        if (horseProfile.sex !== "male") {
            throw new Error("性別が適切ではありません");
        }
        // 不用意に性別を変更されることを防ぐため、新しいインスタンスを生成して返す
        return new HorseProfile(horseProfile.name, horseProfile.birth, "gelding");
    }

    // 年齢を取得する
    // 1月1日に年齢が1つ上がる計算のため、年数だけを取得して計算する
    @logged
    getAge(): number {
        // 現在の日付を取得
        // テストを書くためには本当はここに変化する日付を外から注入するようにした方が良い
        // jestの場合はjest.fn()を使ってモックを作成することができるのでOK
        const now = new Date();
        // 誕生日から現在の日付を引いて、年齢を求める
        return now.getFullYear() - this.birth.getFullYear();
    }

    // 性別を日本語に変換して返す
    getSexToJapanese(): string {
        switch (this.sex) {
            case "male": return "牡";
            case "female": return "牝";
            case "gelding": return "騸";
            // 当てはまらない場合はエラーを投げる
            // never型は実行されないことを示す型
            default:
                const exhaustiveCheck: never = this.sex;
                throw new Error(`未知の性別です: ${exhaustiveCheck}`);
        }
    }

    // 馬の情報を取得する
    @logged
    getInfo(): string {
        return `馬名: ${this.name}, 性別: ${this.sex}, 生年月日: ${this.birth.toLocaleDateString()}`;
    }
}
