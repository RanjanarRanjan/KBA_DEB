const readline=require('readline');

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
 const task_array=[]

 function showMenu(){
    console.log(`Task Manager
        1.Add Task
        2.view List
        3.exit`)

 rl.question("Select option 1,2,or 3 :",(handleOption));
    }
 function handleOption(option){
    switch(option.trim())
    {
    case '1':
        rl.question("enter the task",(task)=>
        {
            if(task.trim()!='')
            {
                task_array.push(task);
                console.log(`task added ${task}`)
            }
            else
            {
                console.log("enter valid task ")
            }
            showMenu()
        })
        break;
    case '2':
            const list=task_array.length?task_array.join():'no task'
            console.log('task :',list);
            showMenu();
        break;
    case '3':
            console.log("Exit")
            rl.close()
            break;
    default :
        console.log("invalid option");
        showMenu()
    }
 }
 showMenu()