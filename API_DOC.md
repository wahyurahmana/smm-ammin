# SMM AMMIN
## MERUPAKAN LAYANAN GRATIS UNTUK SEGALA KEBUTUHAN SOCIAL MEDIA MARKETING ANDA
#### BY WAHYU RAHMANA
----

**GET FREE ORDER**
* **URL**

  /free-orders

* **Method:**

  `POST`

* **Data Request Body**
  ```
    {
        "service": "<serviceId>",
        "target": "<target_account>"
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
      order: <status_orderId>,
      data: <data_user_target>
    }
    ```
 
* **Error Response:**
    ```
    {status : 401, message : "Daily transaction limit is up"}
    ```
    ```
    { status: 401, message: 'your account is limited, please try again in the next 7 days ' }
    ```
 
----
**GET CHECK ORDER**
* **URL**

  /check-order

* **Method:**

  `POST`

* **Data Request Body**
  ```
    {
        "id": "<orderId>"
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
    status: true,
    data: { status: 'Success', start_count: '763', remains: '0' 
    }
    ```
 
* **Error Response:**
    ```
   { status: false, data: 'Pesanan tidak ditemukan' }
    ```
 
----