from flask import Blueprint, jsonify
from flask import Blueprint, jsonify, request
from db import get_connection

#Populate orderlist for grid
orderGrid_bp = Blueprint("order_grid", __name__)
@orderGrid_bp.route("/openOrdersForCustomer/<customerId>", methods=["GET"])

def get_orders(customerId):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT 
                ORDERTABLEID,
                ORDERNUM, 
                ORDERNAME,  
                ORDERDATE,
                ORDERSTATUSTABLEID
            FROM 
                ORDERTABLE 
            WHERE 
                CUSTTABLEID = %s
            ORDER 
                BY ORDERNUM
            """,
            (customerId,)
        )

        
        order_table = [
            {
            "orderId": row[0],
            "orderNum": row[1],
            "orderName": row[2],
            "orderDate": row[3],
            "orderStatus": row[4]
            }
         for row in cursor.fetchall()
         ]
    finally:
        cursor.close()
        conn.close()

    return jsonify({"orders": order_table})