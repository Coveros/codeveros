# CODEveros
Monorepo for all CODEveros services

## Helm Charts

### Available Charts

* [codeveros](charts/codeveros/)
* [codeveros-auth-service](charts/codeveros-auth-service/)
* [codeveros-training-service](charts/codeveros-training-service/)
* [codeveros-ui](charts/codeveros-ui/)
* [codeveros-user-service](charts/codeveros-user-service/)
* [codeveros-gateway](charts/codeveros-gateway/)


### Adding the Chart Repository
To add the CODEveros Helm Chart repository, run `helm repo add`

`helm repo add codeveros https://coveros.github.io/codeveros`

### How to Install Charts
`helm install codeveros/<chart>`.

### Repository Location
This repository uses GitHub Pages and a `gh-pages` branch to make published charts publicly available. It is structured 
based on the example provided by [Charts Repo Actions Demo](https://github.com/helm/charts-repo-actions-demo).

