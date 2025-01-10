const tasks =[];
const args=process.argv.slice(2);
const firstline =args[0]
const second= args[3];
 
if (firstline=== 'add'){
    if (second){
        tasks.push(second);
        console.log(`TSecondadded :${second}`);
        console.log(tasks)
    }else{
        console.log('Please specify a task to add.');
        
    }

}else{
    console.log("Invalid Command");
    
}