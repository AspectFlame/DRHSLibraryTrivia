from flask import Flask, request
from flask import render_template
from flask import request
from flask import jsonify
import json
import ExcelParse


app = Flask(__name__)

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    if request.method == 'OPTIONS':
        
        response.headers['Access-Control-Allow-Methods'] = 'DELETE, GET, POST, PUT'
        headers = request.headers.get('Access-Control-Request-Headers')
        if headers:
            response.headers['Access-Control-Allow-Headers'] = headers
    return response
app.after_request(add_cors_headers)


@app.route('/', methods=["POST", "GET"])
def index():
    return render_template("index.html")

@app.route('/heartbeat', methods=["POST", "GET"])
def heartbeat():
    return 'hello'

@app.route('/api/onLoad', methods=["POST","GET"])
def onPageLoad():
    f = open ("storage.json", "r")
    var = json.loads(f.read())
    return jsonify(var)
 
@app.route('/api/leaderboard', methods=["POST","GET"])
def showLeaderboard():
    with open("storage.json", "r") as f:
        data = json.loads(f.read())    
    scores = {}
    
    for d in data:
        name_scores = d["results"]
        for name, score in name_scores.items():
            if name in scores:
                scores[name] += score
            else:
                scores[name] = score    
    sorted_scores = {k: v for k, v in sorted(scores.items(), key=lambda item: item[1], reverse=True)}
    return sorted_scores

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # TODO: Check if the username and password are correct
    if username == 'harrellnumone' and password == 'harrelldagoat':
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})


@app.route('/api/upload', methods=["POST", "GET"])
def parseExcel():
    file = request.files.get('file')
    if file:
        return jsonify(ExcelParse.parse(file))
    else:
        return jsonify({"error": "File not found"})


if __name__ == '__main__':
    app.run(port=5001)
