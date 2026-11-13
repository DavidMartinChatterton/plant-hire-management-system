
from flask import Blueprint, jsonify, request
from db import get_connection

#Populate orderLiunes for grid
getOrderLines_bp = Blueprint("order_grid", __name__)
getOrderLines_bp.route("/getOrderLines/<orderTableId>", methods=["GET"])

def get_orders(orderTableId):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT 
                ORDERLINENAME,
                ORDERLINEDATE,
                UNITCOST,
                QTY,  
                UNITCOST * QTY AS LINETOTAL
            FROM 
                ORDERLINETABLE 
            WHERE 
                ORDERTABLEID = %s
            ORDER BY ORDERLINEDATE
            """,
            (orderTableId,)
        )

        
        order_line = [
            {
            "orderLineName": row[0],
            "orderLineDate": row[1],
            "orderLineUnitCost": row[2],
            "orderLineQty": row[3],
            "orderLineTotal": row[4]
            }
         for row in cursor.fetchall()
         ]
    finally:
        cursor.close()
        conn.close()
    
    return jsonify({"orderLines": order_line})# orders is the property that flask returns to react