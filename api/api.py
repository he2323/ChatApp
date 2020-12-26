import time
from flask import Flask
import mysql.connector

app = Flask(__name__)


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



app.run()
