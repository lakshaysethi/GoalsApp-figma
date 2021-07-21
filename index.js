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
    }else{
        suggest(goal_input.value)
    }
    saveWork()
})


set_goal_continue_btn.onclick = showPrioritizeSection


prioritize_continue.onclick = showPlanSection


task_input.addEventListener('keypress',(e)=>{
    if(e.key  == 'Enter' && task_input.value!=''){
        let task = new Goal(task_input.value)
        main_goals_array[0].tasks_array.unshift(task)
        task_input.value=''
        refreshTaskList()
    }
        
    saveWork()   
})



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
    }
        
    saveWork()
})



convert_into_goal_button.onclick = convert_current_task_into_main_goal



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
    //console.log(e.key,up,altpressed)



}

// Alt+H is go list of priority


// 


