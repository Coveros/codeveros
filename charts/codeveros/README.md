# Codeveros Chart

## Introduction

This chart installs Codeveros as a single helm release. It is largely an umbrella for the lower-level service
charts, along with an optional proxy to establish a single endpoint for external access. The proxy forwards requests 
to the codeveros-gateway and codeveros-ui services.

* [codeveros-auth-service](../codeveros-auth-service)
* [codeveros-gateway](../codeveros-gateway)
* [codeveros-training-service](../codeveros-training-service)
* [codeveros-user-service](../codeveros-user-service)
* [codeveros-ui](../codeveros-ui)

## Prerequisites

Add the Codeveros chart repository

```shell script
helm repo add codeveros https://coveros.github.io/codeveros
```

## Installing the Chart

To install the chart with the release name `my-release`:

```shell script
helm install my-release codeveros/codeveros
```

The above command deploys Codeveros on the Kubernetes cluster in the default configuration. The [configuration](#configuration) 
section lists the parameters that can be configured during installation.

## Configuration

This umbrella chart doesn't have any custom values, all available configuration is from its child
charts.

By default, the nginx proxy is enabled, and the codeveros-ui and codeveros-gateways are disabled.

Set `proxy.enabled` to `false` to not install the nginx dependency and to not add the codeveros
ConfigMap.

### Ingress Example

The `codeveros-ui` and `codeveros-gateway` charts include optional ingresses.

To make Codeveros accessible at `https://codeveros.local`:

```yaml
# my-values.yaml

codeveros-ui:
  ingress:
    enabled: true
    host: codeveros.local
codeveros-gateway:
  ingress:
    enabled: true
    host: codeveros.local
proxy:
  enabled: false
```

```shell script
helm install my-release -f my-values.yaml codeveros/codeveros
```
