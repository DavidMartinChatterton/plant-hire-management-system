from flask import Flask, request, jsonify
from db import get_connection

app = Flask(__name__)

@app.route("/add-customer", methods=["POST"])
def add_customer():
    data = request.get_json(silent=True)

    print("Received JSON:", data)

    customer_name = data.get("customerName")
    customer_phone = data.get("phone")

    print("Name:", customer_name)
    print("Phone:", customer_phone)

    if not isinstance(data, dict):
        return jsonify({"error": "Expected a JSON object."}), 400

    customer_name = data.get("customerName")
    customer_phone = data.get("phoneNumber")

    if not isinstance(customer_name, str) or not customer_name.strip():
        return jsonify({"error": "customerName must be a non-empty string."}), 400

    customer_name = customer_name.strip()

    if not isinstance(customer_phone, str) or not customer_phone.strip():
        return jsonify({"error": "phone must be a non-empty string."}), 400

    customer_phone = customer_phone.strip()

    conn = get_connection()
    cursor = conn.cursor()
    try:
        sql = """
        INSERT INTO CUSTTABLE (CUSTNAME, PHONE)
        VALUES (%s, %s)
        """

        cursor.execute(sql, (customer_name, customer_phone))
        conn.commit()
    finally:
        cursor.close()
        conn.close()

   

    return jsonify({"message": "Customer added successfully.",
    "customerName": customer_name,
    "phone": customer_phone}), 201



if __name__ == "__main__":
    app.run(debug=True, port=5000)