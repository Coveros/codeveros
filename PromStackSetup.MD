# Kube-Prometheus-Stack Setup Guide

1. Create a namespace for metric resources:
```
kubectl create namespace metrics
```

2. Add the prometheus-community repo and get latest charts:
```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

3. Install kube-prometheus-stack using Helm:
```
helm install -n metrics kps prometheus-community/kube-prometheus-stack
```

4. Describe the kps-grafana service to determine its endpoint:
```
kubectl describe -n metrics svc/kps-grafana
```

5. Connect to the web interface through a browser using the target endpoint and port, as well as the credentials "admin/prom-operator"
