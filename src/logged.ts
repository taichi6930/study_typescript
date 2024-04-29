// ログを出力するデコレータ
// シングルトンにした
export function logged(originalMethod: any, context: any) {
    let instance: any;

    function loggedMethod(this: any, ...args: any[]) {
        console.log(`${context.name}メソッドの呼び出し開始`);
        const result = originalMethod.call(this, ...args);
        console.log(`${context.name}メソッドの呼び出し終了`);
        return result;
    }

    return function (this: any, ...args: any[]) {
        if (!instance) {
            instance = loggedMethod.bind(this, ...args);
        }
        return instance();
    };
}