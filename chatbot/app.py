from src.model import model
from flask import Flask, request , jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def get():
    return {
        'message':'App is running',
        'status':200
    }

@app.route('/ask',methods=['POST'])
def ask():
    data = request.get_json()
    user_input = data['query']
    task_info = data['task_info']
    answer = model.invoke({
        'input':user_input,
        'task_info':task_info
    })
    print(user_input)
    print(answer.content)
    return jsonify({'res':answer.content,'status':200})

if __name__ == "__main__":
    app.run()