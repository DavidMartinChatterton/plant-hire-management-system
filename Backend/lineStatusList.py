from flask import Blueprint, jsonify
from db import get_connection

# Populate line status lookup list
lineStatusList_bp = Blueprint("lineStatuslist", __name__)

@lineStatusList_bp.route("/lineStatusList", methods=["GET"])
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
        line_status_list = [
            {"orderStatusTableId": row[0], "description": row[1]} 
            for row in cursor.fetchall()
        ]
    finally:
        cursor.close()
        conn.close()
    # Return order status list to React
    return jsonify({"lineStatusList": line_status_list})

