{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "codeveros-ui.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "codeveros-ui.fullname" -}}
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
{{- define "codeveros-ui.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "codeveros-ui.labels" -}}
helm.sh/chart: {{ include "codeveros-ui.chart" . }}
{{ include "codeveros-ui.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "codeveros-ui.selectorLabels" -}}
app.kubernetes.io/name: {{ include "codeveros-ui.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Create Gateway Service Endpoint
*/}}
{{- define "codeveros-ui.gatewayServiceEndpoint" -}}
{{- if .Values.gatewayServiceNameOverride -}}
{{- $serviceName := .Values.gatewayServiceNameOverride | trunc 63 | trimSuffix "-" -}}
{{- printf "http://%s:8080" $serviceName | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $serviceName := (printf "%s-%s" .Release.Name .Values.gatewayServiceName | trunc 63 | trimSuffix "-") -}}
{{- printf "http://%s:8080" $serviceName | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
