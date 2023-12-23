export default function Day({ dateset }:any) {
 const isInvalidDate = (temp: Date) => Number.isNaN(temp.getTime());
 const date = new Date(dateset);
 if(!isInvalidDate(date)){
    const value = date.toLocaleDateString();
    return value;
 }else{
    return '　'
 }
}