# DevOps Explorer 🚀

An interactive, visual learning platform designed to help beginners and developers understand modern DevOps workflows.

Instead of just reading documentation, users can watch data flow between tools step-by-step, inspect real configuration files (like Dockerfiles and YAML), and test their knowledge with built-in quizzes.

## 🌟 Features

- **Interactive Architecture Diagrams:** Uses React Flow to animate data packets moving between nodes (e.g., Git → Docker → Kubernetes).
- **Live Terminal Log:** A real-time table that logs commands and API calls as the animation plays.
- **Code Snippet Viewer:** Displays syntax-highlighted code snippets (Dockerfiles, K8s manifests) inside a Mac-style editor window.
- **Knowledge Checks:** Modal quizzes at the end of each module to reinforce learning, complete with explanations.
- **Progress Tracking:** Uses browser `localStorage` to save completed modules so users don't lose their progress.
- **Modular Architecture:** Adding new modules (like Terraform or Prometheus) only requires adding a simple data file.

## 📚 Modules Included

1.  **Git Workflow:** Local Repo → GitHub → CI/CD Pipeline
2.  **Docker Build:** Source Code → Dockerfile → Registry
3.  **Kubernetes Deploy:** kubectl → Control Plane → Worker Node
4.  **ArgoCD (GitOps):** Git Repo → ArgoCD → K8s Cluster

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Diagramming:** [React Flow](https://reactflow.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Custom CSS (Dark Mode)
- **Deployment:** Render

## 🚀 Getting Started (Local Development)

To run this project locally on your machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/mierule7/ArgoCD-Training.git
   ```

2. Navigate into the project folder:

```bash
cd ArgoCD-Training
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open http://localhost:5173 in your browser.

🧠 How to Add a New Module
The app is designed to be highly scalable. To add a new module:

Create a new file in src/data/ (e.g., terraformModule.js).

Export an object containing title, desc, nodes, edges, codeSnippet, and a quiz.

Import the module in src/App.jsx and add it to the MODULES object.

### 2. Add the Live Link to GitHub

1. Go to your GitHub repo: `https://github.com/mierule7/ArgoCD-Training`
2. On the right side of the screen, click the **⚙️ (gear icon)** next to **"About"**.
3. Paste your Render URL (e.g., `https://devops-explorer.onrender.com`) into the **Website** field.
4. In the **Topics** box, add: `react`, `vite`, `devops`, `education`, `react-flow`, `kubernetes`, `argocd`, `gitops`.
5. Click **Save changes**.

### 3. LinkedIn / Resume Blurb

If you post this on LinkedIn, here is a template you can use:

> **I built a visual DevOps learning platform! 🚀**
>
> Understanding how tools like Git, Docker, Kubernetes, and ArgoCD interact can be overwhelming. So, I built **DevOps Explorer**—an interactive web app that animates the data flow between these tools.
>
> **Key features:**
> ✅ Interactive architecture diagrams using React Flow
> ✅ Live terminal logging and Mac-style code snippet viewers
> ✅ Built-in knowledge quizzes with persistent progress tracking
> ✅ Fully responsive dark-mode UI
>
> **Tech Stack:** React, Vite, React Flow, CSS.
>
> Check out the live app here: [Your Render Link]
> View the code on GitHub: https://github.com/mierule7/ArgoCD-Training.git
>
> #DevOps #React #WebDevelopment #Portfolio #GitOps
