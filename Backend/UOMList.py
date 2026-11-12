from flask import Blueprint, jsonify
from db import get_connection

#Populate UOM list for lookups
UOMList_bp = Blueprint("UOM_list", __name__)

@UOMList_bp.route("/UOMList", methods=["GET"])
def get_UOMs():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT MEASUREUNITTABLEID,  LONGNAME
            FROM MEASUREUNIT
            ORDER BY NAME
            """
        )
         # Property names must match the names used in React
        UOM_list = [
            {"measureUnitTableId": row[0], "longName": row[1]}
            for row in cursor.fetchall()
        ]
    finally:
        cursor.close()
        conn.close()
    # Return UOM list to React
    return jsonify({"UOMList": UOM_list})
    