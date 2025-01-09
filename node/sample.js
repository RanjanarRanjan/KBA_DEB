const lodash=require('lodash')
const add1=require("./add")

console.log("hello world");
let a="Node Js";
console.log("hello",`${a}`);
console.log("hello",a);
if(a==='Node Js')
{
    console.log("js running on node js environment")
}

for(i=0;i<5;i++)
{
    b=i+1;
    console.log(b);
}


x=[1,2,3,4,5]
console.log(lodash.reverse(x))
console.log(lodash.capitalize('hello world'))
console.log(add1.add(3,5))