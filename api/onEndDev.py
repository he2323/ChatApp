from pymongo import MongoClient

DbClient = MongoClient("mongodb://localhost:27017/")
Database = DbClient["chatApp"]
UsersCollection = Database["users"]


def set_all_status_to_false():
    UsersCollection.update_many({}, {'$set': {'status': False}})


set_all_status_to_false()
