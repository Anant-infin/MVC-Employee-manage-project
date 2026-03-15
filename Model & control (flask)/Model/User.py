from sqlalchemy import Column, Integer, String, Date
from .base import Base
from datetime import datetime as dt


class User(Base):
    __tablename__="Admin_user"
    u_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username= Column(String(30),index=True, unique= True)
    password = Column(String(150), index= True, unique= True)
    updated = Column(Date,default=dt.today())





class Employee(Base):
    __tablename__= "employee"
    e_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    first_name = Column(String(15), nullable=False)
    last_name = Column(String(15), nullable=False)
    contact_no = Column(String(13), nullable=False)
    address = Column(String(50), nullable=False)
    updated = Column(Date,default=dt.today())