const { Lambda } = require("aws-sdk");

const response = (body, status = 200) => {
  return {
    statusCode: status,
    body: JSON.stringify(body)
  };
};

exports.handler = async function(event) {
  console.log("Running environment: " + process.env.ENV);
  console.log("Request:", event);

  // return response back to upstream caller
  return response([ "This was a test for listing repositories.", "Repository 1", "Repository 2", "Repository 3" ]);
};
