# Limit Ranges

## Introduction

The following exercise will demonstrate failures caused by invalid resource requests and limits.

N.B. Replace # with your assigned number in all references of "namespace#"

## Exercise

1. Check the default resource request and limit for your namespace
```
kubectl describe ns namespace#
```

2. Go to "codeveros/charts" and edit the codeveros-user-service deployment in "codeveros-user-service/templates/deployment.yaml"

3. Add a CPU resource request to the template at the end of the container spec:
```
resources:
  requests:
    cpu: 600m
```

4. Save the deployment.yaml file

5. Update the codeveros chart and re-deploy:
```
helm dependency update codeveros
helm upgrade -n namespace# codeveros codeveros
```

3. Check the status of your deployment (Replace # with your assigned number):
```
kubectl get -n namespace# deployment codeveros-codeveros-user-service --output=yaml
```

4. Examine the deployment and workload in the Kubernetes Dashboard.  
   What is the status? How many pods are running for codeveros-user-service?
   What does events show?

5. Edit the "codeveros-user-service/templates/deployment.yaml" file again

6. Add a CPU resource limit to the template at the end of the container spec:
```
resources:
  requests:
    cpu: 600m
  limits:
    cpu: 600m
```

7. Save the deployment.yaml file and update the codeveros chart and re-deploy:
```
helm dependency update codeveros
helm upgrade -n namespace# codeveros codeveros
```

7. Check the status of your deployment:
```
kubectl get -n namespace# deployment codeveros-codeveros-user-service --output=yaml
```

8. Examine the deployment and workload in the Kubernetes Dashboard.  
   What is the status? Why did that work?

## Bonus

9. Examine the resource consumption of a node:
```
kubectl describe nodes $NODE_NAME
```

10. Edit the "codeveros-user-service/templates/deployment.yaml" file again

11. Add a Memory resource request of 12GB to the container spec:
```
resources:
  requests:
    cpu: 600m
    memory: 12G
  limits:
    cpu: 600m
```

12. Save the deployment.yaml file and update the codeveros chart and re-deploy:
```
helm dependency update codeveros
helm upgrade -n namespace# codeveros codeveros
```

13. Check the status of your deployment:
```
kubectl get -n namespace# deployment codeveros-codeveros-user-service --output=yaml
```

14. Examine the deployment and workload in the Kubernetes Dashboard.  
    What is the status? What events happened?

15. Rollback the deployment upgrade:
```
helm rollback -n namespace# codeveros
```

16. Edit the "codeveros-user-service/templates/deployment.yaml" file and remove the memory request

17. Save the deployment.yaml file
