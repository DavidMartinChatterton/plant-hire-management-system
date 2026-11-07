from db import get_connection
from flask import Blueprint, request, jsonify
order_bp = Blueprint("orders", __name__)
#Link to react .jsx
@order_bp.route("/new-order", methods=["POST"])
def add_order():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({"error": "Expected a JSON object."}), 400

    order_name = data.get("orderName")
    customer_id = data.get("customerId")
    order_date = data.get("orderDate")
    order_notes = data.get("orderNotes")
    order_status = data.get("orderStatus")


    if not isinstance(order_name, str) or not order_name.strip():
        return jsonify({"error": "orderName must be a non-empty string."}), 400
    if customer_id is None or str(customer_id).strip() == "":
        return jsonify({"error": "customerId is required."}), 400
    if not isinstance(order_date, str) or not order_date.strip():
        return jsonify({"error": "orderDate must be a non-empty string."}), 400
    if not isinstance(order_notes, str) or not order_notes.strip():
            return jsonify({"error": "order notes must be a non-empty string."}), 400
    if not isinstance(order_status, str) or not order_notes.strip():
                return jsonify({"error": "order status must be a non-empty string."}), 400
    

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO ORDERTABLE
            (   ORDERNAME,
                CustTableId,
                ORDERDATE,
                NOTES,
                orderStatusTableId )
                VALUES (%s, %s, %s, %s, %s)
                """,
            (order_name.strip(), 
             customer_id, 
             order_date, 
             order_notes.strip(),
             order_status)
        )
        conn.commit()
    
    finally:
        cursor.close()
        conn.close()

    return jsonify({"message": "New order created successfully."}), 201
