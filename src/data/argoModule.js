export const argocdModule = {
  id: "argocd",
  title: "ArgoCD (GitOps)",
  desc: "ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It monitors your Git repository and automatically syncs the desired state to your cluster.",
  
  codeSnippet: {
    filename: "application.yaml",
    code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/username/repo.git'
    targetRevision: HEAD
    path: k8s-manifests
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`
  },

  nodes: [
    { id: 'git', type: 'custom', position: { x: 50, y: 100 }, data: { label: 'Git Repo', type: 'git' } },
    { id: 'argocd', type: 'custom', position: { x: 350, y: 100 }, data: { label: 'ArgoCD', type: 'local' } },
    { id: 'k8s', type: 'custom', position: { x: 650, y: 100 }, data: { label: 'K8s Cluster', type: 'server' } },
  ],
  edges: [
    { id: 'e-git-argocd', source: 'git', target: 'argocd', animated: false, style: { stroke: '#475569', strokeWidth: 2 } },
    { id: 'e-argocd-k8s', source: 'argocd', target: 'k8s', animated: false, style: { stroke: '#475569', strokeWidth: 2 } },
  ],
  quiz: {
    question: "In a GitOps workflow, what is the single source of truth?",
    options: ["The Kubernetes Cluster", "The CI/CD Pipeline", "The Git Repository", "The Docker Registry"],
    correctIndex: 2,
    explanation: "GitOps uses the Git repository as the single source of truth for the desired state of your infrastructure."
  }
};