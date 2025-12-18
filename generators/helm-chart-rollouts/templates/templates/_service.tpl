{{- define "<%- appName %>.service" }}

apiVersion: v1
kind: Service
metadata:
  name: {{ default (include "<%- appName %>.fullname" .) .serviceName }}
  labels:
    {{- include "<%- appName %>.labels" . | nindent 4 }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: http
      protocol: TCP
      name: http
  selector:
    {{- include "<%- appName %>.selectorLabels" . | nindent 4 }}

{{- end }}