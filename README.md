# serverless-with-aws-cdk

Este repositório Git contém os arquivos e configurações do API Gateway e Lambda Functions utilizados
para criar uma aplicação Serverless com um script para rodar localmente.

### Pré-requisitos

Para o funcionamento do projeto, é necessário que se tenha alguns softwares instalados:

* __Docker__ - https://www.docker.com
* __NodeJS__ - https://nodejs.org
* __AWS CDK__ - __npm install -g aws-cdk__
* __AWS SAM__ - https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

OBS: Após instalar o Docker, certifique-se de que as pastas do computador estejam disponíveis como recurso para o Docker.
     Para Docker no Windows, basta ir nas Configurações do Docker For Windows, em seguida em Resources e em File Sharing.
OBS2: Certifique-se de que os binários "cdk" e "sam" estão disponíveis nas variáveis de ambiente do sistema.

### Preparando o projeto:

- Execute o comando __npm install__ dentro da pasta do cdk.
- Execute o comando __npm install__ dentro das pastas de lambda functions (em src) que possuam dependências a serem instaladas (que possuem package.json).

### Executando:

Rode o script __start-api.sh__ (em ambientes Mac/Linux) ou __start-api.cmd__ (em ambientes Windows).

(Esse script irá gerar o CloudFormation script pelo CDK, e em seguida irá executar a api localmente com o SAM)
