from flask import Flask, render_template, request, redirect, session, flash

from mysqlconnection import connectToMySQL

from flask_bcrypt import Bcrypt     

import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 

app = Flask(__name__)
app.secret_key ="beat_navy"
bcrypt = Bcrypt(app) 

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/loginregister")
def login_register_main():
    return render_template("login.html")

@app.route("/register", methods=["POST"])
def register_user():
    is_valid = True
    if len(request.form['first_name']) < 2:
        is_valid = False
        flash("First Name must be at least 2 characters long")
    if len(request.form['last_name']) < 2:
        is_valid = False
        flash("Last Name must be at least 2 characters long")
    if len(request.form['password']) < 8:
        is_valid = False
        flash("Password must be at least 8 characters long")
    if request.form['c_password'] != request.form['password']:
        is_valid = False
        flash("Passwords do not match")
    if not EMAIL_REGEX.match(request.form['email']):
        is_valid = False
        flash("Please use valid email")

    if is_valid: # passes all validations and moves user to next screen
        # Create a connection to the db
        mysql = connectToMySQL('thoughts')
        # Build my query
        query = "INSERT into users (fname, lname, email, password, created_at, updated_at) VALUES (%(fn)s, %(ln)s, %(email)s, %(pass)s, NOW(), NOW());"
        # Pass Relevant Data
        data = {
            'fn':request.form['first_name'],
            'ln':request.form['last_name'],
            'email':request.form['email'],
            'pass': bcrypt.generate_password_hash(request.form['password'])
        }
        # Commit to  query
        user_id = mysql.query_db(query, data)
        session['user_id'] = user_id

        return redirect("/farms")
    else: # does not pass validations and shows users the errors
        return redirect("/loginregister")

    return redirect("/loginregister")
    
@app.route("/login", methods=["POST"])
def login_user():
    #2. Create a route that the form form step one will post to and then validate, check with db 
    is_valid = True
    if len(request.form['email']) < 2:
        is_valid = False
        flash("Please use a valid email")
    if len(request.form['password']) < 8:
        is_valid = False
        flash("Password enter your password")

    if not is_valid: # users goes back to put in relevant data and shows users the errors
        return redirect("/")
    else: # does pass validations and checks the data base
        # Create a connection to the db
        mysql = connectToMySQL('thoughts')
        # Build my query to see if the email exists
        query = "SELECT * FROM users WHERE users.email = %(email)s"
        data = {
            'email': request.form['email']
        }
        user = mysql.query_db(query, data)
        if user:
            hashed_password = user[0]['password']
            if bcrypt.check_password_hash(hashed_password, request.form['password']):
                session['user_id'] = user[0]['id']
                return redirect("/farms")
            else:
                flash("Password invalid")
                return redirect("/loginregister")

        else:
            flash("Please use a valid email address")
            return redirect("/loginregister")
        return redirect("/loginregister")

    return redirect("/loginregister")

@app.route("/logout")
def logout_user():
    session.clear()
    return redirect("/")

@app.route("/farms")
def farms_landing():
    if 'user_id' not in session:
        return redirect("/")

    mysql = connectToMySQL('thoughts')
    query = "SELECT * FROM users WHERE users.id = %(id)s"
    data = {
        'id': session['user_id']
    }
    user = mysql.query_db(query, data)

    mysql = connectToMySQL('thoughts')
    query = "SELECT * FROM farms WHERE farms.user_id = %(id)s"
    data = {
        'id': session['user_id']
    }
    farm = mysql.query_db(query, data)

    mysql = connectToMySQL('thoughts')
    query = "SELECT count(idfarms) as fields, sum(acres) as total_acres, sum(land_value) as total_value, sum(revenue) as total_revenue, sum(expenses) as total_expenses, sum(cash_flow) as yearly_FCF, sum(land_value+cash_flow) as year_end_value FROM farms WHERE farms.user_id = %(id)s"
    data = {
        'id': session['user_id']
    }
    farm_values = mysql.query_db(query, data)

    return render_template("farms.html",user=user[0], farm=farm, farm_values = farm_values[0])

@app.route("/post_farm", methods=["POST"])
def post_farm():
    
    is_valid = True
    if len(request.form['location']) < 3:
        is_valid = False
        flash('Thought must be at least 3 characters')
    if len(request.form['location']) >= 46:
        is_valid = False
        flash('Thought cannot be more than 45 characters')
    
    if is_valid:
        mysql = connectToMySQL('thoughts')
        query = "INSERT into farms (user_id, location, acres, price_per_acre, land_value, crop, crop_price, crop_yield, revenue, expenses, cash_flow, comments, created_at, updated_at) VALUES (%(uid)s, %(loc)s, %(acre)s, %(ppa)s, %(lv)s, %(crop)s, %(crpr)s, %(cryd)s, %(rev)s, %(exp)s, %(csfl)s, %(cmt)s, NOW(), NOW());"
        data = {
            'uid': session['user_id'],
            'loc': request.form['location'],
            'acre': request.form['acres'],
            'ppa': request.form['acre_value'],
            'lv': float(request.form['acre_value'])*float(request.form['acres']),
            'crop': request.form['crop'],
            'crpr': request.form['crop_price'],
            'cryd': request.form['crop_yield'],
            'rev': float(request.form['crop_price'])*float(request.form['crop_yield'])*float(request.form['acres']),
            'exp': request.form['expenses'],
            'csfl': float(request.form['crop_price'])*float(request.form['crop_yield'])*float(request.form['acres'])-float(request.form['expenses']),
            'cmt':request.form['comments']        
        }
        farm_id = mysql.query_db(query, data)
        print(farm_id)

    return redirect("/farms")

@app.route("/edit/<m_id>")
def edit_field(m_id):

    mysql = connectToMySQL('thoughts')
    query = "SELECT * FROM users WHERE users.id = %(id)s"
    data = {
        'id': session['user_id']
    }
    user = mysql.query_db(query, data)

    mysql = connectToMySQL('thoughts')
    query = "SELECT * FROM farms WHERE idfarms = %(mid)s"
    data = {
        'mid': m_id
    }
    farm = mysql.query_db(query, data)

    return render_template("edit.html", user=user[0], farm=farm)

@app.route("/deletefield/<m_id>")
def delete_field(m_id):
    
    mysql = connectToMySQL('thoughts')
    query = "DELETE FROM farms WHERE idfarms = %(mid)s;"
    data = {
        'mid': m_id
    }
    mysql.query_db(query, data)

    return redirect("/farms")

@app.route("/update/<m_id>", methods=["POST"])
def update_field(m_id):
    
    mysql = connectToMySQL('thoughts')
    query = "UPDATE farms SET location = %(loc)s, acres = %(acre)s, price_per_acre = %(ppa)s, land_value = %(lv)s, crop = %(crop)s, crop_price = %(crpr)s, crop_yield = %(cryd)s, revenue = %(rev)s, expenses = %(exp)s, cash_flow = %(csfl)s, comments = %(cmt)s, created_at = NOW(), updated_at = NOW() WHERE idfarms = %(mid)s;"
    data = {
        'mid': m_id,
        'loc': request.form['location'],
        'acre': request.form['acres'],
        'ppa': request.form['acre_value'],
        'lv': float(request.form['acre_value'])*float(request.form['acres']),
        'crop': request.form['crop'],
        'crpr': request.form['crop_price'],
        'cryd': request.form['crop_yield'],
        'rev': float(request.form['crop_price'])*float(request.form['crop_yield'])*float(request.form['acres']),
        'exp': request.form['expenses'],
        'csfl': float(request.form['crop_price'])*float(request.form['crop_yield'])*float(request.form['acres'])-float(request.form['expenses']),
        'cmt':request.form['comments']        
    }
    update = mysql.query_db(query, data)
    print(update)

    return redirect("/farms")

@app.route("/thoughts")
def thoughts_landing():
    if 'user_id' not in session:
        return redirect("/")

    mysql = connectToMySQL('thoughts')
    query = "SELECT * FROM users WHERE users.id = %(id)s"
    data = {
        'id': session['user_id']
    }
    user = mysql.query_db(query, data)

    mysql = connectToMySQL('thoughts')
    query = "SELECT * FROM users"
    users = mysql.query_db(query)

    mysql = connectToMySQL('thoughts')
    query = "SELECT *, count(thoughts_id) as likes FROM thoughts JOIN users ON thoughts.user_id = users.id LEFT JOIN users_likes_thoughts ON thoughts.idthoughts = users_likes_thoughts.thoughts_id GROUP BY thoughts.idthoughts"
    thoughts = mysql.query_db(query)

    mysql = connectToMySQL('thoughts')
    query = "SELECT * FROM users_likes_thoughts WHERE users_id = %(id)s"
    data = {
        'id': session['user_id']
    }
    is_liked = mysql.query_db(query, data)
    print(is_liked)

    liked_thoughts = []
    for liked in is_liked:
        liked_thoughts.append(liked['thoughts_id'])

    print(liked_thoughts)
    return render_template("thoughts.html",user=user[0], users=users, thoughts=thoughts, liked_thoughts=liked_thoughts)

@app.route("/post_thoughts", methods=["POST"])
def post_thought():
    
    is_valid = True
    if len(request.form['thought_content']) < 6:
        is_valid = False
        flash('Message must be at least 6 characters')
    if len(request.form['thought_content']) >= 256:
        is_valid = False
        flash('Message cannot be more than 255 characters')
    
    if is_valid:
        mysql = connectToMySQL('thoughts')
        query = "INSERT into thoughts (user_id, thoughts, created_at, updated_at) VALUES (%(uid)s, %(mes)s, NOW(), NOW());"
        data = {
            'uid': session['user_id'],
            'mes': request.form['thought_content']
        }
        thought_id = mysql.query_db(query, data)
    
    return redirect("/thoughts")

@app.route("/like/<m_id>")
def like_thought(m_id):
    mysql = connectToMySQL('thoughts')
    query = "INSERT INTO users_likes_thoughts (users_id, thoughts_id, created_at, updated_at) VALUES (%(uid)s, %(mid)s, NOW(), NOW());"
    data = {
        'uid': session['user_id'],
        'mid': m_id
    }
    mysql.query_db(query, data)
    return redirect("/thoughts")

@app.route("/details/<m_id>")
def thought_detail(m_id):
    mysql = connectToMySQL('thoughts')
    query = "SELECT * FROM thoughts LEFT JOIN users ON thoughts.user_id = users.id WHERE thoughts.idthoughts = %(mid)s;"
    data = {
        'mid': m_id
    }
    thought = mysql.query_db(query, data)

    mysql = connectToMySQL('thoughts')
    query = "SELECT * FROM users_likes_thoughts LEFT JOIN users ON users_id = users.id WHERE thoughts_id = %(mid)s;"
    data = {
        'mid': m_id
    }
    users_like_thought = mysql.query_db(query, data)

    mysql = connectToMySQL('thoughts')
    query = "SELECT * FROM users WHERE users.id = %(id)s"
    data = {
        'id': session['user_id']
    }
    users = mysql.query_db(query, data)

    return render_template("details.html", thought=thought[0],users_like_thought=users_like_thought, users=users[0])

@app.route("/unlike/<m_id>")
def unlike_thought(m_id):
    mysql = connectToMySQL('thoughts')
    query = "DELETE FROM users_likes_thoughts WHERE users_id = %(uid)s and thoughts_id = %(mid)s;"
    data = {
        'uid': session['user_id'],
        'mid': m_id
    }
    mysql.query_db(query, data)
    return redirect("/thought")

@app.route("/delete/<m_id>")
def delete_thought(m_id):
    
    mysql = connectToMySQL('thoughts')
    query = "DELETE FROM thoughts WHERE idthoughts = %(mid)s;"
    data = {
        'mid': m_id
    }
    mysql.query_db(query, data)

    mysql = connectToMySQL('thoughts')
    query = "DELETE FROM users_likes_thoughts WHERE users_id = %(uid)s and thoughts_id = %(mid)s;"
    data = {
        'uid': session['user_id'],
        'mid': m_id
    }
    mysql.query_db(query, data)

    

    return redirect("/thoughts")

if __name__ == "__main__":
    app.run(debug=True)