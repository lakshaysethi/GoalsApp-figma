function showLoginScreen(){
    login_screen.style.display = 'block'
}


function loginUserWithGoogle(){
    user_is_logged_in = true
    showSetGoalsScreen()
}

function showSetGoalsScreen(){
    work_on_task_section.style.display = 'none'
    login_screen.style.display = 'none'
    set_goal_screen.style.display = 'block'
    refreshGoalsList()
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
    saveWork()
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
        move_up.onclick = () => { moveItem(index_of_goal,0,main_goals_array); refreshPrioritizeGoalsList()}
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
    refreshTaskList()
    plan_section.style.display = 'block'
    prioritizesection.style.display = 'none'
    top_goal.forEach((element)=> element.innerText=main_goals_array[0].name)
    saveWork()
}




function  refreshTaskList(){
    task_list_holder.innerHTML =""
    main_goals_array[0].tasks_array.forEach(task => {
        let task_element = document.createElement('div')
        task_element.classList.add('task')
        task_element.innerText = task.name
        task_list_holder.append(task_element)
        
    });
}


function showWorkOnTaskSection(){
    if (main_goals_array[0].tasks_array.length>0){
        work_on_task_section.style.display = 'block'
        plan_section.style.display = 'none'
        current_task.innerText = main_goals_array[0].tasks_array[0].name
        notes_box.innerText = main_goals_array[0].tasks_array[0].notes
    }
    saveWork()
}



function getCurrentDateAndTimeString(){
    let now = new Date()
    now = now.toString()
    return now.slice(4,24)
}



function convert_current_task_into_main_goal(){
    
    main_goals_array[0].tasks_array.forEach(task => {
        if (task.name == current_task.innerText){
            // add to main goal array
            main_goals_array.push(task)
            let index = main_goals_array[0].tasks_array.indexOf(task)
            // remove from task array
            main_goals_array[0].tasks_array.splice(index,1)
            showSetGoalsScreen()
        }
    });

    saveWork()

}


function getMainGoalsArray(){
    let arraystring = localStorage.getItem('ga')
    let main_g_arra=  JSON.parse(arraystring)
    return main_g_arra
}


function saveWork(){
    localStorage.setItem("ga",JSON.stringify(main_goals_array))
}





function currentTaskDone(){
    main_goals_array[0].tasks_array.forEach(task => {
        if (task.name == current_task.innerText){
           task.achieved = true
           moveItem(0,main_goals_array[0].tasks_array.length,main_goals_array[0].tasks_array)
           task.notes += getCurrentDateAndTimeString() + ' ' + "DONE!" +"\n"
        }
    });
    saveWork()
    showPlanSection()
}


