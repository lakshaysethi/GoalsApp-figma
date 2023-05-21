const showLoginScreen=()=>{
    login_screen.style.display = 'block'
    work_on_task_section.style.display = 'none'
    set_goal_screen.style.display = 'none'
}


const archieve_or_un_all=(archive_all=true)=>{
    main_goals_array.forEach((goal)=>{
        goal.archived=archive_all
    })
    saveWork()
    showSetGoalsScreen()
}

const loginUserWithGoogle=(firebase=0)=>{
        
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

const login_user = (googleUser) => {
    console.log(googleUser)
    user_auth_data.user_is_logged_in = true
    
    loginUserWithGoogle()
    showUserProfileButton()

    
}
const showUserProfileButton=()=>{
    let profile_button = document.createElement('img')
    profile_button.src = user_auth_data.user_image_url
    profile_button.style.width = "2rem"
    profile_button.style.height = "2rem"
    profile_button.style.borderRadius = "50%"
    profile_button.style.float = "right"
    profile_button.style.margin = "0.5rem"
    profile_button.style.cursor = "pointer"
    profile_button.onclick = ()=>{
        alert("showing user profile")
    }
    login_button_offline.replaceWith(profile_button)

}


const showSetGoalsScreen=(showArch=0)=>{
    comming_from_go_deeper = false
    goal_input.focus()
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

const make_and_save_new_goal=(goal_name)=>{
    let goal = new Goal(goal_name)
    main_goals_array.unshift(goal)
}


const make_child = (parent_goal, child_goal) => {
    parent_goal.tasks_array.push(child_goal)
    take_subgoal_out_of_main_list(child_goal)
    saveWork()
    showSetGoalsScreen()

}


const getMakeChildBtn=()=>{
    let make_child_button = document.createElement('button')
    make_child_button.innerText = "make subgoal"
    make_child_button.style.padding = "0rem 1rem"
    make_child_button.style.float = "left"
    make_child_button.style.margin = 0
    return make_child_button
}

const ask_user_for_parent_goal=(child)=>{
    text = "Enter id of parent goal\n"
    text += "choose from the following list"
    main_goals_array.forEach((goal,index,arr) => {
        if (goal != child) {
            text += `\n${index} : ${goal.name}`
        }
    })

    let parent_goal_id = prompt(text)
    return main_goals_array[parent_goal_id]
}

const take_subgoal_out_of_main_list=(subgoal)=>{
    main_goals_array.forEach((goal,index,arr) => {
        if (goal == subgoal){
            arr.splice(index,1)
        }
    })
}

const refreshGoalsList=(showArch=0)=>{
    main_goals_list_holder.innerHTML =""
    let totalnumberofgoalsdisplayed = 0
    main_goals_array.forEach((goal,index,arr) => {
        
        let goal_element = document.createElement('div')
        goal_element.classList.add('goal')
        goal_element.innerText = goal.name
        let archive_btn = getArchiveBtn()
        archive_btn.onclick = () =>{goal.archived = !showArch;refreshGoalsList(showArch); saveWork()}
        let make_child_button = getMakeChildBtn()
        make_child_button.onclick = () => {
            make_child(ask_user_for_parent_goal(goal),goal)
            saveWork()
            showSetGoalsScreen()
        }
        goal_element.append(make_child_button)
        
        goal_element.append(archive_btn)
        if (showArch && goal.archived) {
            main_goals_list_holder.append(goal_element)
            totalnumberofgoalsdisplayed++
        }else if(showArch ==0 && !goal.archived ) {
            main_goals_list_holder.append(goal_element)
            totalnumberofgoalsdisplayed++
        }else{
           // console.log(goal.name,"is", goal.archived, "and hence not displayed")
        }

        checkbox(goal_element,goal,index,arr,"goal",showArch)

    });
    let totaldiv = document.createElement('div')
    totaldiv.innerText = totalnumberofgoalsdisplayed
    main_goals_list_holder.prepend(totaldiv)
}







const getArchiveBtn=()=>{

    let archive_btn = document.createElement('button')
    archive_btn.innerText = "🗃️"
    archive_btn.style.padding = "0rem 1rem"
    archive_btn.style.float = "left"
    archive_btn.style.margin = 0
    return archive_btn
}

const showPrioritizeSection=()=>{
    if (main_goals_array.length>0){
        set_goal_screen.style.display = 'none'
        work_on_task_section.style.display = 'none'
        login_screen.style.display = 'none'
        work_on_task_section.style.display = 'none'
        plan_section.style.display = 'none'
        prioritizesection.style.display = 'block'
    }
    refreshPrioritizeGoalsList()
    saveWork()
}

const refreshPrioritizeGoalsList=()=>{
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
        moveDown_arrow_onClick(move_down,index_of_goal,main_goals_array,"goal");
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


const moveItem=(from, to,array) =>{
  var f = array.splice(from, 1)[0];
  array.splice(to, 0, f);
}


const showPlanSection=()=>{
    let index_of_top_unarchieved_goal = 0
    if (main_goals_array[0].archived){
        main_goals_array.forEach((goal,index)=>{
            if (!goal.archived  ){
                if (index_of_top_unarchieved_goal == 0 ){
                    index_of_top_unarchieved_goal = index
                }
            }
        })
    }
    

    


    if (!comming_from_go_deeper){

        current_goal_obj = main_goals_array[index_of_top_unarchieved_goal] // at this stage
    }// else current_goal_obj is defined 
    console.log("current_goal_obj",current_goal_obj)
    refreshTaskList()
    plan_section.style.display = 'block'
    prioritizesection.style.display = 'none'
    work_on_task_section.style.display = 'none'
    top_goal.forEach((element)=> element.innerText=current_goal_obj.name)
    saveWork()
    title.innerText = current_task_obj.name + ' '+ current_goal_obj.name +' - Goals App'
}




const  refreshTaskList=()=>{
    task_list_holder.innerHTML =""
    current_goal_obj.tasks_array.forEach((task,index,arr) => {
        let task_element = document.createElement('div')
        task_element.classList.add('task')
        task_element.innerText = task.name
        task_list_holder.append(task_element)
        let move_down = document.createElement('div')
        let move_up = document.createElement('div')
        let del_btn = document.createElement('div')
        let index_of_task = current_goal_obj.tasks_array.indexOf(task)
        move_up.onclick = () => { moveItem(index_of_task,0,current_goal_obj.tasks_array); saveWork();refreshTaskList()}
        moveDown_arrow_onClick(move_down,index_of_task,current_goal_obj.tasks_array,"task")
        del_btn.onclick = ()=> {if(confirm('are yousure you want to delete?')){current_goal_obj.tasks_array.splice(index_of_task,1);refreshTaskList()}}
        del_btn.classList.add('delete_button')
        del_btn.innerText = "Del"
        move_up.classList.add('priority_button')
        move_down.classList.add("priority_button",'upside_down')
        task_element.prepend(move_down)
        task_element.append(move_up)
        task_element.append(del_btn)


       checkbox(task_element,task,index,arr)

    });

}


const showWorkOnTaskSection=()=>{
    if (!current_task_obj ) current_goal_obj = main_goals_array[0]
    if (main_goals_array[0].tasks_array.length>0){
        current_task_obj = current_goal_obj.tasks_array[0]
        work_on_task_section.style.display = 'block'
        plan_section.style.display = 'none'
        current_task.innerText = current_task_obj.name
        notes_box.innerText = current_task_obj.notes
    }
    title.innerText = current_task_obj.name + ' '+ current_goal_obj.name +' - Goals App'

    saveWork()
}



const getCurrentDateAndTimeString=()=>{
    let now = new Date()
    now = now.toString()
    return now.slice(4,24)
}



const convert_current_task_into_main_goal=()=>{
    
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

const go_deeper=()=>{
    current_goal_obj = current_task_obj
    comming_from_go_deeper = true

    showPlanSection()

    saveWork()

}

const database_getItem=(key)=>{
    if (DATABASE == "browserStorage"){
       return localStorage.getItem(key)
    }else if (DATABASE == "api"){
        // get from api

    }
}

const database_setItem=(key,value)=>{
    if (DATABASE == "browserStorage"){
       return localStorage.setItem(key,value)
    }else if (DATABASE == "api"){
        // get from api

    }
}

const getMainGoalsArray=()=>{
    let arraystring = database_getItem('ga')
    let main_g_arra=  JSON.parse(arraystring)
    return main_g_arra
}


const saveWork=()=>{
    database_setItem("ga",JSON.stringify(main_goals_array))
    if(user_auth_data.user_unique_key!="" && syncallowed ){
        saveuserDataToDatabase()
    }
}





const currentTaskDone=()=>{
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




const openNav=() =>{
    let mynav = document.getElementById("mySidenav")
    mynav.style.width = "100%";
    mynav.style.maxWidth = '500px'
    my_goals_nav_link.focus()
  }
  
  /* Set the width of the side navigation to 0 */
  const closeNav=() =>{
    document.getElementById("mySidenav").style.width = "0";
  }





const darkMode=(bool)=>{
    
    
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



const recursiveSearchThenDisplay=(text,array,task =0,supergoal=undefined)=>{
    array.forEach(goal=>{
        if (goal.name.toLowerCase().search(text.toLowerCase())!=-1){
            let dropdown = document.createElement('div')
            let alreadyGoalDiv = document.createElement('div')
            alreadyGoalDiv.innerText = goal.name
            alreadyGoalDiv.classList.add('goal')
            let unarchive_button = document.createElement('button')
            unarchive_button.innerText ="add below"
            unarchive_button.onclick = () =>{
                
                goal.archived = !goal.archived;
                goal_input.focus();
                goal_input.value="";
                refreshGoalsList() ;
                saveWork();
                suggest_holder.innerHTML ="";

            }
            if (goal.archived){
                alreadyGoalDiv.append(unarchive_button)
            }else{
                if (task==1){
                    const higherGoalBtn = document.createElement('button')
                    higherGoalBtn.innerHTML = supergoal
                    higherGoalBtn.onclick = () => {suggest(higherGoalBtn.innerHTML)}
                    alreadyGoalDiv.append(higherGoalBtn)
                }else{

                    alreadyGoalDiv.innerHTML += "<br>"+" is in main goals"
                }
            }
            //console.log(goal.name)
            dropdown.prepend(alreadyGoalDiv)
            suggest_holder.append(dropdown)
        }
        if (goal.tasks_array.length>0){
            recursiveSearchThenDisplay(text,goal.tasks_array,task = 1,supergoal = goal.name)
        }
        

    })
}

const suggest=(text)=>{
    if (text.length >2){
        suggest_holder.innerHTML =""
        recursiveSearchThenDisplay(text,main_goals_array)
    }else{
        suggest_holder.innerHTML =""
    }

}





const saveuserDataToDatabase=async ()=>{

    let user_data ={
        ...user_auth_data,
        "goals":JSON.stringify(main_goals_array)
    }

    return await db.collection("users").doc(user_auth_data.user_unique_key).set(user_data)
        
    

}


 const getUserGoals=async (uid)=>{
    console.log("redundent const called=")
   downloadGoals()
}





const signOut=()=>{
    if (user_auth_data.user_is_logged_in){
        console.log('logging out')
        if (! prompt("are you sure you want to sign out? this will delete all your data from local/browser storage")){
            return
        }
        localStorage.clear()
        user_auth_data.user_is_logged_in = false
        user_auth_data = undefined
        location.reload()
    }
}




const downloadGoals= async ()=>{
    return
    if (syncallowed){
    const uid = user_auth_data.user_unique_key
    const doc = await db.collection("users").doc(uid).get()
    if (doc.exists){
        const doc_data = await doc.data()
        //console.log("user's goals :",JSON.parse(doc_data.goals))
        const firebase_goals_array = JSON.parse(doc_data.goals)
        main_goals_array = firebase_goals_array
        refreshGoalsList()
    }else{
        console.log("error doc not found")
    }
    }
}



const moveDown_arrow_onClick=(move_down,index,array,refreshfunction)=>{
    if (refreshconst === "goal"){
        move_down.onclick = () => {
            moveItem(index,array.length,array); 
            saveWork();
            refreshPrioritizeGoalsList()
        }
    }else if (refreshconst =="=task") {
        move_down.onclick = () => {
            moveItem(index,array.length,array); 
            saveWork();
            refreshTaskList()
        }
    }
}





const checkbox=(element,goal,index,array,refresh="task",showArch)=>{

    let checkbox = document.createElement('input')
    checkbox.setAttribute("type","checkbox")
    checkbox.style.transform = "scale(3.0)"
    checkbox.style.width ="max-content"



    element.append(checkbox)
    if (goal.achieved ){
        checkbox.checked =true
    }
    checkbox.addEventListener("change",()=>{
        if (checkbox.checked) {
            //set goal as achieved
            goal.achieved =true
            goal.notes += "\n" +getCurrentDateAndTimeString() +" goal checked off  " +"\n" 
            //move to bottom
            moveItem(index,array.length,array)
        } else {
            
            goal.achieved =false
            goal.notes += "\n" +getCurrentDateAndTimeString() +" goal unchecked  " +"\n" 
            moveItem(index,0,array)

        }
        saveWork()
        if (refresh=="goal"){
            refreshGoalsList(showArch)
        }else{
            refreshTaskList()
        }
    })
}


const makefullscreen=()=>{
  if (wholedoc.requestFullscreen) {
    wholedoc.requestFullscreen();
  } else if (wholedoc.webkitRequestFullscreen) { /* Safari */
    wholedoc.webkitRequestFullscreen();
  } else if (wholedoc.msRequestFullscreen) { /* IE11 */
    wholedoc.msRequestFullscreen();
  }
}
