import os
from sqlalchemy.orm import sessionmaker
from datetime import datetime as dt
from sqlalchemy import create_engine



DB_USER = "root"
DB_PASSWORD = "12345678"
DB_HOST = "localhost"
DB_NAME = "modeldb"
# The database URL format for MySQL with mysql-connector-python
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

# 2. Create the SQLAlchemy Engine and Base
# The engine connects the application to the database
engine = create_engine(DATABASE_URL)

# DeclarativeBase is used to define classes that map to database tables
# Base = DeclarativeBase() and MappedAsDataclass()





    
    

# SessionLocal is used to create sessions for database interactions
SessionLocal = sessionmaker(bind=engine)


# if __name__ == "__main__":
#     Base.metadata.create_all(bind=engine)   
