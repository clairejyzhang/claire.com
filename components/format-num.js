export default function Num({ int }) {
  if(int < 10){
    return '00' + int.toString();
  }
  else return '0' + int.toString();
}