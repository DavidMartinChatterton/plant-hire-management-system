
#import blueprints from .py modules
from flask import Flask
from customers import customer_bp
from orders import order_bp
from customerList import customerList_bp
from openOrdersForCustomer import orderGrid_bp
from orderLines import orderLines_bp
from selectedOrderLines import orderLinesGrid_bp

print("USING POSTGRESQL BACKEND")
app = Flask(__name__)

app.register_blueprint(customer_bp)
app.register_blueprint(order_bp)
app.register_blueprint(customerList_bp)
app.register_blueprint(orderGrid_bp)
app.register_blueprint(orderLines_bp)
app.register_blueprint(orderLinesGrid_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)