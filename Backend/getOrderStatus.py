from flask import Blueprint, jsonify
from db import get_connection

#Populate orderlist for grids
orderStatus_bp = Blueprint("order_statuses", __name__)

@orderStatus_bp.route("/orderStatuses", methods=["GET"])
def get_orderstatuses():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT 
                ORDERSTATUSTABLEID,
                DESCRIPTION
            FROM ORDERSTATUSTABLE
            ORDER BY DESCRIPTION
            """
        )

        
        statuses = [
            {
               from flask import Blueprint, jsonify
from db import get_connection

#Populate orderlist for grids
orderStatus_bp = Blueprint("order_statuses", __name__)

@orderStatus_bp.route("/orderStatuses", methods=["GET"])
def get_orderstatuses():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT 
                ORDERSTATUSTABLEID,
                DESCRIPTION
            FROM ORDERSTATUSTABLE
            ORDER BY DESCRIPTION
            """
        )

        
        statuses = [
            {
                "OrderStatusTableId":  row [0],
                "description": row[1]
            }
            for row in cursor.fetchall()
        ]
    finally:
        cursor.close()
        conn.close()

    return jsonify({"statuses": statuses})
                "description": row[1]
            }
            for row in cursor.fetchall()
        ]
    finally:
        cursor.close()
        conn.close()

    return jsonify({"statuses": statuses})