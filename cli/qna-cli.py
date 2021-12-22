import os
import sys
import datetime
import json
from time import sleep
from typing import Mapping,Dict
from tinydb import TinyDB, Query

database = TinyDB('qna.json')
main_questions_array = database.all()

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def save_to_database():
    database.truncate()
    for qn in main_questions_array:
        database.insert(qn)

class Question(Dict):
    def __init__(self,name):
        self["name"] = name
        self["answers"] = []
        self["created"] = datetime.datetime.now().timestamp()

def print_all_questions(questions_array):
    for index,question in enumerate(questions_array):
        print (index+1,question["name"])

def work_on_Question(array_of_questions):
    selected_question =  get_user_to_select_a_Question(array_of_questions)
    if selected_question==None: 
        print("not found")
        return 
    clear_screen()
    print("cool lets work on \n\n", selected_question["name"])
    if len(selected_question["answers"])>0:
        print("we have")
        for index,subquestion in enumerate(selected_question["answers"]):
            print(index+1,"-",subquestion["name"])
    print(f"Q: {selected_question['name']}")
    answer = "a"
    while answer !="q":
        answer = input("A:\n")
        if answer =="q": return
        sub_question = Question(answer)
        selected_question["answers"].append(sub_question)
        save_to_database()
    clear_screen()

        
def get_user_to_select_a_Question(array_of_questions):
    print("please select a question to work on from the following")
    print_all_questions(array_of_questions)
    selection = input()
    if selection == "q": return
    return array_of_questions[int(selection)-1]
    

def main():
    selection = "a"
    while selection != 'q':
        if selection == "2":
            clear_screen()
            question_title = input("enter title of new question\n")
            if question_title == 'q': return main()
            new_question = Question(question_title)
            main_questions_array.append(new_question)
            save_to_database()
            print("added", question_title)
        elif selection == "3":
            work_on_Question(main_questions_array)
        clear_screen()
        selection = input('\nPlease select from the following: \
        \n2. add new Question \
        \n3. Answer an existing Question\
        \nq. quit\n')
main()
