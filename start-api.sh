cd boleia-dashboard-api-cdk/

echo "-- Building CloudFormation template..."
cdk synth --no-staging \
-c BOOTSTRAP_ACCOUNT= \
-c BOOTSTRAP_REGION= \
-c ENV=local \
> template.yaml

echo "-- Starting local API Gateway..."
sam local start-api
