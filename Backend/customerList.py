from flask import Blueprint, jsonify
from db import get_connection

#Populate customer list for lookups
customerList_bp = Blueprint("customer_list", __name__)

@customerList_bp.route("/customerList", methods=["GET"])
def get_customers():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT CUSTTABLEID, CUSTNAME
            FROM CUSTTABLE
            ORDER BY CUSTNAME
            """
        )
        customers = [
            {"customerId": row[0], "customerName": row[1]}
            for row in cursor.fetchall()
        ]
    finally:
        cursor.close()
        conn.close()

    return jsonify({"customers": customers})
