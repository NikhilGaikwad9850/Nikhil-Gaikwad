fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
  .then(response => response.json())
  .then(data => {
    // Process the data as needed
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });