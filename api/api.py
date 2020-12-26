import time
from flask import Flask
import mysql.connector

app = Flask(__name__)
value = 2


def connection_test():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password=""
    )


@app.route('/dbTest')
def dbTest():
    myDb = connection_test()
    mycursor = myDb.cursor()
    mycursor.execute("CREATE DATABASE dbTestPython")
    return 'OK'


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/getCounter')
def get_counter():
    return {'counter': value}


@app.route('/increaseCounter')
def increase_counter():
    global value
    value += 1
    return 'ok'


@app.route('/decreaseCounter')
def decrease_counter():
    global value
    value -= 1
    return 'ok'


app.run()
