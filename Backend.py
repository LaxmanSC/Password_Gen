import psycopg2 as psy
from flask import Flask, request, render_template

app = Flask("My App")

@app.route("/")

def home():
    return render_template("index.html")

@app.route("/show", methods=['POST','GET'])
def display():
    if request.method == 'POST':
        if request.form['show'] == 'clicked':
            dbconn = psy.connect("dbname=mydb")
            cursor = dbconn.cursor()
            cursor.execute("select * from kzhh")
            ret =[]
            for i, pa, pl in cursor.fetchall():
                item = f"{i}     {pa}      {pl}"
                ret.append(item)
            return render_template("display.html", ret=ret)

@app.route("/save", methods=['POST','GET'])
def save():
    if request.method == 'POST':
        if request.form['save'] == 'clicked':
            pasw = request.form.get("pass")
            plat = request.form.get("plat")
            dbconn = psy.connect("dbname=mydb")
            cursor = dbconn.cursor()
            cursor.execute("INSERT INTO kzhh (dliw, kozgulin) VALUES (%s, %s)",(pasw, plat))
            dbconn.commit()
            cursor.close()
            dbconn.close()
            return render_template("index.html", pasw=pasw,plat=plat)
            
