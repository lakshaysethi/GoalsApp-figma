import requests
import os
import sys
import datetime
import json

class Goal():
    def __init__(self,name):
        self.name = name
        self.name = []
        self.name = False
        self.created = datetime.datetime.now()
    
    def to_json(self):
        return json.dumps(self, default=lambda o: str(o), sort_keys=True, indent=4)



def get_all_main_goals():
    return [Goal('test goal 1')]


def main():
    print('Please select from the following:')
    print('1. List my goals')
    print('2. add new goal')
    print('3. work on a goal')
    selection = input()
    if selection == "2":
        print("enter title of new goal")
    elif selection == "1":
        print("here is a list of your goals")
        for goal in get_all_main_goals():
            print (goal.to_json())
    elif selection == "3":
        id_of_selected_goal = input("please enter id of goal you want to work on or enter 'q' to go to main menu")
main()
