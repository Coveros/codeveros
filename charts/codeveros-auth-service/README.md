# Codeveros Auth Service Chart

## Introduction

This chart installs the CODEveros Auth Service microservice. It is responsible for generating and validating JSON Web Tokens
used for CODEveros authorization.

This chart uses the [CODEveros Auth Service Docker Image](https://hub.docker.com/r/coveros/codeveros-auth-service)

## Prerequisites

Add the CODEveros chart repository

```shell script
$ helm repo add codeveros https://coveros.github.io/codeveros
```

## Installing the Chart

To install the chart with the release name `my-release`:

```shell script
$ helm install my-release codeveros/codeveros-auth-service
```

The above command deploys CODEveros Auth Service on the Kubernetes cluster in the default configuration. 
The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Configuration

The following table lists the configurable parameters and their default values.

| Parameter                      | Description                                  | Default                                  |
| ------------------------------ | -------------------------------------------- | ---------------------------------------  |
| `nameOverride`                 | Override the resource name prefix            | Not Set                                  |
| `fullnameOverride`             | Override the full resource names             | Not Set                                  |
| `replicaCount`                 | Number of replicas                           | `1`                                      |
| `proxy.imagePullPolicy`        | Proxy image pull policy                      | `IfNotPresent`                           |
| `imagePullSecrets`             | Image pull secrets                           | `[]`                                     |
| `image.repository`             | CODEveros Auth Service image                 | `coveros/codeveros-auth-service`         |
| `image.tag`                    | CODEveros Auth Service version               | Not Set                                  |
| `image.pullPolicy`             | CODEveros Auth Service image pull policy     | `Always`                                 |
| `service.type`                 | Service type                                 | `ClusterIP`                              |
| `service.port`                 | Service port                                 | `8080`                                   |

The image tag defaults to the Chart AppVersion
