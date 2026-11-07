from db import get_connection
from flask import Blueprint, request, jsonify
orderLines_bp = Blueprint("orderLines", __name__)
#Link to react .jsx
@orderLines_bp.route("/new-order-line", methods=["POST"])
def add_order_line():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({"error": "Expected a JSON object."}), 400
    order_table_id = data.get("orderId")
    print("Order ID received:", order_table_id)
    orderLine_name = data.get("orderLineName")
    orderLine_Resource = data.get("orderLineResource")
    orderLine_Employee = data.get("orderLineEmployee")
    orderLine_Date = data.get("orderLineDate")
    orderLine_Status = data.get("orderLineStatus")
    orderLine_UOM = data.get("orderLineUOM") 
    orderLine_UnitPrice = data.get("orderLineUnitPrice") 
    orderLine_Qty = data.get("orderLineQty") 

    if not isinstance(orderLine_name, str) or not orderLine_name.strip():
        return jsonify({"error": "orderName must be a non-empty string."}), 400
    
    conn = get_connection()
    cursor = conn.cursor()
    # Convert blank UUID fields to NULL
    if orderLine_Resource == "":
        orderLine_Resource = None

    if orderLine_Employee == "":
        orderLine_Employee = None

    try:
        cursor.execute(
            """
            INSERT INTO ORDERLINETABLE
            (   ordertableId,
                orderLineName,
                resourceTableId,
                employeeTableId,
                orderLineDate,
                orderStatusTableId,
                measureUnitTableId,
                unitCost,
                qty   )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
            (
            order_table_id,
            orderLine_name.strip(), 
            orderLine_Resource, 
            orderLine_Employee,
            orderLine_Date,
            orderLine_Status,
            orderLine_UOM,
            orderLine_UnitPrice,
            orderLine_Qty)
        )
        conn.commit()
    
    finally:
        cursor.close()
        conn.close()

    return jsonify({"message": "Order line endpoint hit."}), 201
