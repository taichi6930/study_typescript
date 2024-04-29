// 馬場
// 芝・ダート・障害・AWに対応させている
type GroundType = "turf" | "dirt" | "hurdle" | "AW";

// 馬場状態
type GroundCondition = "良" | "稍重" | "重" | "不良";

// 迷ったらreadonlyかprivateにした方がいい気がする
// interfaceはextendで拡張することができる
interface RaceCondition {
    // レース名
    readonly name: string;
    // 日付
    readonly date: Date;
    // 場所
    readonly place: string;
    // 距離
    readonly distance: number;
    // 馬場条件
    // 本当は別で管理しておくほうがいいが、Tuple型を使いたかったのでこうしている
    // 馬場の種類と状態を持つ
    readonly ground: [groundType: GroundType, groundCondition: GroundCondition];

}

interface RaceinfoForHorse {
    // 着順
    readonly rank: number;
    // 馬体重
    readonly weight: number;
}

// 複数回定義できる、型エイリアスではできない
interface RaceinfoForHorse {
    // 騎手
    readonly jockey: string;
    // 騎手斤量
    readonly jockeyWeightKg: number;
}

// 複数のinterfaceを継承することもできる
interface Race extends RaceCondition, RaceinfoForHorse { }

// レースクラス
class RaceImpl implements Race {
    constructor(
        readonly name: string,
        readonly date: Date,
        readonly place: string,
        readonly distance: number,
        readonly ground: [GroundType, GroundCondition],
        readonly rank: number,
        readonly weight: number,
        readonly jockey: string,
        readonly jockeyWeightKg: number
    ) {
        // 一旦値は入れてからここでvalidateかければいい？
        // 距離のバリデーション
        this.validateDistance(distance);
    }

    // 距離のバリデーション
    protected validateDistance(distance: number): void {
        // 0m以下の距離は存在しない
        if (distance <= 0) {
            throw new Error("距離が0m以下です");
        }
        // 10000m以上の距離は存在しないと思われている、もちろん例外もあるが一旦ここはErrorとしておく
        if (distance >= 10000) {
            throw new Error("距離が10000m以上です");
        }
    }
}

// レースクラス
class NarRaceImpl extends RaceImpl {
    constructor(
        name: string,
        date: Date,
        place: string,
        distance: number,
        ground: [GroundType, GroundCondition],
        rank: number,
        weight: number,
        jockey: string,
        jockeyWeightKg: number,
    ) {
        super(name, date, place, distance, ground, rank, weight, jockey, jockeyWeightKg);
        this.validateDistance(distance);
    }

    protected validateDistance(distance: number): void {
        // 0m以下の距離は存在しない
        if (distance <= 0) {
            throw new Error("距離が0m以下です");
        }
        // 4000m以上の距離は存在しないと思われている、もちろん例外もあるが一旦ここはErrorとしておく
        if (distance >= 4000) {
            throw new Error("距離が4000m以上です");
        }
    }
}

// 競走馬の詳細情報を表すクラス
class HorseDetail {
    // 名前
    readonly name: string;
    // レース戦績
    // レース戦績は配列で持つ（Array型）
    // 配列の要素はRace型である
    // 空の場合もあるため、null許容型を使っている
    readonly raceResults?: Race[];

    constructor(
        name: string,
        raceResults?: Race[],
    ) {
        this.name = name;
        this.raceResults = raceResults;
    }
}
