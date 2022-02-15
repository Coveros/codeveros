# Codeveros
Monorepo for all Codeveros services

## Services

* [User Service](services/user-service)
    * [Node.js](services/user-service/nodejs)
* [Auth Service](services/auth-service)
    * [Node.js](services/auth-service/nodejs)
* [Training Service](services/training-service)
    * [Node.js](services/training-service/nodejs)
* [UI](services/ui)
    * [Angular](services/ui/angular)
* [Gateway](services/gateway)
    * [Node.js](services/gateway/nodejs)

## Helm Charts

### Available Charts

* [codeveros](charts/codeveros/)
* [codeveros-auth-service](charts/codeveros-auth-service/)
* [codeveros-training-service](charts/codeveros-training-service/)
* [codeveros-ui](charts/codeveros-ui/)
* [codeveros-user-service](charts/codeveros-user-service/)
* [codeveros-gateway](charts/codeveros-gateway/)


### Adding the Chart Repository
To add the Codeveros Helm Chart repository, run `helm repo add`

`helm repo add codeveros https://coveros.github.io/codeveros`

### How to Install Charts
`helm install codeveros/<chart>`.

### Repository Location
This repository uses GitHub Pages and a `gh-pages` branch to make published charts publicly available. It is structured 
based on the example provided by [Charts Repo Actions Demo](https://github.com/helm/charts-repo-actions-demo).

## Deployments

[Insert picture of construction worker here]
