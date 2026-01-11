---
created: "2024-04-22 20:39"
modified: "2024-05-21 16:59"
aliases: Kubernetes, k8s
---

## 架构

### kubernetes-master

- kube-apiserver
- kube-controller
- kube-scheduler
- etcd

### kubernetes-node

service - pod - container - node

- kube-proxy
- kubelet

### kubernetes-client

- kubeadmin

## 部署

- kubespray
- RKE