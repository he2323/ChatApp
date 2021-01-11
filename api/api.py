from flask import Flask, request
from pymongo import MongoClient
from datetime import date
import sys

app = Flask(__name__)

DbClient = MongoClient("mongodb://localhost:27017/")
Database = DbClient["chatApp"]
UsersCollection = Database["users"]
GroupsCollection = Database["groups"]
CountersCollection = Database["counters"]
MessagesCollection = Database["messages"]


def increaseCounter(counter_name):
    counter_query = {"counter_name": counter_name}
    actual_counter_value = CountersCollection.find_one(counter_query)
    new_counter_value = actual_counter_value["counter_value"] + 1
    CountersCollection.update_one(
        counter_query, {"$set": {"counter_value": new_counter_value}})
    return new_counter_value


@app.before_request
def before_request():
    every_user_id = []
    for i in UsersCollection.find():
        every_user_id.append(i["_id"])
    UsersCollection.update_one({"user_name": "admin"}, {"$set": {"user_friends_ids": every_user_id}})


@app.route("/register", methods=['POST'])
def register():
    data = request.json
    print(data, file=sys.stdout)
    if ("@" in data["mail"] or data["mail"] == "admin") and len(data["mail"]) >= 5 and (
            len(data["password"]) >= 8 or data["password"] == "admin") and len(
        data["name"]) > 0 and int(data["privilege_level"]) > 0:
        new_user = {"_id": increaseCounter("users"), "user_email": data["mail"], "user_password": data["password"],
                    "user_name": data["name"],
                    "user_nickname": data['nickname'],
                    "user_image_link": data['image_link'], "user_friends_ids": [], "user_groups_ids": [],
                    "user_privilege_level": data['privilege_level'],
                    "user_create_date": date.today().strftime("%d/%m/%Y"),
                    "status": False}
        UsersCollection.insert_one(new_user)
        return {"res": True}
    else:
        return {"res": False}


@app.route("/login", methods=['POST'])
def login():
    data = request.json
    query = {'user_email': data['mail'], "user_password": data['password']}

    user = UsersCollection.find_one(query)

    if user:
        user["err"] = False
        return user
    else:
        return {"err": True}


@app.route("/deleteUser", methods=['POST'])
def delete_user():
    data = request.json
    UsersCollection.delete_one({"_id": data['id']})
    return {"status": "git"}


@app.route("/user_info/<int:user_id>")
def user_info(user_id):
    return UsersCollection.find_one({"_id": user_id})


@app.route("/friend_info/<int:user_id>")
def friend_info(user_id):
    user = UsersCollection.find_one({"_id": user_id})
    res = {"image_link": user["user_image_link"], "name": user["user_name"]}
    return res


@app.route("/status_change/<int:user_id>")
def status_change(user_id):
    query = {'_id': user_id}
    user = UsersCollection.find_one(query)
    user_status = user["status"]
    UsersCollection.update_one({"_id": user_id}, {"$set": {"status": not user_status}})
    return "git"


app.run(debug=True)
"""
users:s
  user_id, user_email, user_password, user_name, user_nickname, user_image_link, user_friends: [friends_id], user_groups_id: [group_id], user_privilege_level
groups:
  group_id, group_name, group_members_id: [user_id]
messages:
  message_id, message_sender_id, message_group_id, message_text, message_type, message_img_link, message_send_date,
counters:
  counter_id, counter_name, counter_value

"""
