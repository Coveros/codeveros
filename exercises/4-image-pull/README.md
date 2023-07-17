# Image Pull

## Introduction

The following exercise will demonstrate failures with container images being unavailable.

N.B. Replace # with your assigned number in all references of "namespace#"

## Exercise

1. Go to "codeveros/charts" and edit the "codeveros-ui/values.yaml" file

2. Change the image tag to "nope", and save the file

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
   What is the status? What events are there?

6. Edit the "codeveros-ui/values.yaml" file again

7. Change the image tag to "latest" and save the file

8. Update the codeveros chart and re-deploy:
```
helm dependency update codeveros
helm upgrade -n namespace# codeveros codeveros
```

9. Check the status of your deployment:
```
kubectl get -n namespace# deployment codeveros-codeveros-ui --output=yaml
```

10. Examine the deployment and workload in the Kubernetes Dashboard.  
    What is the status?
