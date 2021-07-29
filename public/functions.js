function showLoginScreen(){
    login_screen.style.display = 'block'
    work_on_task_section.style.display = 'none'
    set_goal_screen.style.display = 'none'
}


function loginUserWithGoogle(firebase=1){
        
    if (firebase){
        if (user_auth_data.user_is_logged_in){
            showSetGoalsScreen()

        }else{
            showLoginScreen()
        }
    }else{
        showSetGoalsScreen()
    }

}

function showSetGoalsScreen(showArch=0){
    set_goal_screen.style.display = 'block'
    work_on_task_section.style.display = 'none'
    login_screen.style.display = 'none'
    prioritizesection.style.display = 'none'
    work_on_task_section.style.display = 'none'
    plan_section.style.display = 'none'
    if(!showArch)downloadGoals()
    refreshGoalsList(showArch)
    
    // saveWork()
    
    // closeNav()
}

function make_and_save_new_goal(goal_name){
    let goal = new Goal(goal_name)
    main_goals_array.unshift(goal)
}

function refreshGoalsList(showArch=0){
    main_goals_list_holder.innerHTML =""
    let totalnumberofgoalsdisplayed = 0
    main_goals_array.forEach(goal => {
        
        let goal_element = document.createElement('div')
        goal_element.classList.add('goal')
        goal_element.innerText = goal.name
        let archive_btn = getArchiveBtn()
        archive_btn.onclick = () =>{goal.archived = !showArch;refreshGoalsList(showArch); saveWork()}
        goal_element.append(archive_btn)
        if (showArch && goal.archived) {
            main_goals_list_holder.append(goal_element)
            totalnumberofgoalsdisplayed++
        }else if(showArch ==0 && !goal.archived ) {
            main_goals_list_holder.append(goal_element)
            totalnumberofgoalsdisplayed++
        }else{
            console.log(goal.name,"is", goal.archived, "and hence not displayed")
        }
    });
    let totaldiv = document.createElement('div')
    totaldiv.innerText = totalnumberofgoalsdisplayed
    main_goals_list_holder.prepend(totaldiv)
}
function getArchiveBtn(){

    let archive_btn = document.createElement('button')
    archive_btn.innerText = "🗃️"
    archive_btn.style.padding = "0rem 1rem"
    archive_btn.style.float = "left"
    archive_btn.style.margin = 0
    return archive_btn
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
        if (!goal.archived){
        let goal_element = document.createElement('div')
        goal_element.classList.add('priritize-goal')
        goal_element.innerText = goal.name
        prioritize_goals_list_holder.append(goal_element)
        let move_down = document.createElement('div')
        let move_up = document.createElement('div')
        let delete_button = document.createElement('div')
        let index_of_goal = main_goals_array.indexOf(goal)
        move_up.onclick = () => { moveItem(index_of_goal,0,main_goals_array); saveWork(); refreshPrioritizeGoalsList()}
        move_down.onclick = ()=> { moveItem(index_of_goal,index_of_goal+1,main_goals_array); saveWork();refreshPrioritizeGoalsList()}
        delete_button.onclick = () => {if(confirm('are yousure you want to delete?')){main_goals_array.splice(index_of_goal,1);refreshPrioritizeGoalsList()}}
        delete_button.classList.add("delete_button")
        delete_button.innerText = 'Del'
        move_up.classList.add('priority_button')
        move_down.classList.add("priority_button",'upside_down')
        goal_element.prepend(move_down)
        goal_element.append(move_up)
        goal_element.append(delete_button)

        let archive_btn = getArchiveBtn()
        goal_element.append(archive_btn)
        archive_btn.onclick = () =>{goal.archived = true;refreshPrioritizeGoalsList(); saveWork()}
        }
    });
}


function moveItem(from, to,array) {
  var f = array.splice(from, 1)[0];
  array.splice(to, 0, f);
}


function showPlanSection(){
    if (!comming_from_go_deeper){

        current_goal_obj = main_goals_array[0] // at this stage
    }// else current_goal_obj is defined 
    console.log("current_goal_obj",current_goal_obj)
    refreshTaskList()
    plan_section.style.display = 'block'
    prioritizesection.style.display = 'none'
    work_on_task_section.style.display = 'none'
    top_goal.forEach((element)=> element.innerText=current_goal_obj.name)
    saveWork()
    title.innerText = current_task_obj.name + ' - Goals App'
}




function  refreshTaskList(){
    task_list_holder.innerHTML =""
    current_goal_obj.tasks_array.forEach(task => {
        let task_element = document.createElement('div')
        task_element.classList.add('task')
        task_element.innerText = task.name
        task_list_holder.append(task_element)
        let move_down = document.createElement('div')
        let move_up = document.createElement('div')
        let del_btn = document.createElement('div')
        let index_of_task = current_goal_obj.tasks_array.indexOf(task)
        move_up.onclick = () => { moveItem(index_of_task,0,current_goal_obj.tasks_array); saveWork();refreshTaskList()}
        move_down.onclick = ()=> { moveItem(index_of_task,index_of_task+1,current_goal_obj.tasks_array) ;saveWork(); refreshTaskList()}
        del_btn.onclick = ()=> {if(confirm('are yousure you want to delete?')){current_goal_obj.tasks_array.splice(index_of_task,1);refreshTaskList()}}
        del_btn.classList.add('delete_button')
        del_btn.innerText = "Del"
        move_up.classList.add('priority_button')
        move_down.classList.add("priority_button",'upside_down')
        task_element.prepend(move_down)
        task_element.append(move_up)
        task_element.append(del_btn)


        let checkbox = document.createElement('input')
        checkbox.setAttribute("type","checkbox")
        checkbox.style.transform = "scale(3.0)"
        task_element.append(checkbox)
        if (task.achieved ){
            checkbox.checked =true
        }
        checkbox.addEventListener("change",()=>{
            if (checkbox.checked) {
                task.achieved =true
                task.notes += "\n" +getCurrentDateAndTimeString() +" task checked off  " +"\n" 
            } else {
                task.achieved =false
                task.notes += "\n" +getCurrentDateAndTimeString() +" task unchecked  " +"\n" 

            }
            saveWork()
        })

    });

}


function showWorkOnTaskSection(){
    if (!current_task_obj ) current_goal_obj = main_goals_array[0]
    if (main_goals_array[0].tasks_array.length>0){
        current_task_obj = current_goal_obj.tasks_array[0]
        work_on_task_section.style.display = 'block'
        plan_section.style.display = 'none'
        current_task.innerText = current_task_obj.name
        notes_box.innerText = current_task_obj.notes
    }
    title.innerText = current_task_obj.name + ' - Goals App'
    saveWork()
}



function getCurrentDateAndTimeString(){
    let now = new Date()
    now = now.toString()
    return now.slice(4,24)
}



function convert_current_task_into_main_goal(){
    
    main_goals_array[0].tasks_array.forEach(task => {
        if (task.name.trim() == current_task.innerText.trim()){
            // add to main goal array
            main_goals_array.unshift(task)
            let index = main_goals_array[0].tasks_array.indexOf(task)
            // remove from task array
            main_goals_array[0].tasks_array.splice(index,1)
            showSetGoalsScreen()
        }
    });

    saveWork()

}

function go_deeper(){
    current_goal_obj = current_task_obj
    comming_from_go_deeper = true

    showPlanSection()

    saveWork()

}


function getMainGoalsArray(){
    let arraystring = localStorage.getItem('ga')
    let main_g_arra=  JSON.parse(arraystring)
    return main_g_arra
}


function saveWork(){
    localStorage.setItem("ga",JSON.stringify(main_goals_array))
    if(user_auth_data.user_unique_key!="" && syncallowed ){
        saveuserDataToFireStore()
    }
}





function currentTaskDone(){
    main_goals_array[0].tasks_array.forEach(task => {
        if (task.name.trim() == current_task.innerText.trim()){
           task.achieved = true
           moveItem(0,main_goals_array[0].tasks_array.length,main_goals_array[0].tasks_array)
           task.notes += getCurrentDateAndTimeString() + ' ' + "DONE!" +"\n"
        }
    });
    saveWork()
    comming_from_go_deeper = false
    showPlanSection()
}




function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }





function darkMode(bool){
    
    
    if(bool){

        body.style.background = 'black'
        body.style.color = 'white'
        const darkstyle = document.createElement('style')
        body.prepend(darkstyle)
        darkstyle.innerHTML = `
            .goal,.priritize-goal,.task{
                background:#354c3a;
            }
        
        `

    }else{
    
        body.style.background = 'white'
        body.style.color = 'black'


    }

    
}



function suggest(text){
    
    // main_goals_array.forEach(goal=>{
    //     if (text.search(goal.name)){
    //         let dropdown = document.createElement('div')
    //         let alreadyGoalDiv = document.createElement('div')
    //         alreadyGoalDiv.innerText = goal.name
    //         dropdown.prepend(alreadyGoalDiv)
    //         suggest_holder.innerHTML =""
    //         suggest_holder.append(dropdown)
    //     }

    // })

}





async function saveuserDataToFireStore(){

    let user_data ={
        ...user_auth_data,
        "goals":JSON.stringify(main_goals_array)
    }


    return await db.collection("users").doc(user_auth_data.user_unique_key).set(user_data)
        
    

}

async function getUserGoals(uid){
    console.log("redundent function called")
   downloadGoals()
}





function signOut(){

    if (user_auth_data.user_is_logged_in){
        console.log('logging out')

        firebase.auth().signOut().then(res=>console.log(res))
        localStorage.clear()
        location.reload()
        user_auth_data.user_is_logged_in = false
        user_auth_data = undefined
    }
    // .then(res=>{if res.})
}




async function downloadGoals(){
    if (syncallowed){
    const uid = user_auth_data.user_unique_key
    const doc = await db.collection("users").doc(uid).get()
    if (doc.exists){
        const doc_data = await doc.data()
        console.log("user's goals :",JSON.parse(doc_data.goals))
        const firebase_goals_array = JSON.parse(doc_data.goals)
        main_goals_array = firebase_goals_array
        refreshGoalsList()
    }else{
        console.log("error doc not found")
    }
    }
}






