# CODEveros User Service

## Introduction

This chart installs the CODEveros User Service microservice. It manages users.

This chart uses the [CODEveros User Service Docker Image](https://hub.docker.com/r/coveros/codeveros-user-service)

## Prerequisites

Add the CODEveros chart repository

```shell script
$ helm repo add codeveros https://coveros.github.io/codeveros
```

## Installing the Chart

To install the chart with the release name `my-release`:

```shell script
$ helm install my-release codeveros/codeveros-user-service
```

The above command deploys CODEveros User Service on the Kubernetes cluster in the default configuration. 
The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Configuration

The following table lists the configurable parameters and their default values.

| Parameter                      | Description                                  | Default                                  |
| ------------------------------ | -------------------------------------------- | ---------------------------------------  |
| `nameOverride`                 | Override the resource name prefix            | Not Set                                  |
| `fullnameOverride`             | Override the full resource names             | Not Set                                  |
| `replicaCount`                 | Number of replicas                           | `1`                                      |
| `imagePullSecrets`             | Image pull secrets                           | `[]`                                     |
| `image.repository`             | CODEveros User Service image                 | `coveros/codeveros-user-service`         |
| `image.tag`                    | CODEveros User Service version               | Not Set                                  |
| `image.pullPolicy`             | CODEveros User Service image pull policy     | `Always`                                 |
| `service.type`                 | Service type                                 | `ClusterIP`                              |
| `service.port`                 | Service port                                 | `8080`                                   |
| `env.dbPort`                   | Service configuration for DB port            | `27017`                                  |
| `env.dbDatabase`               | Service configuration for DB database        | `users`                                  |
| `mongodb.usePassword`          | Whether to use db authentication             | `false`                                  |
| `mongodb.nameOverride`         | Overrides name of database resources         | `user-service-mongodb`                   |

The image tag defaults to the Chart AppVersion
