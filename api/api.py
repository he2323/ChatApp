from flask import Flask, request

app = Flask(__name__)



@app.route("/login/<string:mail>/<string:password>")
def login(mail, password):
    if len(mail) < 3 or len(password) < 8:
        return {"err": True}
    else:
        return{"mail": mail, "pass": password, "err": False}


app.run()
