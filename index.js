

// add arrow to all prioritize goals

//if user is not logged in show login screen

if (!user_is_logged_in){
    showLoginScreen()
}

login_button.addEventListener('click',()=>{
    loginUserWithGoogle()
})


goal_input.addEventListener('keypress',(e)=>{
    
    if(e.key == 'Enter' && goal_input.value!='' ){
        make_and_save_new_goal(goal_input.value)
        goal_input.value=''
        refreshGoalsList()
    }
})


set_goal_continue_btn.onclick = showPrioritizeSection


prioritize_continue.onclick = showPlanSection


task_input.addEventListener('keypress',(e)=>{
    if(e.key  == 'Enter' && task_input.value!=''){
        let task = new Goal(task_input.value)
        main_goals_array[0].tasks_array.push(task)
        task_input.value=''
        refreshTaskList()
    }
        
        
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
        current_task_obj.notes += ' '+ current_date_and_time + notes_input.value + '\n'
        notes_input.value=''
        notes_box.innerText = current_task_obj.notes
    }
        
        
})




