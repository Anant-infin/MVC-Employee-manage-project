from datetime import datetime as dt
from sqlalchemy import Text, create_engine, Column, Integer, String, DECIMAL, Date, or_
from sqlalchemy.exc import SQLAlchemyError
from flaskr.db import  SessionLocal
from .base import Base
from flaskr.utils import conv_to_dict, response 

session = SessionLocal()


class Employee(Base):
    __tablename__= "employee"
    e_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    first_name = Column(String(15), nullable=False)
    last_name = Column(String(15), nullable=False)
    contact_no = Column(String(13), nullable=False)
    address = Column(String(50), nullable=False)
    updated = Column(Date,default=dt.today())

    def __repr__(self):
        return f"<Employee(name='{self.first_name} {self.last_name}', e_id='{self.e_id}')>"
    
    def to_dict(self):
        return conv_to_dict(self)


def add_employ(f_name=None, l_name=None, contact=None, addrs=None, updated=dt.today()):
    employee = Employee(first_name=f_name, last_name=l_name, contact_no=contact, address=addrs, updated=updated)
    try:
        session.add(employee)
        session.commit()
        print(f"Added new employee: {employee.first_name}")
    except Exception as e:
        session.rollback()
        print(f"Error adding employee: {e}")

def find_employee(e_id):
    employee = session.query(Employee).filter(e_id=e_id).first()
    return employee.to_dict() if employee else None
    

def con_for_search(text):
    condition = [col.like(f"%{text}%") for col in Employee.__table__.columns]
    return or_(*condition)

def all_emp(search_text,lit = max):
    condition = con_for_search(search_text)
    data = session.query(Employee).filter(condition).limit(lit)
    if data:         
        result =[]
        for emp in data:
            result.append(emp.to_dict())
        return result
    return None





def update_employee(e_id = None, f_name=None, l_name=None, contact=None, addrs=None):
    if isinstance(e_id,int):
        if e_id not in find_employee(e_id) :
            return response(success=False, message="Employee not found", response_code=404)
        try:
            if f_name:
                session.query(Employee).filter_by(e_id= e_id).update({"f_name": f_name})
                session.commit()
            if l_name:
                session.query(Employee).filter_by(e_id= e_id).update({"last_name": l_name})
                session.commit()
            if contact:
                session.query(Employee).filter_by(e_id= e_id).update({"contact_no": contact})
                session.commit()
            if addrs:
                session.query(Employee).filter_by(e_id= e_id).update({"address": addrs})
                session.commit()
            session.query(Employee).filter_by(e_id= e_id).update({"updated": dt.today()})
        except SQLAlchemyError as e:
            session.rollback()
            return response(message=f"An error Occuered as {e}", response_code=500)
        finally:
            session.close()
        return response(success=True, message=f"Employee with id {Employee.e_id} updated successfully!", response_code=200)


