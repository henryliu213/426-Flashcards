import pymysql
db = pymysql.connect(
    host = 'localhost',
    user = 'root',
    password = 'dr4g0n123!')
cursor = db.cursor()



cursor.execute("Drop database flashcards")
# cursor.execute("Show databases")
# clist = [i for i in cursor.fetchall()] 
# print(clist)

cursor.execute("CREATE DATABASE if not exists flashcards ")
cursor.execute("Show databases")
clist = [i for i in cursor.fetchall()] 
print(clist)
