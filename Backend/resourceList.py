from flask import Blueprint, jsonify
from db import get_connection

#Populate resource list for lookups
resourceList_bp = Blueprint("resource_list", __name__)

@resourceList_bp.route("/resourceList", methods=["GET"])
def get_resources():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT RESOURCETABLEID, RESOURCEDESCRIPTION
            FROM RESOURCETABLE
            ORDER BY RESOURCEDESCRIPTION
            """
        )
         # Property names must match the names used in React
        resource_list = [
            {"resourceTableId": row[0], "resourceDescription": row[1]}
            for row in cursor.fetchall()
        ]
    finally:
        cursor.close()
        conn.close()
    # Return resource list to React
    return jsonify({"resourceList": resource_list})
    