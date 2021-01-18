from flask import Flask, request
from pymongo import MongoClient
from datetime import date
import sys

app = Flask(__name__)

DbClient = MongoClient("mongodb://localhost:27017/")
Database = DbClient["chatApp"]
UsersCollection = Database["users"]
ChatCollection = Database["chats"]
CountersCollection = Database["counters"]
MessagesCollection = Database["messages"]


def increase_counter(counter_name):
    counter_query = {"counter_name": counter_name}
    actual_counter_value = CountersCollection.find_one(counter_query)
    new_counter_value = actual_counter_value["counter_value"] + 1
    CountersCollection.update_one(
        counter_query, {"$set": {"counter_value": new_counter_value}})
    return new_counter_value


@app.before_request
def before_request():
    for chat in ChatCollection.find():
        found_user = False
        for user in UsersCollection.find():
            if user["_id"] in chat["members_ids"] and user["status"]:
                found_user = True
        if found_user:
            ChatCollection.update_one({"_id": chat['_id']}, {"$set": {"status": True}})
        else:
            ChatCollection.update_one({"_id": chat['_id']}, {"$set": {"status": False}})


@app.route("/register", methods=['POST'])
def register():
    data = request.json
    print(data, file=sys.stdout)
    if ("@" in data["mail"] or data["mail"] == "admin") and len(data["mail"]) >= 5 and (
            len(data["password"]) >= 8 or data["password"] == "admin") and len(
        data["name"]) > 0 and int(data["privilege_level"]) > 0:
        new_user = {"_id": increase_counter("users"), "email": data["mail"], "password": data["password"],
                    "name": data["name"],
                    "nickname": data['nickname'],
                    "image_link": data['image_link'], "friends_ids": [],
                    "privilege_level": data['privilege_level'],
                    "create_date": date.today().strftime("%d/%m/%Y"),
                    "status": False}
        UsersCollection.insert_one(new_user)
        return {"res": True}
    else:
        return {"res": False}


@app.route("/login", methods=['POST'])
def login():
    data = request.json
    query = {'email': data['mail'], "password": data['password']}

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


@app.route("/user_info", methods=['POST'])
def user_info():
    data = request.json
    return UsersCollection.find_one({"_id": data['id']})


@app.route("/chat_info", methods=['POST'])
def chat_info():
    data = request.json
    return ChatCollection.find_one({'_id': data['id']})


@app.route("/friends_info", methods=['POST'])
def friends_info():
    data = request.json
    res = []
    for id in data['ids']:
        user = UsersCollection.find_one({"_id": id})
        if user:
            res.append({"id": user['_id'], "img_link": user["image_link"], "name": user["name"],
                        "status": user['status']})

    return {'list': sorted(res, key=lambda friend: friend['status'], reverse=True)}


@app.route("/status_change", methods=['POST'])
def status_change():
    data = request.json
    app.logger.info(f"stat change for: {data}")
    if data:
        query = {'_id': data['id']}
        user = UsersCollection.find_one(query)
        user_status = user["status"]
        UsersCollection.update_one({"_id": data['id']}, {"$set": {"status": not user_status}})
        return "git"
    return "nie git"


@app.route("/chats", methods=["POST"])
def chats():
    data = request.json
    user_id = data['id']
    res = []
    for chat in ChatCollection.find():
        if user_id in chat['members_ids']:
            res.append({'id': 1, 'name': chat['name'], 'img_link': chat['img_link'], "status": chat['status']})
    # "id": chat['_id'],
    return {'list': sorted(res, key=lambda elem: elem['status'], reverse=True)}


@app.route("/messages", methods=['POST'])
def messages():
    data = request.json
    query = {'message_group_id': data['group_id']}
    message = MessagesCollection.find(query)


@app.route("/search_user", methods=['POST'])
def search_user():
    data = request.json
    text = data['text']
    res = []
    similar_users = UsersCollection.find({'name': {'$regex': text}})
    for user in similar_users:
        res.append({"id": user['_id'], "img_link": user["image_link"], "name": user["name"],
                    "status": user['status']})
    return {'list': res}


@app.route("/add_friend", methods=['POST'])
def add_friend():
    data = request.json
    logged_user = UsersCollection.find_one({'_id': data['loggedUserId']})
    selected_user = UsersCollection.find_one({'_id': data['selectedUserId']})
    error = False
    msg = "nothing"
    if selected_user['_id'] not in logged_user['friends_ids']:
        ids = logged_user['friends_ids']
        ids.append(selected_user['_id'])
        UsersCollection.update_one({'_id': logged_user['_id']}, {"$set": {'friends_ids': ids}})
    else:
        error = True
        msg = "error on logged"
    if logged_user['_id'] not in selected_user['friends_ids']:
        ids = selected_user['friends_ids']
        ids.append(logged_user['_id'])
        UsersCollection.update_one({'_id': selected_user['_id']}, {"$set": {'friends_ids': ids}})
    else:
        error = True
        msg = "error on friend"

    return {'error': error, "msg": msg}


app.run(debug=True)
"""
users:s
  user_id, user_email, user_password, user_name, user_nickname, user_image_link, user_friends: [friends_id], user_chat_id: [chat_id], user_privilege_level
chats:
  chat_id, chat_name, chat_members_id: [user_id], chat_img_link, chat_create_date, chat_status(if any member of chat is active, then true, else false)
messages:
  message_id, message_sender_id, message_group_id, message_text, message_type, message_img_link, message_send_date, message_send_time
counters:
  counter_id, counter_name, counter_value

"""
