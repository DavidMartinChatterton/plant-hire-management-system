from flask import Blueprint, request, jsonify
from db import get_connection


customer_bp = Blueprint("customers", __name__)

@customer_bp.route("/add-customer", methods=["POST"])
def add_customer():

    data = request.get_json(silent=True)

    customer_name = data.get("customerName")
    customer_phone = data.get("phoneNumber")
    customer_email = data.get("email")
    customer_addressOne = data.get("addressOne")
    customer_addressTwo = data.get("addressTwo")
    customer_addressThree = data.get("addressThree")
    customer_PostCode= data.get("postCode")
    customer_Active= data.get("active")

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO CUSTTABLE
            (CUSTNAME, CUSTPHONE, EMAIL, ADDRESSONE,
            ADDRESSTWO, ADDRESSTHREE, POSTCODE, ACTIVE)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (customer_name, customer_phone, customer_email, 
             customer_addressOne, customer_addressTwo, customer_addressThree,
             customer_PostCode, customer_Active)
        )

        conn.commit()

    finally:
        cursor.close()
        conn.close()

    return jsonify({"message": "Customer added successfully"})