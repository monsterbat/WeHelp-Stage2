"""
WeHelp BootCamp Assignemt - Stage 2 -*- MySQL connect function -*-
Update date: 2022/11/17
Authored by SC Siao
"""

import mysql.connector

# MySQL connect and input/output
def get_connect():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="root12345678",
        database="taipei_day_trip",
        charset="utf8"
)

def query_data_read(sql_command):
    conn=get_connect()
    try:
        cursor=conn.cursor()
        cursor.execute(sql_command)
        return cursor.fetchall()
    finally:
        conn.close()

def query_data(sql_command,input):
    conn=get_connect()
    try:
        cursor=conn.cursor()
        cursor.execute(sql_command,input)
        return cursor.fetchall()
    finally:
        conn.close()

def insert_or_update_data(sql_command,input):
    conn=get_connect()
    try:
        cursor=conn.cursor()
        cursor.execute(sql_command,input)
        conn.commit()
        return cursor.fetchall()
    finally:
        conn.close()
