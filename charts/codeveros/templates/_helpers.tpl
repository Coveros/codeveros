{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "codeveros.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "codeveros.fullname" -}}
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
{{- define "codeveros.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "codeveros.labels" -}}
helm.sh/chart: {{ include "codeveros.chart" . }}
{{ include "codeveros.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "codeveros.selectorLabels" -}}
app.kubernetes.io/name: {{ include "codeveros.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- define "codeveros.uiService" }}
  {{- printf "%s-codeveros-ui" .Release.Name }}
{{- end }}

{{- define "codeveros.gatewayService" }}
  {{- printf "%s-codeveros-gateway" .Release.Name }}
{{- end }}

{{/*
Create UI Service Endpoint
*/}}
{{- define "codeveros.uiEndpoint" -}}
  {{- include "codeveros.uiService" . | printf "http://%s:80" }}
{{- end }}

{{/*
Create Gateway Service Endpoint
*/}}
{{- define "codeveros.gatewayEndpoint" -}}
  {{- include "codeveros.gatewayService" . | printf "http://%s:8080" }}
{{- end }}
