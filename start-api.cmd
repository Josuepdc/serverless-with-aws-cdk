@echo off

cd cdk/

echo -- Building CloudFormation template...
call cdk synth ^
-c BOOTSTRAP_ACCOUNT= ^
-c BOOTSTRAP_REGION= ^
-c ENV=Local ^
--no-staging > template.yaml

echo -- Starting local API Gateway...
call sam local start-api