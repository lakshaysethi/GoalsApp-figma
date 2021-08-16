if (localStorage.getItem("auth")){
    user_auth_data = JSON.parse(localStorage.getItem("auth"))


}
console.log(user_auth_data)

main_goals_array = getMainGoalsArray()
if (main_goals_array == undefined || main_goals_array == null){
    main_goals_array = []
}


// add arrow to all prioritize goals

//if user is not logged in show login screen

if (!user_auth_data.user_is_logged_in){
    showLoginScreen()
}else{
    showSetGoalsScreen()
}

login_button.addEventListener('click',()=>{
    loginUserWithGoogle(0)
})


goal_input.addEventListener('keyup',(e)=>{
    
    if(e.key == 'Enter' && goal_input.value!='' ){
        make_and_save_new_goal(goal_input.value)
        goal_input.value=''
        refreshGoalsList()
        saveWork()
    }else{
        suggest(goal_input.value)
    }
    
})


set_goal_continue_btn.onclick = showPrioritizeSection


prioritize_continue.onclick = showPlanSection


task_input.addEventListener('keypress',(e)=>{
    if(e.key  == 'Enter' && task_input.value!=''){
        let task = new Goal(task_input.value)
        // try {
        //     current_goal_obj.tasks_array.unshift(task)
        // } catch (error) {
        //     main_goals_array[0].tasks_array.unshift(task)    
        // }
        current_goal_obj.tasks_array.unshift(task)
        task_input.value=''
        refreshTaskList()
        saveWork()
    }else {
        //suggest(task_input.value)

    }
        
    
})


//set initially maybe this is redundant and may cause problems :
continue_btn_on_plan.onclick = showWorkOnTaskSection


notes_input.addEventListener('keypress',(e)=>{
    if(e.key  == 'Enter' && notes_input.value!=''){
        let current_date_and_time = getCurrentDateAndTimeString()
        let current_task_obj = undefined
        
        main_goals_array[0].tasks_array.forEach(task => {
            if (task.name == current_task.innerText){
                current_task_obj = task
            }
        });
        current_task_obj.notes +=  current_date_and_time +' '+ notes_input.value + '\n'
        notes_input.value=''
        notes_box.innerText = current_task_obj.notes
        saveWork()
    }
        
    
})



convert_into_goal_button.onclick = convert_current_task_into_main_goal
go_deeper_btn.onclick = go_deeper



done_button.onclick = currentTaskDone


if ('serviceWorker' in navigator) {
    if (!DEBUG){
        navigator.serviceWorker.register('./sw.js');
    }
}





work_another_task_btn.onclick = showPlanSection



if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
    darkMode(1)
}





//### keyboard shortcuts

// Alt+G is go list of goals

let hey1 = document.getElementsByTagName('body')[0]

hey1.addEventListener('keydown', e => {
    myfunc(e)
})


hey1.addEventListener('keyup', e => {
    myfunc(e, "up")
})

let altpressed = false
function myfunc(e, up = "down") {

    if (up == "down" && e.key == "Alt") {
        altpressed = true
    } if (up == "up" && e.key == "Alt") {
        altpressed = false
    }
    if (altpressed && e.key == "g" && up == "down") {
        //console.log("success")
        showSetGoalsScreen()
    }
    if (altpressed && e.key == "h" && up == "down") {
        //console.log("success")
        showPrioritizeSection()
    }
    if (altpressed && e.key == "j" && up == "down") {
        //console.log("success")
        darkMode(1)
    }
    if (altpressed && e.key == "n" && up == "down") {
        //console.log("success")
        openNav()
    }
    if (goal_input !== document.activeElement && task_input !== document.activeElemen && e.key =='n' && up== 'down' ){
        openNav()

    }
     
    //console.log(e.key,up,altpressed)



}

// Alt+H is go list of priority


// 


