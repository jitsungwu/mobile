import React, {useState, useEffect} from 'react';
export default function Click() {
 //let count = 0; 
 const [count, setCount] = useState(["value:"]);
 //const countString = count.toString();
 console.log("here");

 const handleClick = function() {
 let temp = count;
  console.log("count");
  console.log(count);
  temp.push(Math.floor(Math.random() * 11));
  console.log("temp");
  console.log(temp);
  setCount(count.concat(Math.floor(Math.random() * 11)));
  
 }

 const showCount = function(){
    console.log(count);
  }

 useEffect(showCount);

 return (
  <button onClick={handleClick}>{count.toString()}</button>
     
 );
}