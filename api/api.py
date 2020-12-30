from flask import Flask
from pymongo import MongoClient
import sys
from bson import json_util
import json


app = Flask(__name__)

DbClient = MongoClient("mongodb://localhost:27017/")
Database = DbClient["chatApp"]
UsersCollection = Database["users"]
GroupsCollection = Database["groups"]
CountersCollection = Database["counters"]
MessagesCollection = Database["messages"]


def increaseCounter(counter_name):
    counter_quary = {"counter_name": counter_name}
    actual_counter_value = CountersCollection.find_one(counter_quary)
    new_counter_value = actual_counter_value["counter_value"] + 1
    CountersCollection.update_one(
        counter_quary, {"$set": {"counter_value": new_counter_value}})
    return new_counter_value


@app.route("/register/<string:mail>/<string:password>/<string:name>/<string:nickname>/<string:image_link>/<int:user_privilege_level>", methods=["POST"])
def register(mail, password, name, nickname, image_link, user_privilege_level):

    if ("@" in mail or mail == "admin") and len(mail) >= 5 and (len(password) >= 8 or password == "admin") and len(name) > 0 and int(user_privilege_level) > 0:
        new_user = {"_id": increaseCounter("users"), "user_email": mail, "user_password": password, "user_name": name, "user_nickname": nickname,
                    "user_image_link": image_link, "user_friends_ids": [], "user_groups_ids": [], "user_privilege_level": user_privilege_level}
        UsersCollection.insert_one(new_user)
        return {"res": True}
    else:
        return {"res": False}


@app.route("/login/<string:mail>/<string:password>", methods=["POST"])
def login(mail, password):
    query = {'user_email': mail, "user_password": password}
    user = UsersCollection.find_one(query)
    res = {'err': False}

    if user:
        res.update(user)
        if res["user_email"] == "admin":
            for i in UsersCollection.find():
                user["user_friends_ids"].append(i["_id"])

        return res
    else:
        return {"err": True}


app.run(debug=True)
"""
users:
  user_id, user_email, user_password, user_name, user_nickname, user_image_link, user_friends: [friends_id], user_groups_id: [group_id], user_privilege_level
groups:
  group_id, group_name, group_members_id: [user_id]
messages:
  message_id, message_sender_id, message_group_id, message_text, message_type, message_img_link, message_send_date,
counters:
  counter_id, counter_name, counter_value

"""
