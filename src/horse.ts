// 競走馬の性別の型エイリアス宣言
// 本当は競走馬の性別は年齢によっても変わるが、今回は簡略化のためにこのようにしている
// geldingは去勢された馬のこと
// 異なる型を持つ変数を定義するためにunion型を使っている
// また、型は固有の文字列を持つため、文字列リテラル型を使っている
type Sex = "male" | "female" | "gelding"

// 馬場
// 芝・ダート・障害・AWに対応させている
type groundType = "turf" | "dirt" | "hurdle" | "AW";

// ログを出力するデコレータ
function logged(originalMethod: any, context: any) {
    return function loggedMethod(this: any, ...args: any[]) {
        console.log(`${context.name}メソッドの呼び出し開始`);
        const result = originalMethod.call(this, ...args);
        console.log(`${context.name}メソッドの呼び出し終了`);
        return result;
    }
}

interface Race {
    // レース名
    readonly name: string;
    // 日付
    readonly date: Date;
    // 場所
    readonly place: string;
    // 距離
    readonly distance: number;
    // 馬場
    readonly ground: groundType;
    // 着順
    readonly rank: number;
    // 馬体重
    readonly weight: number;
    // 騎手
    readonly jockey: string;
    // 騎手斤量
    readonly jockeyWeight: number;

}

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
    // レース戦績
    // レース戦績は配列で持つ
    // 配列の要素はRace型である
    raceResults?: Race[];

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
    @logged
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
    @logged
    getAge(): number {
        // 現在の日付を取得
        // テストを書くためには本当はここに変化する日付を外から注入するようにした方が良い
        // jestの場合はjest.fn()を使ってモックを作成することができるのでOK
        const now = new Date();
        // 誕生日から現在の日付を引いて、年齢を求める
        return now.getFullYear() - this.birth.getFullYear();
    }

    // 馬の情報を取得する
    @logged
    getInfo(): string {
        return `馬名: ${this.name}, 性別: ${this.sex}, 生年月日: ${this.birth.toLocaleDateString()}`;
    }
}

const horse: Horse = new Horse("ディープインパクト", new Date("2002-03-25"), "male");
// 年齢を取得する
console.log(horse.getAge());
// 名前を取得する
console.log(horse.name);
// 性別を取得する
console.log(horse.sex);
// 情報を取得する
console.log(horse.getInfo());