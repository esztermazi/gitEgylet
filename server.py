from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game')
def start_game():
    return render_template('game.html')


@app.route('/high-score')
def high_score():
    return render_template('scores.html')



if __name__ == '__main__':
    app.run(debug=True)