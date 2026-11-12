from flask import Blueprint, jsonify
from db import get_connection

# Populate order status lookup list
orderStatusList_bp = Blueprint("orderStatuslist", __name__)

@orderStatusList_bp.route("/orderStatusList", methods=["GET"])
def get_statuses():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT ORDERSTATUSTABLEID, DESCRIPTION
            FROM ORDERSTATUSTABLE
            ORDER BY DESCRIPTION
            """
        )
        # Property names must match the names used in React
        order_status_list = [
            {"orderStatusTableId": row[0], "description": row[1]} 
            for row in cursor.fetchall()
        ]
    finally:
        cursor.close()
        conn.close()
    # Return order status list to React
    return jsonify({"orderStatusList": order_status_list})
