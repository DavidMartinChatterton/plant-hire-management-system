from flask import Blueprint, jsonify
from flask import Blueprint, jsonify, request
from db import get_connection

#Populate orderlines for grid
orderLinesGrid_bp = Blueprint("orderLines_grid", __name__)
@orderLinesGrid_bp.route("/selectedOrderLines/<orderTableId>", methods=["GET"])

def get_orders(orderTableId):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT 
                ORDERTABLEID,
                ORDERLINETABLEID,
                ORDERLINENAME,
                UNITCOST, 
                QTY,  
                UNITCOST * QTY AS TOTALCOST
            
            FROM 
                ORDERLINETABLE
            WHERE 
                ORDERTABLEID = %s
            
            """,
            (orderTableId,)
        )

        # These are the value flask passes to react - the names must match on both sides
        order_line_table = [
            {
            "orderTableId": row[0],
            "orderlineTableId": row[1],
            "orderLineName": row[2],
            "unitCost": row[3],
            "qty": row[4],
            "totalCost": row[5]
            }
         for row in cursor.fetchall()
         ]
    finally:
        cursor.close()
        conn.close()

    return jsonify({"orderLines": order_line_table}) #Return selected orderlines to React