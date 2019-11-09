export const unixToText = (unixTime)=>{
    const date = new Date(unixTime*1000);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}