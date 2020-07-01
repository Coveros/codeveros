{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "codeveros-gateway.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "codeveros-gateway.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "codeveros-gateway.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "codeveros-gateway.labels" -}}
helm.sh/chart: {{ include "codeveros-gateway.chart" . }}
{{ include "codeveros-gateway.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "codeveros-gateway.selectorLabels" -}}
app.kubernetes.io/name: {{ include "codeveros-gateway.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Create Auth Service Endpoint
*/}}
{{- define "codeveros-gateway.authServiceEndpoint" -}}
{{- if .Values.authServiceNameOverride -}}
{{- $serviceName := .Values.authServiceNameOverride | trunc 63 | trimSuffix "-" -}}
{{- printf "http://%s:8080" $serviceName | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $serviceName := printf "%s-%s" .Release.Name .Values.authServiceName | trunc 63 | trimSuffix "-" -}}
{{- printf "http://%s:8080" $serviceName | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}

{{/*
Create Training Service Endpoint
*/}}
{{- define "codeveros-gateway.trainingServiceEndpoint" -}}
{{- if .Values.trainingServiceNameOverride -}}
{{- $serviceName := .Values.trainingServiceNameOverride | trunc 63 | trimSuffix "-" -}}
{{- printf "http://%s:8080" $serviceName | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $serviceName := (printf "%s-%s" .Release.Name .Values.trainingServiceName | trunc 63 | trimSuffix "-") -}}
{{- printf "http://%s:8080" $serviceName | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}

{{/*
Create User Service Endpoint
*/}}
{{- define "codeveros-gateway.userServiceEndpoint" -}}
{{- if .Values.userServiceNameOverride -}}
{{- $serviceName := .Values.userServiceNameOverride | trunc 63 | trimSuffix "-" -}}
{{- printf "http://%s:8080" $serviceName | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $serviceName := (printf "%s-%s" .Release.Name .Values.userServiceName | trunc 63 | trimSuffix "-") -}}
{{- printf "http://%s:8080" $serviceName | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
