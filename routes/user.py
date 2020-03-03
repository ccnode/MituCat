from flask import render_template,jsonify,Blueprint,request,session,redirect,url_for,flash
from api.tools.front_dbtools import DB
import os
from werkzeug.security import generate_password_hash,check_password_hash
import json
db = DB()
user = Blueprint('user',__name__)


# 注册跳转至登录
@user.route("/login_page")
def login_page():
    return render_template("user/login.html")

# 登录跳转至注册
@user.route("/register_page")
def register_page():
    return render_template("user/register.html")

# 接受登录数据
@user.route('/login_page', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username=="" or password=="":
            flash("用户名或者密码不能为空~","err")
            return redirect(url_for("user.login_page"))
        if len(username)>8 or len(password)>8:
            flash("用户名密码不能大于8位~","err")
            return redirect(url_for("user.login_page"))
        # 验证数据库
        res = db.query("select * from user_info "
                       "where login_name='" + str(username) + "' and user_pwd='" + str(password) + "'")
        if res:
            session["username"] = username
            session['user_id'] = res[0][0]
            session['is_freeze'] = res[0][3]
            session['is_admin'] = res[0][4]
            session.permanent = True
            # return render_template("index.html")
            flash("登录成功!", "ok")
            return redirect(url_for("index"))
    flash("用户名或者密码错误~", "err")
    return redirect(url_for("user.login_page"))

# 接受注册数据
@user.route('/register_page', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username=="" or password=="":
            flash("用户名或者密码不能为空~","err")
            return redirect(url_for("user.register_page"))
        if len(username)>8 or len(password)>8:
            flash("用户名或密码不能大于8位~","err")
            return redirect(url_for("user.register_page"))

        # 验证是否重复
        res = db.query("select * from user_info "
                       "where login_name='"+str(username)+"'")
        if res:
            flash("已有人注册!", "err")
            return redirect(url_for("user.register_page"))
        # 没重复录入数据库
        res = db.commit("insert into user_info(login_name,user_pwd) values('"+str(username)+"','"+str(password)+"') ")
        # 注册成功跳转到登录页面
        flash("注册成功！","ok")
        return redirect(url_for("user.login_page"))

    return redirect(url_for("user.register_page"))

# 用户注销
@user.route('/exit',methods=['GET', 'POST'])
def exit():
    session.clear()
    return redirect(url_for('user.login_page'))
