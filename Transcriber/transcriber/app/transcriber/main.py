
import os
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

from fastapi import FastAPI, File, UploadFile

import re
import spacy
from spacy import displacy

import pandas as pd 
import requests

nlp = spacy.load("en_core_web_sm")

import whisper 
model = whisper.load_model("base")
options = whisper.DecodingOptions()

import pymongo
import random
import openai


payload = {'arg1': 'BUF', 'arg2': 'OFF'}
url = 'https://data.mongodb-api.com/app/data-ahunl/endpoint/playbook_details'
r = requests.get(url,  params=payload)
# Extract play_name from the response
off_plays = [obj['play_name'] for obj in r.json()]

play_napayload = {'arg1': 'BUF', 'arg2': 'DEF'}
url = 'https://data.mongodb-api.com/app/data-ahunl/endpoint/playbook_details'
r = requests.get(url,  params=payload)
# Extract play_name from the response
def_plays = [obj['play_name'] for obj in r.json()]




Playbook = {
    'OFF': off_plays,
    'DEF': def_plays
}

class Pass:
  pass_from: str
  pass_to: str
  complete: bool
  
  def __init__(self, pass_from, pass_to, complete):
    self.pass_from = pass_from
    self.pass_to = pass_to 
    self.complete = complete 


class Play_position:
  yard_line: str
  down: int
  required_yards: int

  def __init__(self, down, required_yards, yard_line):
    self.down = down
    self.required_yards = required_yards
    self.yard_line = yard_line 

class Run:
  player: int 
  yard_line: str 
  distance: int 
  result: str

  def __init__(self, player, yard_line, result):
    self.player = player 
    self.yard_line = yard_line
    self.result = result


class Warning:
  time: int

  def __init__(self, time):
    self.time = time 

  
class Timeout:
  number: int 
  by: str
  time: str 

  def __init__(self, number, by): # Also add time
    self.number = number 
    self.by = by 


class Scramble:
  qb: int 
  yard_line: str
  distance: int 

  def __init__(self, qb, yard_line):
    self.qb = qb
    self.yard_line = yard_line 


class Touchdown:
  distance: int
  by: int
  to: int

  def __init__(self, by, to):
    self.by = by
    self.to = to 

class Fieldgoal:
  distance: int
  result: bool
  kicker: int 

  def __init__(self, kicker, result):
    self.kicker = kicker
    self.result = result 

class Extrapoint:
  kicker: int
  result: bool

  def __init__(self, kicker , result):
    self.kicker = kicker
    self.result = result 


class Interception:
  to: int
  qb: int
  by: int 

  def __init__(self, to, qb, by):
    self.to = to
    self.qb = qb
    self.by = by

class Punt:
  by: int
  final_yard_line: str

  def __init__(self, by, final_yard_line):
    self.by = by
    self.final_yard_line = final_yard_line


class Forms:
    name : str
    form_type : str 
    
    def __init__(self, name, form_type):
        self.name = name
        self.form_type = form_type 

#class Sacked
#class Fumble  
#class Penalty 

class Item(BaseModel):
    string: str
    #timestamp: datetime

app = FastAPI()

client = pymongo.MongoClient("mongodb+srv://admin:admin123@cluster1.rhgpgkk.mongodb.net/?retryWrites=true&w=majority")
db = client["V2T"]
collection = db.get_collection("Teams")
openai.api_key = ""



@app.get('/up')
async def up():
    return {"message": "App is running..."}

@app.get('/data/sentiment')
async def sentiment():
  client = pymongo.MongoClient("mongodb+srv://admin:admin123@cluster1.rhgpgkk.mongodb.net/?retryWrites=true&w=majority")
  db = client["V2T"]
  collection = db.get_collection("Teams")
  for team in collection.find({"name":"Buffalo Bills"}):
    return team["highlights"]



@app.post('/transcribe_file')
async def transcribe_file(file: bytes = File()):
    f = open("sample.mp4", "wb")
    f.write(file)
    f.close()
    audio = whisper.load_audio("sample.mp4")
    result = model.transcribe(audio)
    os.remove("sample.mp4")
    # Code to check if numeberst exist in result 
    if has_number(result):
      pass 
    else:
      post_highlights(result['text'])

    return {'result': result}

def has_number(string):
    """
    Returns True if string contains any number, False otherwise.
    """
    for char in string:
        if char.isdigit():
            return True
    return False

@app.post('/play')
async def transcribe_file(play: Item):
    f = open("data.txt","a")
    for line in play.string.split(","):
        f.write(line)
    f.close()
    os.remove("sample.mp4")
    return {'result': "Ok"}

def find_distance(yard_line_1, yard_line_2):

  try:
    base1, number1 = yard_line_1.split(' ')
    base2, number2 = yard_line_2.split(' ')

    number1 = int(number1)
    number2 = int(number2)
    if base1 == base2:
      return abs(number2 - number1)
    else:
      d1 = 50 - number1
      d2 = 50 - number2 
      return abs(d1 + d2) 
  except:
    try:
      base2, number2 = yard_line_2.split(' ')
      number2 = int(number2)
      return number2 - 0
    except:
      return 0

def get_rows(plays, previous_yard_line, play_counter):
  current_yard_line = ""
  ODK = 'O' 
  Hash = 'Right'
  DN = 1
  Distance = 0
  Yard_line = ''
  play_by = 'None'
  play_to = 'None'
  p = 'Play'
  result = ''
  off_form = ''
  def_form = ''
  for d in plays:
      try:
        if str(d.__class__) == "<class 'transcriber.Play_position'>":
          DN = d.down.strip() 
          Distance = d.required_yards.strip()
          if d.yard_line.strip().split(' ')[0] == 'Buffalo':
            Yard_line = '-' +  d.yard_line.strip().split(' ')[1]
          else:
              Yard_line =  d.yard_line.strip().split(' ')[1]
          current_yard_line = d.yard_line.strip()
      except:
        pass
      
      try:
        if str(d.__class__) == "<class 'transcriber.Pass'>":
          p = "Play"
          if d.complete:
            result = "Complete"
          else:
            result = "Incomplete"

          play_by = d.pass_from
          play_to = d.pass_to
      except:
        pass

      try:
        if str(d.__class__) == "<class 'transcriber.Scramble'>":
          p = "Rush"
          result = "Rush"
          play_by = d.qb
          play_to = "None"
      except:
        pass

      try:
        if str(d.__class__) == "<class 'transcriber.Fieldgoal'>":
          if d.result:
            result = "Complete"
          else:
            result = "Incomplete"
          play_by = d.kicker
          play_to = "None"
      except:
        pass

      try:
        if str(d.__class__) == "<class 'transcriber.Warning'>":
          result = "Warning"
      except:
        pass
      
      try:
        if str(d.__class__) == "<class 'transcriber.Touchdown'>":
          result = "Touchdown"
          previous_yard_line = ""
          play_by = d.by
          play_to = d.to
      except:
        pass

      try:
        if str(d.__class__) == "<class 'transcriber.Extrapoint'>":
          result = "Touchdown + Extrapoint"
          previous_yard_line = ""
      except:
        pass

      try:
          if str(d.__class__) == "<class 'transcriber.Forms'>":
              if d.form_type == "OFF":
                  off_form = d.name 
              if d.form_type == "DEF":
                  def_form = d.name
      except:
          pass 
  
  gain = find_distance(previous_yard_line, current_yard_line)
  previous_yard_line = current_yard_line
  row = [play_counter, ODK, DN, Distance, Hash, Yard_line, p, result, gain, play_by, play_to, off_form, def_form]
  play_counter += 1
  return row, previous_yard_line, play_counter

def get_name(number):
  try:
    r = requests.get(f"https://data.mongodb-api.com/app/data-ahunl/endpoint/get_player_name?jersey={number}")
    return r.json()['name']
  except:
    return number

def extract_name(json):
  try:
    return json['timestamp']
  except KeyError:
    return ""

def get_text(game_id):
  if game_id != None:
    r = requests.get(f"https://data.mongodb-api.com/app/data-ahunl/endpoint/get_transcript_data?game_id={game_id}")
    json_object = r.json()
    json_object.sort(key=extract_name)
    sentences = []
    for i in json_object:
      try:
        if 'transcript' in i.keys():
            sentences.append(i['transcript'])
        if 'Transcript' in i.keys():
            sentences.append(i['Transcript'])
      except:
        pass 
    return sentences
  else:
    return game_id

@app.get('/report')
async def generate_report(game_id: str):
    Play = []
    columns = [
    "Play Number",
    "ODK",
    "DN",
    "Distance",
    "Hash",
    "Yard Line",
    "Play Type",
    "Result",
    "GNLS",
    "Play By",
    "Play To",
    "OFF Form",
    "DEF Form"
    ]
    sentences = get_text(game_id=game_id)
    if sentences == []:
      df = pd.DataFrame(data=[], columns=columns)
      return  {
        "result": {
            "statistics": {
                "total_first_down": 0,
                "first_down_efficiency":0,
                "total_second_down":0,
                "second_down_efficiency":0,
                "total_third_down":0,
                "third_down_efficiency":0,
                "total_fourth_down":0,
                "fourth_down_efficiency":0,
                "total_plays":0,
                "n_punts":0,
                "n_touchdowns":0,
                "total_yards":0,
                "passing_yards":0,
                "rushing_yards":0,
                "yards_per_play":0,
            },
            "data":df.to_dict(),
        }
      }
    for sentence in sentences:
        all_lines = sentence.split(",")
        for line in all_lines:
          doc = nlp(line)
          lemmatized_sentence_list = []
          for token in doc:
            lemmatized_sentence_list.append(token.lemma_)
          lemmatized_sentence = " ".join(lemmatized_sentence_list).lower()

          if 'and' in lemmatized_sentence and 'at' in lemmatized_sentence:
            data = line.split('at')
            yard_line = data[1]
            down, required_yards = data[0].split('and')
            position = Play_position(down=down, required_yards=required_yards, yard_line=yard_line)
            Play.append(position)

          if 'pass' in lemmatized_sentence:
            numbers = re.findall(r'\d+', lemmatized_sentence)
            if 'incomplete' in lemmatized_sentence:
              game_pass = Pass(pass_from=numbers[0], pass_to=numbers[1], complete=False)
            else:
              game_pass = Pass(pass_from=numbers[0], pass_to=numbers[1], complete=True)
            Play.append(game_pass)

          if 'out of bound' in lemmatized_sentence:
            numbers = re.findall(r'\d+', lemmatized_sentence)
            player = numbers[0]
            yard_line = lemmatized_sentence.split('at')[1]

            if 'push' in lemmatized_sentence: 
              run = Run(player=player, yard_line=yard_line, result='push out of bounds')
            elif 'run' in lemmatized_sentence:
              run = Run(player=player, yard_line=yard_line, result='run out of bounds')

            Play.append(run)

          if 'warning' in lemmatized_sentence:
            numbers = re.findall(r'\d+', lemmatized_sentence)
            warn = Warning(time=numbers[0])
            Play.append(warn)

          if 'timeout' in lemmatized_sentence:
            numbers = re.findall(r'\d+', lemmatized_sentence)
            by = lemmatized_sentence.split('by')[1]
            timeout = Timeout(number=numbers[0], by=by)
            Play.append(timeout)

          if 'scramble' in lemmatized_sentence:
            numbers = re.findall(r'\d+', lemmatized_sentence)
            yard_line = lemmatized_sentence.split('to')[1]
            scramble = Scramble(qb=numbers[0], yard_line=yard_line)
            Play.append(scramble)

          if 'touchdown' in lemmatized_sentence:
            numbers = re.findall(r'\d+', lemmatized_sentence)
            touchdown = Touchdown(to=numbers[1], by=numbers[0])
            Play.append(touchdown)

          if 'extra point' in lemmatized_sentence:
            numbers = re.findall(r'\d+', lemmatized_sentence)
            if "miss" in lemmatized_sentence:
              extra = Extrapoint(kicker=numbers[0],result=False)
            else:
              extra = Extrapoint(kicker=numbers[0], result=True)
            Play.append(extra)

          if "field goal" in lemmatized_sentence:
            numbers = re.findall(r'\d+', lemmatized_sentence)
            if "miss" in lemmatized_sentence:
              fieldgoal = Fieldgoal(kicker=numbers[0],result=False)
            else:
              fieldgoal = Fieldgoal(kicker=numbers[0], result=True)
            Play.append(fieldgoal)

          if 'interception' in lemmatized_sentence:
            numbers = re.findall(r'\d+', lemmatized_sentence)
            interception = Interception(qb=numbers[0], to=numbers[1], by=numbers[2])
            Play.append(interception)

          if 'punt' in lemmatized_sentence:
            numbers = re.findall(r'\d+', lemmatized_sentence)
            final_yard_line = lemmatized_sentence.split('to')
            punt = Punt(by=numbers[0], final_yard_line=final_yard_line[1])
            Play.append(punt)

          for i in Playbook['OFF']:
              if i.lower() in lemmatized_sentence.lower():
                  form = Forms(name=i, form_type='OFF')
                  Play.append(form)

          for i in Playbook['DEF']:
              if i.lower() in lemmatized_sentence.lower():
                  form = Forms(name=i, form_type='OFF')
                  Play.append(form)
    play_counter = 1
    tmp_data = []
    data = []
    previous_yard_line = ""
    for play in Play:
      if str(play.__class__) == "<class 'transcriber.Play_position'>":
        if tmp_data:
          row, previous_yard_line, play_counter = get_rows(tmp_data, previous_yard_line, play_counter)
          data.append(row)
        tmp_data = []
      tmp_data.append(play)
    row, _, _ = get_rows(tmp_data, previous_yard_line, play_counter)
    data.append(row)

    df = pd.DataFrame(data=data, columns=columns)
    df['Play By'] = df['Play By'].apply(get_name)
    df['Play To'] = df['Play To'].apply(get_name)
    # First Downs 
    first_downs_data = df.loc[df['DN'] == '1st']
    if len(first_downs_data):
      total_first_down = len(first_downs_data)
      first_down_efficiency =  (total_first_down - len(first_downs_data.loc[first_downs_data['Result'] == 'Incomplete'])) /  total_first_down
    else:
      total_first_down = 0
      first_down_efficiency = 0
    # 2nd Down efficiency
    second_downs_data = df.loc[df['DN'] == '2nd']
    if len(second_downs_data):
      total_second_down = len(second_downs_data)
      second_down_efficiency =  (total_second_down - len(second_downs_data.loc[second_downs_data['Result'] == 'Incomplete'])) / total_second_down
    else:
      total_second_down = 0
      second_down_efficiency = 0
    # 3rd Down efficiency 
    third_downs_data = df.loc[df['DN'] == '3rd']
    if len(third_downs_data):
      total_third_down = len(third_downs_data)
      third_down_efficiency =  (total_third_down - len(third_downs_data.loc[third_downs_data['Result'] == 'Incomplete'])) /  total_third_down
    else:
      total_third_down = 0
      third_down_efficiency = 0
    # 4th Down efficienty 
    fourth_downs_data = df.loc[df['DN'] == '4th']
    if len(fourth_downs_data):
      total_fourth_down = len(fourth_downs_data)
      fourth_down_efficiency =  (total_fourth_down - len(fourth_downs_data.loc[fourth_downs_data['Result'] == 'Incomplete'])) /  total_fourth_down
    else:
      total_fourth_down = 0
      fourth_down_efficiency = 0
    # Total plays
    total_plays = len(df)
    # Punts 
    n_punts = len(df.loc[df['Result']=='Punt'])
    # Touchdowns
    n_touchdowns = len(df.loc[df['Result']=='Touchdown'])
    n_touchdowns += len(df.loc[df['Result']=='Touchdown + Extrapoint'])
    # Total yards
    total_yards = sum(df['GNLS']) 
    # Passing yards
    passing_yards = sum(df.loc[df['Play Type']=='Play']['GNLS']) 
    # Rusing yards 
    rushing_yards = sum(df.loc[df['Play Type']=='Rush']['GNLS']) 
    # Yards per play 
    yards_per_play = total_yards / total_plays 
    
    return  {
    "result": {
        "statistics": {
            "total_first_down": total_first_down,
            "first_down_efficiency":first_down_efficiency,
            "total_second_down":total_second_down,
            "second_down_efficiency":second_down_efficiency,
            "total_third_down":total_third_down,
            "third_down_efficiency":third_down_efficiency,
            "total_fourth_down":total_fourth_down,
            "fourth_down_efficiency":fourth_down_efficiency,
            "total_plays":total_plays,
            "n_punts":n_punts,
            "n_touchdowns":n_touchdowns,
            "total_yards":total_yards,
            "passing_yards":passing_yards,
            "rushing_yards":rushing_yards,
            "yards_per_play":yards_per_play
        },
        "data":df.to_dict(),
    }
 }


def post_highlights(sentence):
  print("Highlighting sentence: ", sentence)

  # Check sentence already exists in highligts
  for team in collection.find({
    "name":"Buffalo Bills"}):
    for highlight in team['highlights']:
        if sentence == highlight['highlightText']:
            return True

  messages = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
          {"role": "system", "content": "You are a nfl football coach assistant."},
          {"role": "user", "content": f"{sentence}"},
          {"role": "assistant", "content": "Extact the following information to be used for adding to mongo collection playerName, sentiment must be either ['positive', 'negative','neutral'] without explaination , rating between 1 to 10 without explaination , impact between 1 to 10 without explaination"},
      ]
  )
  data = messages['choices'][0]['message']['content'].split("\n")
  # Remove all empty strings
  data = list(filter(None, data))
  added = {}
  print(data)
  if "Sorry" in data:
      return True
  try:
    for item in data:
        key = item.split(':')[0].strip()
        if key == 'playerName':
          value = item.split(':')[1].strip()
          if '#' in value:
            value = get_name(value.split('#')[0])
          added[key] = get_name(value.lower())
        else:
            value = item.split(':')[1]
            added[key] = value.lower()
  except:
    return True
  
  added['gameid'] = "2023-03-17-BUF-PIT"
  added['timestamp'] = f"00:{random.randint(1,60)}"
  added['highlightText'] = sentence
  added['highlightVideo'] = 'https://www.example.com/highlight1.mp4'
  added['commentRole'] = 'ATT'
  added['commentBy'] = 'Parth Sonkhia'

  # Update collection with new highlight
  collection.update_one(
    {"name":"Buffalo Bills"},
    {"$push": {"highlights": added}}
  )


  return True 

