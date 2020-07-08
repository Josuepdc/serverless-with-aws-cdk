#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkStack } from '../lib/cdk-stack';
import { Tag } from '@aws-cdk/core';

class MyApplication extends cdk.Construct {
    constructor(scope: cdk.Construct) {
        // Environment variables
        const ENV: string = scope.node.tryGetContext('ENV');
        const BOOTSTRAP_ACCOUNT: string = scope.node.tryGetContext('BOOTSTRAP_ACCOUNT');
        const BOOTSTRAP_REGION: string = scope.node.tryGetContext('BOOTSTRAP_REGION');

        if(!ENV) {
            throw new Error("The context ENV is required");
        };

        super(scope, ENV);
        Tag.add(this, "environment", ENV)

        new CdkStack(this, `ServerlessWebService${ENV}CdkStack`, {
            description: "Stack para criar uma API Serverless com API Gateway e Lambda Functions utilizada pelo dashboard do frontend do Profrotas como microsserviço para realizar as consultas ao Elasticsearch, validando o token do usuário no backend do Profrotas.",
            env: {
                account: BOOTSTRAP_ACCOUNT || 'placeholder',
                region: BOOTSTRAP_REGION || 'placeholder',
            }
        });
    }
}

const app = new cdk.App();
new MyApplication(app);
