# BackEnd InventoryManagement

## Product Routes:

**GET**
> ``/api/v1/product/products``  ``return array of Product``

> ``/api/v1/product/specific/:code``  **return product.**

> ``/api/v1/product/categories``  **return array of categories.**

**POST**
> ``api/v1/product/create``  **create product.**

**PUT**
> ``/api/v1/product/edit``  **Edit product(by request.body.code).**

**DELETE**
> ``/api/v1/product/delete/:code``  **delete product.**

## Employees Routes:

**GET**
> ``/api/v1/employee/employees``  **return array of Employee**

> ``/api/v1/employee/specific/:email``  **return Employee**

> ``/api/v1/employee/categories``  **return array of occupations.**

**POST**
> ``api/v1/employee/create``  **create Employee**

**PUT**
> ``/api/v1/employee/edit/:email``  **edit employee**

**DELETE**
> ``/api/v1/employee/delete/:email``  **delete employee**

## Auth Routes:

**POST**
> ``/api/v1/auth/login``  **Login by email and password**

> ``/api/v1/auth/register``  **Register by email, password, name and lastname**

## Dev Routes
**GET**
> ``/api/v1/dev/db/fresh``  **Delete the products from the collection and fills with 15 new products generated by the fakerjs dependency**