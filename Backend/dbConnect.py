import psycopg

def get_connection():
    try:
        print("Connecting to planthire")

        conn = psycopg.connect(
            host="localhost",
            dbname="planthire",
            user="postgres",
            password="Cloth@Plate@5pray"
        )

        print("Connected successfully!")
        return conn

    except Exception as e:
        print(f"Connection failed: {e}")
        return None


# Call the function
conn = get_connection()

if conn:
    print("Database connection OK")
    conn.close()