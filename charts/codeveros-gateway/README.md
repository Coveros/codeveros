# Codeveros Gateway

## Introduction

This chart installs the CODEveros Gateway microservice. It is responsible for forwarding API requests to the other services,
providing authentication checks, adding common response headers, providing OpenAPI documentation, and login and registration 
workflows.

This chart uses the [CODEveros Gateway Docker Image](https://hub.docker.com/r/coveros/codeveros-gateway)


## Prerequisites

Add the CODEveros chart repository

```shell script
$ helm repo add codeveros https://coveros.github.io/codeveros
```

## Installing the Chart

To install the chart with the release name `my-release`:

```shell script
$ helm install my-release codeveros/codeveros-gateway
```

The above command deploys the CODEveros Gateway on the Kubernetes cluster in the default configuration. 
The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Configuration

The following table lists the configurable parameters and their default values.

| Parameter                      | Description                                  | Default                                  |
| ------------------------------ | -------------------------------------------- | ---------------------------------------  |
| `nameOverride`                 | Override the resource name prefix            | Not Set                                  |
| `fullnameOverride`             | Override the full resource names             | Not Set                                  |
| `replicaCount`                 | Number of replicas                           | `1`                                      |
| `imagePullSecrets`             | Image pull secrets                           | `[]`                                     |
| `image.repository`             | CODEveros Gateway image                      | `coveros/codeveros-gateway`              |
| `image.tag`                    | CODEveros Gateway version                    | Not Set                                  |
| `image.pullPolicy`             | CODEveros Gateway image pull policy          | `Always`                                 |
| `service.type`                 | Service type                                 | `ClusterIP`                              |
| `service.port`                 | Service port                                 | `8080`                                   |
| `authServiceNameOverride`      | Overrides the full auth service service name | Not Set                                  |
| `userServiceNameOverride`      | Overrides the full user service service name | Not Set                                  |
| `trainingServiceNameOverride`  | Overrides the full training service service name | Not Set                              |
| `authServiceName`              | Auth service service name                    | `codeveros-auth-service`                 |
| `userServiceName`              | User service service name                    | `codeveros-user-service`                 |
| `trainingServiceName`          | Training service service name                | `codeveros-training-service`             |

The image tag defaults to the Chart AppVersion
