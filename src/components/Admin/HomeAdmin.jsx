import React from "react";
import Container from "react-bootstrap/Container";

const HomeAdmin = () => {
  return (
    <div style={{ height: "100vh" }}>
      <h2>Welcome Administrator</h2>
      <p>Here you will find a quick guide on how to use the admin panel:</p>

      <ol>
        <li>
          To view the list of products, go to Products `&gt;` All products.
          There you will find the product and its general details such as genre,
          price, and stock. If you want to update this information, click on
          "update".
        </li>
        <li>
          To create a new product, go to Products `&gt;` Create new product.
          Here you will find a form for creating a new product available for
          sale, where you can specify details such as available formats, price,
          and stock quantity.
        </li>
        <li>
          To create new categories, go to Categories `&gt;` Edit categories.
          There you can create new genres for the products.
        </li>
        <li>
          To manage purchase orders, go to Order management `&gt;` View orders.
          There you can view and modify the statuses of the orders.
        </li>
      </ol>
    </div>
  );
};

export default HomeAdmin;
