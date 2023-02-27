from flask import Flask, request
import json
import pandas as pd

def parse(file):
    f = open ("storage.json", "r")
    var = json.loads(f.read())
    kahoot_name = str(file).split(".xlsx")[0].split('<FileStorage: \'')[1]
    df = pd.read_excel(file, sheet_name='Final Scores')
    vals = df.iloc[2:,[1,2]].values
    scores = {}
    for val in vals:
        scores[val[0]] = val[1] 
    print(scores)
    var.append({'kahoot':kahoot_name,'results':scores})
    with open("storage.json", "w") as newfile:
        newfile.write(json.dumps(var))
    return var