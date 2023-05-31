$(document).ready(function () {
  var items = [];
  var billNumber = generateBillNumber();

  $("#item-form").on("submit", addItemToCart);
  $("#cart-table").on("click", ".btn-danger", removeItemFromCart);
  $("#generate-invoice").on("click", generateInvoice);

  // Event listener for "New Bill" button
  $("#new-bill").on("click", resetForm);

  // Function to generate a random bill number
  function generateBillNumber() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  // Set the value of the bill-number element when the page loads
  $("#bill-number").text(billNumber);

  function addItemToCart(event) {
    event.preventDefault();

    var itemName = $("#item-name").val();
    var itemPrice = $("#item-price").val();
    var customerName = $("#customer-name").val();

    if (itemName !== "" && itemPrice !== "" && customerName !== "") {
      var item = {
        name: itemName,
        price: parseFloat(itemPrice),
      };

      items.push(item);
      $("#cart-table tbody").append(
        "<tr><td>" +
          item.name +
          "</td><td>Rs" +
          item.price.toFixed(2) +
          '</td><td><button class="btn btn-danger"><i class="fa fa-trash-alit"></i></button></td></tr>'
      );

      updateTotalCost();
      $("#item-name").val("");
      $("#item-price").val("");
    }
  }

  function removeItemFromCart() {
    var index = $(this).closest("tr").index();
    items.splice(index, 1);
    $(this).closest("tr").remove();
    updateTotalCost();
  }

  function updateTotalCost() {
    var totalCost = 0;
    items.forEach(function (item) {
      totalCost += item.price;
    });
    $("#total-cost").text("Total Cost: Rs" + totalCost.toFixed(2));
  }

  function generateInvoice() {
    var invoice = `
      <html>
        <head>
          <title>Invoice</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
          <style>
            .invoice-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
            }
            .invoice-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .invoice-header h1 {
              font-size: 32px;
              color: #007bff;
              margin-bottom: 5px;
            }
            .invoice-header h4 {
              font-size: 18px;
              color: #333;
              margin-bottom: 10px;
            }
            .invoice-table {
              width: 100%;
            }
            .invoice-table th {
              background-color: #f8f9fa;
              color: #000;
            }
            .invoice-table td {
              color: #000;
            }
            .invoice-total {
              margin-top: 20px;
              text-align: right;
              font-weight: bold;
              color: #000;
            }
            body {
              background-color: #f1f3f6;
              color: #000;
            }
          </style>
        </head>
        <body>
          <div class="container mt-5 invoice-container">
            <div class="invoice-header">
              <h1>Invoice</h1>
              <h4>Bill No: ${billNumber}</h4>
              <h4>Customer Name: ${$("#customer-name").val()}</h4>
              <h4>Date: ${getCurrentDate()}</h4>
            </div>
            <table class="table table-bordered invoice-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Price</th>
                </tr>
              </thead>
              <tbody>`;

    items.forEach(function (item) {
      invoice += `
        <tr>
          <td>${item.name}</td>
          <td>Rs ${item.price.toFixed(2)}</td>
        </tr>`;
    });

    invoice += `
            </tbody>
          </table>
          <p class="invoice-total">Total Cost: Rs ${getTotalCost()}</p>
        </div>
      </body>
    </html>`;


    var popup = window.open("", "_blank");
    popup.document.open();
    popup.document.write(invoice);
    popup.document.close();


     // Send the invoice data to the server
     saveInvoiceToDatabase(billNumber, $("#customer-name").val(), getCurrentDate(), items);



  }

  function getTotalCost() {
    var totalCost = 0;
    items.forEach(function (item) {
      totalCost += item.price;
    });
    return totalCost.toFixed(2);
  }

  function getCurrentDate() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    var day = ("0" + currentDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // Function to reset the form and clear the cart
  function resetForm() {
    items = []; // Clear the items array
    $("#cart-table tbody").empty(); // Clear the cart table
    updateTotalCost(); // Update the total cost
    $("#item-name").val(""); // Clear the item name input
    $("#item-price").val(""); // Clear the item price input
    $("#customer-name").val(""); // Clear the customer name input
    billNumber = generateBillNumber(); // Generate a new bill number
    updateCurrentDate(); // Update the current date
  }

  // Function to update the current date
  function updateCurrentDate() {
    var currentDate = new Date().toLocaleDateString(); // Get the current date
    $("#current-date").text(currentDate); // Set the current date in the HTML
  }

  function saveInvoiceToDatabase(billNumber, customerName, date, items) {
    var invoiceData = {
      billNumber: billNumber,
      customerName: customerName,
      date: date,
      items: items
    };

    $.ajax({
      url: "/save_invoice/", 
      method: "POST",
      data: JSON.stringify(invoiceData),
      contentType: "application/json",
      success: function(response) {
        console.log("Invoice saved successfully!");
      },
      error: function(error) {
        console.error("Error saving invoice:", error);
      }
    });
  }


});
