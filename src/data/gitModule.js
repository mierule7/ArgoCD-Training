export const gitModule = {
  id: "git",
  title: "The Git Workflow",
  desc: "Git is a distributed version control system. The standard workflow involves committing code locally, pushing it to a remote server, and triggering a CI/CD pipeline.",

  // ADD THIS NEW SNIPPET
  codeSnippet: {
    filename: "Local Setup (Terminal)",
    code: `# 1. Initialize a new local repository
  git init

  # 2. Add all files to the staging area
  git add .

  # 3. Commit the files with a message
  git commit -m "Initial commit"

  # 4. Link your local repo to GitHub
  git remote add origin https://github.com/username/repo.git

  # 5. Push to the main branch
  git branch -M main
  git push -u origin main`
  },

  nodes: [
    { id: 'local', type: 'custom', position: { x: 50, y: 100 }, data: { label: 'Local Repo', type: 'local' } },
    { id: 'remote', type: 'custom', position: { x: 350, y: 100 }, data: { label: 'GitHub', type: 'git' } },
    { id: 'cicd', type: 'custom', position: { x: 650, y: 100 }, data: { label: 'CI/CD Pipeline', type: 'server' } },
  ],
  edges: [
    { id: 'e-local-remote', source: 'local', target: 'remote', animated: false, style: { stroke: '#475569', strokeWidth: 2 } },
    { id: 'e-remote-cicd', source: 'remote', target: 'cicd', animated: false, style: { stroke: '#475569', strokeWidth: 2 } },
  ],
  quiz: {
    question: "Which command sends your local commits to the remote repository?",
    options: ["git commit -m 'msg'", "git push origin main", "git pull origin main", "git add ."],
    correctIndex: 1,
    explanation: "git push uploads your local repository content to a remote repository."
  }
};