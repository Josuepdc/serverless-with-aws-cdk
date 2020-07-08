import * as cdk from '@aws-cdk/core';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { RestApi, LambdaIntegration, Cors, IResource } from '@aws-cdk/aws-apigateway';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Environment variables
    const ENV: string = scope.node.tryGetContext('ENV');

    // Creating lambda functions
    const listRepositoriesFunction = new Function(this, 'listRepositories', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.asset('../src/repositories/listRepositories'),
      timeout: cdk.Duration.seconds(ENV === "Local" ? 120 : 15),
      memorySize: 128,
      environment: {
        ENV
      },
    });
    const createRepositoryFunction = new Function(this, 'createRepository', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.asset('../src/repositories/createRepository'),
      timeout: cdk.Duration.seconds(ENV === "Local" ? 120 : 15),
      memorySize: 128,
      environment: {
        ENV
      },
    });

    // Creating api gateway
    const api = new RestApi(this, `BoleiaDashboardApi${ENV}`, {
      description: "API utilizada pelo dashboard do frontend do Profrotas como microsserviço para realizar as consultas ao Elasticsearch, validando o token do usuário no backend do Profrotas.",
    });

    // Creating resource and its methods
    const repositories = api.root.addResource('repositories');
    addCorsOptions(repositories, ENV, this); // If you need to activate CORS
    repositories.addMethod('GET', new LambdaIntegration(listRepositoriesFunction));
    repositories.addMethod('POST', new LambdaIntegration(createRepositoryFunction));
  }
}

function addCorsOptions(apiResource: IResource, ENV: string, context: cdk.Construct) {
  // If run local, set CORS to a lambda function that works with SAM CLI, 
  // else use the default method that generates a mock integration type
  if(ENV === "Local") {
    const corsFunction = new Function(context, 'cors', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.asset('./mock-integrations/cors'),
      timeout: cdk.Duration.seconds(120),
    });
    apiResource.addMethod('OPTIONS', new LambdaIntegration(corsFunction));
  } else {
    apiResource.addCorsPreflight({
      allowOrigins: Cors.ALL_ORIGINS,
      allowMethods: Cors.ALL_METHODS,
      allowHeaders: Cors.DEFAULT_HEADERS,
    });
  }
}
