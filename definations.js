const DEBUG =false

class Goal{
    constructor(name){
        this.name = name
    }
    name = ''
    tasks_array = []
    // priority = 0
    achieved = false
    archived = false
    notes = ''
}

let syncallowed = true //its 20k per day not month bro! 

let main_goals_array = []
const login_button = document.getElementById('login-with-google')
let user_auth_data ={
    'user_is_logged_in' : false,
    'user_name':"",
    "user_email":"",
    "user_pp":"",
    "user_unique_key":""
}

  // TODO change according to google signin
const login_screen = document.getElementById('login-screen')
const set_goal_screen = document.getElementById('make-list-of-goals')
const goal_input = document.getElementById('goal-input')


const main_goals_list_holder = document.getElementById('goals-list-holder')

const set_goal_continue_btn = document.getElementById('set-goal-continue-btn')

const prioritizesection = document.getElementById('prioritize-goals')
const prioritize_goals_list_holder = document.getElementById('prioriteze-goals-list-holder')



const prioritize_continue = document.getElementById("continue-on-prioritise-section-button")


const plan_section = document.getElementById('plan-for-top-goal')

const top_goal = document.querySelectorAll(".top-priority-goal")

const task_input = document.getElementById("task-input")


const task_list_holder = document.getElementById('task-list-holder')


const continue_btn_on_plan = document.getElementById('continue-btn-on-plan-section')



const work_on_task_section = document.getElementById("work-on-task")

const current_task = document.getElementById('current-task')


const work_another_task_btn = document.getElementById('work-another')

const title= document.getElementsByTagName('title')[0]


const notes_box = document.getElementById('notes')
const notes_input = document.getElementById('notes-input')



const convert_into_goal_button = document.getElementById("convert-into-goal")



const done_button = document.getElementById('done-button')


const body = document.getElementsByTagName('body')[0]

const suggest_holder = document.getElementById('suggest-holder')

