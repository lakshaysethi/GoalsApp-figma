import requests
import os
import sys
import datetime
import json
from time import sleep

from typing import Mapping,Dict
from tinydb import TinyDB, Query

database = TinyDB('cli.json')

class Goal(Dict):
    def __init__(self,name):
        self["name"] = name
        self["subgoals"] = []
        self["done"] = False
        # self["created"] = json.dumps(datetime.datetime.now(), indent=4, sort_keys=True, default=str)
        self["created"] = datetime.datetime.now().timestamp()
def get_all_main_goals():
    return database.all()

def print_all_goals(goals_array):
    for index,goal in enumerate(goals_array):
        print (index+1,goal["name"])

def work_on_goal(array_of_goals):
    selected_goal =  get_user_to_select_a_goal(array_of_goals)
    if selected_goal==None: 
        print("not found")
        return 
    print("cool lets work on \n\n", selected_goal["name"])
    if len(selected_goal["subgoals"])>0:
        print("we have")
        for subgoal in selected_goal["subgoals"]:
            print(subgoal["name"])
    choice = input("1. add more sub tasks \n2. work on one of the sub goals\n")
    if choice =="2":
         work_on_goal(selected_goal["subgoals"])
    print(f"make a list of everything you can think of, that you can do  do to achieve {selected_goal['name']}")
    todo = "a"
    while todo !="q":
        todo = input("you can:\n")
        if todo =="q": return
        sub_goal = Goal(todo)
        selected_goal["subgoals"].append(sub_goal)
        
def get_user_to_select_a_goal(array_of_goals):
    print("please select a goal to work on from the following")
    print_all_goals(array_of_goals)
    selection = input()
    if selection == "q": return
    return array_of_goals[int(selection)-1]
    



def main():
    selection = "a"
    while selection != 'q':
        if selection == "2":
            goal_title = input("enter title of new goal\n")
            new_goal = Goal(goal_title)
            database.insert(new_goal)
            print("added", goal_title)
        elif selection == "1":
            print("here is a list of your goals\nid name")
            print_all_goals(get_all_main_goals())
            return
        elif selection == "3":
            work_on_goal(get_all_main_goals())
        sleep(1)
        selection = input('\nPlease select from the following: \n1. List my goals\n2. add new goal\n3. work on a goal\nq. quit\n')
main()
