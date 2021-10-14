# HOTAILORS IOC RECRUITMENT TASK

## Requirements
To start Azure function locally you will need:
1. Azure CLI [(installation instructions)](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest)
2. Node.js v8.x [(installation instructions)](https://github.com/nodesource/distributions/blob/master/README.md)
3. .NET Core SDK [(installation instructions)](https://dotnet.microsoft.com/download/linux-package-manager/ubuntu18-04/sdk-2.1.300)
4. Azure Functions Core Tools [(installation instructions)](https://github.com/Azure/azure-functions-core-tools#linux)

## Task
Extend Azure Function (HttpTrigger), so it will be able to receive a list of pokemon ids (multiple) and type (single) and then return a list of pokemon names, which match the requested type (property "type") as JSON.
Additional info:
  * Remember about SOLID
  * To fetch pokemon data use: https://pokeapi.co
  * Azure Function should be triggered via GET (HTTP triggered function)
  * Please use: lodash, axios and inversify
  * Use existing structure and extend it
  * Example invoke: ``localhost:7071/api/HttpTrigger?id=1&id=2&id=5&type=grass``
  * Example response: 
        ``{ status: 200, body: { pokemons: ["bulbasaur", "ivysaur"] } }``

Please do not use any external packages dedicated to handle pokeapi.

In case of any questions send email to: <lukasz@hotailors.com>

Good luck :slightly_smiling_face:
