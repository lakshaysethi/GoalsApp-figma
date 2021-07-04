

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


