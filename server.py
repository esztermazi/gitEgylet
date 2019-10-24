from flask import Flask, render_template, request, url_for, session, redirect
import data_manager
import util

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xed]/'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/main-menu')
def main_menu():
    return render_template('main_menu.html')


@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        username = request.form['user-name']
        is_valid_username = data_manager.validate_new_username(username)
        if not is_valid_username:
            error = 'Username is not valid, please choose another!'
            return render_template('index.html', message=error)
        else:
            password = request.form['password']
            conf_password = request.form['conf-password']
            is_valid_password = util.validate_password(password, conf_password)
            if not is_valid_password:
                error = 'Password is not valid, please choose another!'
                return render_template('index.html', message=error)
            else:
                hash = util.hash_password(password)
                data_manager.register_user(username, hash)
                message = f'Successful registration as {username}'
                return render_template('index.html', message=message)
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['to-login-user-name']
        password = request.form['to-login-password']
        alert_message = 'Invalid user name or password!'
        if not data_manager.check_username(username):
            return render_template('index.html', login_message=alert_message)
        hashed_password = data_manager.get_hashed_password(username)
        if not util.verify_password(password, hashed_password):
            return render_template('index.html', login_message=alert_message)
        session['username'] = username
        session['user_id'] = data_manager.get_user_id_by_username(username)
        return redirect(url_for('main_menu'))
    return render_template('index.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


#@app.route('/insert-scores')
#def insert_scores():
    #username =
    #return render_template('game.html')


@app.route('/game')
def start_game():
    return render_template('game.html')


@app.route('/high-score')
def high_score():
    return render_template('scores.html')


if __name__ == '__main__':
    app.run(debug=True)
