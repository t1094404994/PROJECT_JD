/**
 * 数学工具类
 */
class MathUtil{
    constructor(){}
    /**
     * 按位或
     * @param numbers 
     */
    public static Bitwise_Or(...numbers):number{
        let len:number=numbers.length;
        let num:number=numbers[0];
        for(let i=1;i<len;i++){
            num=num|numbers[i];
        }
        return num;
    } 
}