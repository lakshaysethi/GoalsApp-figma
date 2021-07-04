class Goal{
    constructor(name){
        this.name = name
    }
    name = ''
    tasks_array = []
    // priority = 0
}
const main_goals_array = []
const login_button = document.getElementById('login-with-google')
let user_is_logged_in = false
const login_screen = document.getElementById('login-screen')
const set_goal_screen = document.getElementById('make-list-of-goals')
const goal_input = document.getElementById('goal-input')


const main_goals_list_holder = document.getElementById('goals-list-holder')

const set_goal_continue_btn = document.getElementById('set-goal-continue-btn')

const prioritizesection = document.getElementById('prioritize-goals')
const prioritize_goals_list_holder = document.getElementById('prioriteze-goals-list-holder')



const prioritize_continue = document.getElementById("continue-on-prioritise-section-button")


const plan_section = document.getElementById('plan-for-top-goal')

const top_goal = document.getElementById("top-priority-goal")




