# Codeveros Training Service Chart

## Introduction

This chart installs the Codeveros Training Service microservice. It manages training.

This chart uses the [Codeveros Training Service Docker Image](https://hub.docker.com/r/coveros/codeveros-training-service)

## Prerequisites

Add the Codeveros chart repository

```shell script
$ helm repo add codeveros https://coveros.github.io/codeveros
```

## Installing the Chart

To install the chart with the release name `my-release`:

```shell script
$ helm install my-release codeveros/codeveros-training-service
```

The above command deploys Codeveros Training Service on the Kubernetes cluster in the default configuration. 
The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Configuration

The following table lists the configurable parameters and their default values.

| Parameter                      | Description                                  | Default                                  |
| ------------------------------ | -------------------------------------------- | ---------------------------------------  |
| `nameOverride`                 | Override the resource name prefix            | Not Set                                  |
| `fullnameOverride`             | Override the full resource names             | Not Set                                  |
| `replicaCount`                 | Number of replicas                           | `1`                                      |
| `imagePullSecrets`             | Image pull secrets                           | `[]`                                     |
| `image.repository`             | Codeveros Training Service image             | `coveros/codeveros-training-service`     |
| `image.tag`                    | Codeveros Training Service version           | Not Set                                  |
| `image.pullPolicy`             | Codeveros Training Service image pull policy | `Always`                                 |
| `service.type`                 | Service type                                 | `ClusterIP`                              |
| `service.port`                 | Service port                                 | `8080`                                   |
| `env.dbPort`                   | Service configuration for DB port            | `27017`                                  |
| `env.dbDatabase`               | Service configuration for DB database        | `training`                               |
| `mongodb.usePassword`          | Whether to use db authentication             | `false`                                  |
| `mongodb.nameOverride`         | Overrides name of database resources         | `training-service-mongodb`               |

The image tag defaults to the Chart AppVersion
