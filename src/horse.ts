// 競走馬の性別の型エイリアス宣言
// 本当は競走馬の性別は年齢によっても変わるが、今回は簡略化のためにこのようにしている
// geldingは去勢された馬のこと
// 異なる型を持つ変数を定義するためにunion型を使っている
// また、型は固有の文字列を持つため、文字列リテラル型を使っている
type Sex = "male" | "female" | "gelding"

// 競走馬のクラス
class Horse {
    // 名前
    name: string;
    // 生年月日
    // 年齢は変わらないため、readonlyをつけている
    readonly birth: Date;
    // 性別
    // 性別を変更する際にはchangeSexToGeldingメソッドを使うため、ここではreadonlyをつけていない
    readonly sex: Sex;

    constructor(
        name: string,
        birth: Date,
        sex: Sex,
    ) {
        this.name = name;
        this.birth = birth;
        this.sex = sex;
    }

    // 性別を去勢された馬に変更する
    changeSexToGelding(horse: Horse): Horse {
        // 性別がmale以外の場合はエラーを投げる
        if (horse.sex !== "male") {
            throw new Error("性別が適切ではありません");
        }
        // 不用意に性別を変更されることを防ぐため、新しいインスタンスを生成して返す
        return new Horse(horse.name, horse.birth, "gelding");
    }

    // 年齢を取得する
    // 1月1日に年齢が1つ上がる計算のため、年数だけを取得して計算する
    getAge(): number {
        // 現在の日付を取得
        // テストを書くためには本当はここに変化する日付を外から注入するようにした方が良い
        // jestの場合はjest.fn()を使ってモックを作成することができるのでOK
        const now = new Date();
        // 誕生日から現在の日付を引いて、年齢を求める
        return now.getFullYear() - this.birth.getFullYear();
    }

}

const horse: Horse = new Horse("ディープインパクト", new Date("2002-03-25"), "male");
// 年齢を取得する
console.log(horse.getAge());
// 名前を取得する
console.log(horse.name);
// 性別を取得する
console.log(horse.sex);