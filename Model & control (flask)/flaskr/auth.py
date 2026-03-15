from flask import (Blueprint, jsonify, redirect, render_template, request)
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime as dt
from flask_cors import CORS
from Model.employe import find_employee, add_employ, all_emp, update_employee
from .utils import response

bp = Blueprint('auth', __name__, url_prefix='/auth')

CORS(bp, resources={r"/auth*": {"origins": "http://localhost:3000"}})   # allow react application frontend for resource sharing


# route to the react forntend
@bp.route("/add")
def new_employee():
    # return render_template('add_employee.html')     # for render flask application template
    return redirect('http://localhost:3000/')          # for redirect to react application frontend 


@bp.route(f'/employee/<int:e_id>', methods=['GET'])    
def employee(e_id):
    employe = find_employee(e_id)
    if employe:
        return response(success=True, message="Employee Found Successfully.", data=employe, response_code=200)
    return response(message="Invalid e_id", response_code=404)
    
@bp.route(f'/allemployee/<employee>/<int:lit>', methods=['GET'])
def allemployee(employee,lit):
    data = all_emp(employee,lit)
    if data == None :
        return response(success=False,message="Employee data not Found.", response_code = 404)
    return response(success=True,message="Employee data Found.",data = data, response_code = 200)
    
@bp.route('/add_employee',methods=['POST'])
def add_employee():
    data = request.get_json()
    first_name = data.get('firstName').strip()
    last_name = data.get('lastName').strip()
    contact_no = data.get('contactNo').strip()
    e_address = data.get('eAddress').strip()
    try:
        message = None
        if  not all([first_name,last_name,contact_no,e_address]):
            message = "All fields must be filled"
        elif  not first_name.isalpha() or not last_name.isalpha() or not contact_no.isdigit() or not isinstance(e_address, str):
            message = "Provied a vaild Input for all relevant fields"
        elif len(first_name)> 15 or len(last_name)> 15 or len(contact_no)> 12 or len(e_address)> 50:
            message = """First name and last name: maximum 15 characters each.   
                        Contact number: at least 10 digits, maximum 12 digits.
                        Address: maximum 15 characters."""
        if(message != None):
            return response(message=message,
                            response_code = 400)
    except:
        return response(message=message, response_code = 400)
    try:
        data = add_employ(f_name=first_name, l_name=last_name, contact=contact_no, addrs=e_address, updated=dt.today())     # for SQL Database
    except Exception as e:
        return response(message=f"Database error: {str(e)}", response_code=500)
    except AssertionError as e:
        return response(message=f"An unexpected error occurred: {e}", response_code=500)
    except:
        return response(message="An unexpected error occurred.", response_code=500)
    return response(success=True,
                    message=f"Employee '{first_name}' added successfully!",
                    response_code=200)

@bp.route('/updateemployee',methods=['POST'])
def updateemployee():
    data = request.get_json()
    e_id = int(data.get('e_id').strip())
    first_name = data.get('firstName').strip()
    last_name = data.get('lastName').strip()
    contact_no = data.get('contactNo').strip()
    e_address = data.get('eAddress').strip()
    print(data)
    return update_employee(e_id = e_id, f_name=first_name, l_name=last_name, contact=contact_no, addrs=e_address)








