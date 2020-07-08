const { Lambda } = require("aws-sdk");
const { uuid } = require("uuidv4")

const response = (body, status = 200) => {
  return {
    statusCode: status,
    body: JSON.stringify(body)
  };
};

exports.handler = async function(event) {
  console.log("Running environment: " + process.env.ENV);
  console.log("Request:", event);
  const body = JSON.parse(event.body);

  if (!body.title) {
    return response({ msg: "field 'title' is required" }, 400);
  }

  // return response back to upstream caller
  return response({ 
    id: uuid(),
    description: "This was a test for creating repository.",
    title: body.title,
    url: body.url,
    techs: body.techs
  });
};
