# Failing Probes

## Introduction

The following exercise will demonstrate failures caused by incorrect container probes.

N.B. Replace # with your assigned number in all references of "namespace#"

## Exercise

### Readiness Probe

1. Go to "codeveros/charts" and edit the codeveros-auth-service deployment in "codeveros-auth-service/templates/deployment.yaml"

2. Modify the readinessProbe in the container spec to use the following exec, instead of httpGet:
```
readinessProbe:
  exec:
    command:
    - cat
    - /tmp/healthy
```

3. Save the deployment.yaml file and update the codeveros chart and re-deploy:
```
helm dependency update codeveros
helm upgrade -n namespace# codeveros codeveros
```

4. Check the status of your deployment:
```
kubectl get -n namespace# deployment codeveros-codeveros-auth-service --output=yaml
```

5. Examine the deployment and workload in the Kubernetes Dashboard.  
   What is the status? Is the codeveros-auth-service pod ready?
   What does events show for the Pod?

6. Verify the status of the readinessProbe by executing the command yourself:
```
kubectl get -n namespace# pods -l "app.kubernetes.io/name=codeveros-auth-service"
kubectl exec -n namespace# codeveros-codeveros-auth-service-<uuid> -- cat /tmp/healthy && echo $?
```

7. Edit the "codeveros-auth-service/templates/deployment.yaml" file

8. Modify the readinessProbe to use httpGet again:
```
readinessProbe:
  httpGet:
    path: /health-check
    port: http
```

9. Save the deployment.yaml file and update the codeveros chart and re-deploy:
```
helm dependency update codeveros
helm upgrade -n namespace# codeveros codeveros
```

10. Check the status of the codeveros-auth-service container.  Is it ready?

11. Verify the status of the readinessProbe by creating a port-forward and
opening a browser to the health-check URI:
```
kubectl port-forward -n namespace# svc/codeveros-codeveros-auth-service 8080:8080
curl http://localhost:8080/health-check
```

12. Cancel the port-forward by pressing Ctrl-C

### Liveness Probe

13. Edit the "codeveros-auth-service/templates/deployment.yaml" file

14.  Modify the livenessProbe to use a bad endpoint:
```
livenessProbe:
  httpGet:
    path: /bad-health-check
    port: http
```

15. Save the deployment.yaml file and update the codeveros chart and re-deploy:
```
helm dependency update codeveros
helm upgrade -n namespace# codeveros codeveros
```

16. Check the status of the codeveros-auth-service container.
```
kubectl describe -n namespace# pods -l "app.kubernetes.io/name=codeveros-auth-service"
```

17. Examine the deployment and workload in the Kubernetes Dashboard.  
    What is the status? What is the status of the codeveros-auth-service pod?
    What events are there?  How many times has it been restarted?

18. Edit the "codeveros-auth-service/templates/deployment.yaml" file again and fix the endpoint:
```
livenessProbe:
  httpGet:
    path: /health-check
    port: http
```

19. Save the deployment.yaml file and rollback the upgrade:
```
helm rollback -n namespace# codeveros
```

20. Check the status of the codeveros-auth-service container.
```
kubectl describe -n namespace# pods -l "app.kubernetes.io/name=codeveros-auth-service"
```
