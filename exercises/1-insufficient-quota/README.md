# Insufficient Quota

## Introduction

The following exercise will demonstrate failures caused by insufficient resource quotas.

N.B. Replace # with your assigned number in all references of "namespace#"

## Exercise

1. Go to "codeveros/charts" and edit the "codeveros-ui/values.yaml" file

2. Increase the "replicaCount" value to at least 3, and save the file

3. Update the codeveros chart and re-deploy:
```
helm dependency update codeveros
helm upgrade -n namespace# codeveros codeveros
```

4. Check the status of your deployment:
```
kubectl get -n namespace# deployment codeveros-codeveros-ui --output=yaml
```

5. Examine the deployment and workload in the Kubernetes Dashboard.  
   What is the status? How many replicas are running? What events are there?

6. Edit the "codeveros-ui/values.yaml" file again

7. Decrease the "replicaCount" to 1 and save the file

8. Rollback the deployment upgrade:
```
helm rollback -n namespace# codeveros
```

9. Check the status of your deployment:
```
kubectl get -n namespace# deployment codeveros-codeveros-ui --output=yaml
```

10. Examine the deployment and workload in the Kubernetes Dashboard.  
    What is the status? How many replicas are running?
