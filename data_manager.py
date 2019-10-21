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