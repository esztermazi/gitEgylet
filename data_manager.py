import database_common
from psycopg2 import sql
import util

@database_common.connection_handler
def register_user(cursor, user_name, hash):
    date = util.get_time()
    cursor.execute("""
                    INSERT INTO users(user_name, user_password, registration_date)
                    VALUES (%(user_name)s, %(hash)s, %(date)s)
                        """,
                   {'user_name': user_name, 'hash': hash, 'date': date})


@database_common.connection_handler
def validate_new_username(cursor, user_name):
    cursor.execute("""
                    SELECT user_name 
                    FROM users
                    WHERE user_name = %(user_name)s
                    """,
                   {'user_name': user_name})
    result = cursor.fetchone()
    if result == None:
        return True
    return False


@database_common.connection_handler
def check_username(cursor, username):
    cursor.execute("""
                    SELECT user_name FROM users WHERE users.user_name = %(username)s
                    """,
                   {'username': username})
    result = cursor.fetchone()
    if result is None:
        return None
    else:
        name = result['user_name'] == username
        return name


@database_common.connection_handler
def get_hashed_password(cursor, username):
    cursor.execute("""
                    SELECT user_password FROM users WHERE users.user_name = %(username)s
                    """,
                   {'username': username})
    result = cursor.fetchone()
    if result is None:
        return None
    else:
        password = result['user_password']
        return password


@database_common.connection_handler
def get_user_id_by_username(cursor, username):
    cursor.execute("""
                    SELECT users.id
                    FROM users
                    WHERE user_name = %(username)s
                    """,
                   {'username': username})
    user_id = cursor.fetchone()
    return user_id['id']

@database_common.connection_handler
def add_score_by_user_id(cursor, user_id, score):
    cursor.execute("""
                        INSERT INTO scores(user_id, score)
                        VALUES (%(user_id)s, %(score)s)
                            """,
                   {'user_id': user_id, 'score': score})


@database_common.connection_handler
def get_all_users_with_scores(cursor):
    cursor.execute("""
                    SELECT score, user_name from scores
                    JOIN users u on scores.user_id = u.id
                    ORDER BY score DESC
                    """)
    users = cursor.fetchall()
    return users