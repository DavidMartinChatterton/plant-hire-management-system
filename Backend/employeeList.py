from flask import Blueprint, jsonify
from db import get_connection

#Populate employee list for lookups
employeeList_bp = Blueprint("employee_list", __name__)

@employeeList_bp.route("/employeeList", methods=["GET"])
def get_employees():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT EMPLOYEETABLEID, NAME
            FROM EMPLOYEETABLE
            ORDER BY NAME
            """
        )
         # Property names must match the names used in React
        employee_list = [
            {"employeeTableId": row[0], "name": row[1]}
            for row in cursor.fetchall()
        ]
    finally:
        cursor.close()
        conn.close()
    # Return eployee list to React
    return jsonify({"employeeList": employee_list})
    