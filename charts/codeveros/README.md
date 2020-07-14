# CODEveros Chart

## Introduction

This chart installs CODEveros as a single helm release. It is largely an umbrella for the lower-level service
charts, along with an ingress or proxy to establish a single endpoint for external access. The proxy forwards requests 
to the codeveros-gateway and codeveros-ui services.

* [codeveros-auth-service](../codeveros-auth-service)
* [codeveros-gateway](../codeveros-gateway)
* [codeveros-training-service](../codeveros-training-service)
* [codeveros-user-service](../codeveros-user-service)
* [codeveros-ui](../codeveros-ui)

## Prerequisites

Add the CODEveros chart repository

```shell script
$ helm repo add codeveros https://coveros.github.io/codeveros
```

## Installing the Chart

To install the chart with the release name `my-release`:

```shell script
$ helm install my-release codeveros/codeveros
```

The above command deploys CODEveros on the Kubernetes cluster in the default configuration. The [configuration](#configuration) 
section lists the parameters that can be configured during installation.

## Configuration

The following table lists the configurable parameters and their default values.

| Parameter                      | Description                                  | Default                                  |
| ------------------------------ | -------------------------------------------- | ---------------------------------------  |
| `nameOverride`                 | Override the resource name prefix            | Not Set                                  |
| `fullnameOverride`             | Override the full resource names             | Not Set                                  |
| `imagePullSecrets`             | Image pull secrets                           | `[]`                                     |
| `ingress.enabled`              | Create an ingress for codeveros              | `false`                                  |
| `ingress.annotations`          | Annotations to enhance ingress configuration | `{ kubernetes.io/ingress.class: nginx }` |
| `ingress.hostName`             | Codeveros ingress hostname                   | Not Set                                  |
| `proxy.imageRepository`        | Proxy image                                  | `nginx`                                  |
| `proxy.imageTag`               | Proxy version                                | `1.19.0`                                 |
| `proxy.imagePullPolicy`        | Proxy image pull policy                      | `IfNotPresent`                           |
| `proxy.replicaCount`           | Number of proxy replicas                     | `1`                                      |
| `service.type`                 | Proxy service type                           | `NodePort`                               |
| `service.port`                 | Proxy service port                           | `80`                                     |
| `service.nodePort`             | Proxy node port                              | Not Set                                  |


```shell script
$ helm install my-release --set ingress.enabled=true codeveros/codeveros
```
The above example turns on the ingress.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart.
For example,

```shell script
$ helm install my-release -f my-values.yaml codeveros/codeveros
```
