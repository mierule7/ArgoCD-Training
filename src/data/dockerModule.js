export const dockerModule = {
  id: "docker",
  title: "Docker Build & Push",
  desc: "Docker packages your code into a container image. You build it locally, then push it to a registry where it can be pulled by servers.",
  
  // ADD THIS CODE SNIPPET:
  codeSnippet: {
    filename: "Dockerfile",
    code: `# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]`
  },

    // ... keep your existing nodes ...
  
  nodes: [
    { id: 'code', type: 'custom', position: { x: 50, y: 100 }, data: { label: 'Source Code', type: 'local' } },
    { id: 'dockerfile', type: 'custom', position: { x: 350, y: 100 }, data: { label: 'Dockerfile', type: 'docker' } },
    { id: 'registry', type: 'custom', position: { x: 650, y: 100 }, data: { label: 'Registry', type: 'server' } },
  ],
  edges: [
    { id: 'e-code-docker', source: 'code', target: 'dockerfile', animated: false, style: { stroke: '#475569', strokeWidth: 2 } },
    { id: 'e-docker-registry', source: 'dockerfile', target: 'registry', animated: false, style: { stroke: '#475569', strokeWidth: 2 } },
  ],
  quiz: {
    question: "What is the primary purpose of a Dockerfile?",
    options: ["To store the container image", "To define the instructions for building an image", "To run the container in production", "To manage Kubernetes pods"],
    correctIndex: 1,
    explanation: "A Dockerfile is a text document that contains all the commands to assemble an image."
  }
};