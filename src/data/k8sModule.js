export const k8sModule = {
  id: "k8s",
  title: "Kubernetes Deployment",
  desc: "Kubernetes orchestrates your containers. You send YAML manifests to the Control Plane, which schedules Pods onto Worker Nodes.",
  
  // ADD THIS YAML SNIPPET
  codeSnippet: {
    filename: "deployment.yaml",
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web-app
        image: myregistry.com/app:v1
        ports:
        - containerPort: 3000`
  },

  nodes: [
    { id: 'kubectl', type: 'custom', position: { x: 50, y: 100 }, data: { label: 'kubectl CLI', type: 'local' } },
    { id: 'controlplane', type: 'custom', position: { x: 350, y: 100 }, data: { label: 'Control Plane', type: 'git' } },
    { id: 'worker', type: 'custom', position: { x: 650, y: 100 }, data: { label: 'Worker Node', type: 'server' } },
  ],
  edges: [
    { id: 'e-kubectl-cp', source: 'kubectl', target: 'controlplane', animated: false, style: { stroke: '#475569', strokeWidth: 2 } },
    { id: 'e-cp-worker', source: 'controlplane', target: 'worker', animated: false, style: { stroke: '#475569', strokeWidth: 2 } },
  ],
  quiz: {
    question: "Which component schedules Pods onto Worker Nodes?",
    options: ["kubelet", "kube-proxy", "kube-scheduler", "API Server"],
    correctIndex: 2,
    explanation: "The kube-scheduler watches for newly created Pods and selects a node for them to run on."
  }
};