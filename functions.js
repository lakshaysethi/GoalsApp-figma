function showLoginScreen(){
    login_screen.style.display = 'block'
}


function loginUserWithGoogle(){
    user_is_logged_in = true
    showSetGoalsScreen()
}

function showSetGoalsScreen(){
    login_screen.style.display = 'none'
    set_goal_screen.style.display = 'block'
}

function make_and_save_new_goal(goal_name){
    let goal = new Goal(goal_name)
    main_goals_array.push(goal)
}

function refreshGoalsList(){
    main_goals_list_holder.innerHTML =""
    main_goals_array.forEach(goal => {
        let goal_element = document.createElement('div')
        goal_element.classList.add('goal')
        goal_element.innerText = goal.name
        main_goals_list_holder.append(goal_element)
        
    });
}

function showPrioritizeSection(){
    if (main_goals_array.length>0){
        login_screen.style.display = 'none'
        set_goal_screen.style.display = 'none'
        prioritizesection.style.display = 'block'
    }
    refreshPrioritizeGoalsList()

}

function refreshPrioritizeGoalsList(){
    prioritize_goals_list_holder.innerHTML =""
    main_goals_array.forEach(goal => {
        let goal_element = document.createElement('div')
        goal_element.classList.add('priritize-goal')
        goal_element.innerText = goal.name
        prioritize_goals_list_holder.append(goal_element)
        let move_down = document.createElement('div')
        let move_up = document.createElement('div')
        let index_of_goal = main_goals_array.indexOf(goal)
        move_up.onclick = () => { moveItem(index_of_goal,index_of_goal-1,main_goals_array); refreshPrioritizeGoalsList()}
        move_down.onclick = ()=> { moveItem(index_of_goal,index_of_goal+1,main_goals_array); refreshPrioritizeGoalsList()}
        
        move_up.classList.add('priority_button')
        move_down.classList.add("priority_button",'upside_down')
        goal_element.prepend(move_down)
        goal_element.append(move_up)

    });
}


function moveItem(from, to,array) {
  var f = array.splice(from, 1)[0];
  array.splice(to, 0, f);
}


function showPlanSection(){
    plan_section.style.display = 'block'
    prioritizesection.style.display = 'none'
    top_goal.innerText = main_goals_array[0].name

}