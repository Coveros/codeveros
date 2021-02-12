# CODEveros UI Chart

## Introduction

This chart installs the CODEveros UI microservice. It runs an Nginx forward proxy serving Angular-based static files.

This chart uses the [CODEveros UI Docker Image](https://hub.docker.com/r/coveros/codeveros-ui)

## Prerequisites

Add the CODEveros chart repository

```shell script
$ helm repo add codeveros https://coveros.github.io/codeveros
```

## Installing the Chart

To install the chart with the release name `my-release`:

```shell script
$ helm install my-release codeveros/codeveros-ui
```

The above command deploys CODEveros UI on the Kubernetes cluster in the default configuration. 
The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Configuration

The following table lists the configurable parameters and their default values.

| Parameter                      | Description                                  | Default                                  |
| ------------------------------ | -------------------------------------------- | ---------------------------------------  |
| `nameOverride`                 | Override the resource name prefix            | Not Set                                  |
| `fullnameOverride`             | Override the full resource names             | Not Set                                  |
| `replicaCount`                 | Number of replicas                           | `1`                                      |
| `imagePullSecrets`             | Image pull secrets                           | `[]`                                     |
| `image.repository`             | CODEveros User Service image                 | `coveros/codeveros-ui`                   |
| `image.tag`                    | CODEveros User Service version               | Not Set                                  |
| `image.pullPolicy`             | CODEveros User Service image pull policy     | `Always`                                 |
| `service.type`                 | Service type                                 | `ClusterIP`                              |
| `service.port`                 | Service port                                 | `80`                                     |
| `service.nodePort`             | Service nodePort                             | Not Set                                  |
| `config.enabled`               | Enable proxy configmap configuration         | `false`                                  |
| `config.data`                  | Proxy configmap data                         | `{}`                                     |
| `apiUrl`                       | API base URL                                 | `/api`                                   |
| `ingress.enabled`              | Enable ingress                               | `false`                                  |
| `ingress.annotations`          | Ingress Annotations                          | `{}`                                     |
| `ingress.host`                 | Ingress Host                                 | Not Set                                  |
| `ingress.tlsSecretName`        | Ingress TLS SecretName                       | Not Set                                  |

The image tag defaults to the Chart AppVersion.
