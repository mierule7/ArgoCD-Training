import { useState } from 'react';
import ReactFlow, { Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import DevOpsNode from './ArgocdNode'; 
import { Play } from 'lucide-react';
import './index.css';

// IMPORT THE MODULES
import { gitModule } from './data/gitModule';
import { dockerModule } from './data/dockerModule';
import { k8sModule } from './data/k8sModule';

const nodeTypes = { custom: DevOpsNode };

// CREATE A REGISTRY OF ALL MODULES
const MODULES = {
  git: gitModule,
  docker: dockerModule,
  k8s: k8sModule
};

export default function App() {
  const [currentModuleKey, setCurrentModuleKey] = useState('git');
  const [nodes, setNodes, onNodesChange] = useNodesState(MODULES['git'].nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(MODULES['git'].edges);
  const [isAnimating, setIsAnimating] = useState(false);
  const [packets, setPackets] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleModuleChange = (event) => {
    const newModuleKey = event.target.value;
    setCurrentModuleKey(newModuleKey);
    setNodes(MODULES[newModuleKey].nodes);
    setEdges(MODULES[newModuleKey].edges);
    setPackets([]);
    setShowQuiz(false);
  };

  const runAnimation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPackets([]);
    setShowQuiz(false);
    setSelectedAnswer(null);

    const setNodeActive = (id, active) => {
      setNodes((nds) => nds.map((node) => node.id === id ? { ...node, data: { ...node.data, active } } : node));
    };
    const setEdgeActive = (id, active) => {
      setEdges((eds) => eds.map((edge) => edge.id === id ? { ...edge, animated: active, style: { stroke: active ? '#3b82f6' : '#475569', strokeWidth: 2 } } : edge));
    };
    const addPacket = (packetData) => {
      setPackets((prev) => [...prev, { ...packetData, id: prev.length + 1 }]);
    };
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    if (currentModuleKey === 'git') {
      setNodeActive('local', true);
      addPacket({ time: "0.000s", src: "Developer", dst: "Local Repo", proto: "Git", info: "git commit", size: "2 KB" });
      await wait(1200);
      setNodeActive('local', false);
      setEdgeActive('e-local-remote', true);
      setNodeActive('remote', true);
      addPacket({ time: "0.850s", src: "Local Repo", dst: "GitHub", proto: "HTTPS", info: "git push origin main", size: "45 KB" });
      await wait(1500);
      setEdgeActive('e-local-remote', false);
      setNodeActive('remote', false);
      setEdgeActive('e-remote-cicd', true);
      setNodeActive('cicd', true);
      addPacket({ time: "1.200s", src: "GitHub", dst: "CI/CD", proto: "Webhook", info: "POST /trigger-build", size: "1 KB" });
      await wait(1500);
      setEdgeActive('e-remote-cicd', false);
      setNodeActive('cicd', false);
    } 
    else if (currentModuleKey === 'docker') {
      setNodeActive('code', true);
      setNodeActive('dockerfile', true);
      setEdgeActive('e-code-docker', true);
      addPacket({ time: "0.000s", src: "CLI", dst: "Docker Daemon", proto: "API", info: "docker build -t app:v1 .", size: "N/A" });
      await wait(1500);
      setEdgeActive('e-code-docker', false);
      setNodeActive('code', false);
      setEdgeActive('e-docker-registry', true);
      setNodeActive('registry', true);
      addPacket({ time: "1.500s", src: "Local", dst: "Registry", proto: "HTTPS", info: "docker push app:v1", size: "150 MB" });
      await wait(1500);
      setEdgeActive('e-docker-registry', false);
      setNodeActive('dockerfile', false);
      setNodeActive('registry', false);
    }
    else if (currentModuleKey === 'k8s') {
      setNodeActive('kubectl', true);
      setEdgeActive('e-kubectl-cp', true);
      setNodeActive('controlplane', true);
      addPacket({ time: "0.000s", src: "CLI", dst: "API Server", proto: "HTTPS", info: "kubectl apply -f deploy.yaml", size: "2 KB" });
      await wait(1500);
      setEdgeActive('e-kubectl-cp', false);
      setNodeActive('kubectl', false);
      setEdgeActive('e-cp-worker', true);
      setNodeActive('worker', true);
      addPacket({ time: "1.200s", src: "Scheduler", dst: "Kubelet", proto: "gRPC", info: "Assign Pod to Node", size: "500 B" });
      await wait(1500);
      setEdgeActive('e-cp-worker', false);
      setNodeActive('controlplane', false);
      setNodeActive('worker', false);
    }

    setIsAnimating(false);
    setShowQuiz(true); 
  };

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
  };

  const activeModule = MODULES[currentModuleKey];

  return (
    <div className="app-container">
      <header className="top-header">
        <h1>DEVOPS EXPLORER</h1>
        <div className="header-progress">MODULE: {currentModuleKey.toUpperCase()}</div>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <select 
            value={currentModuleKey} 
            onChange={handleModuleChange}
            style={{ width: '100%', padding: '10px', background: '#1e293b', color: 'white', border: '1px solid #334155', borderRadius: '4px', marginBottom: '20px', fontFamily: 'monospace', fontWeight: 'bold' }}
          >
            <option value="git">Module 1: Git Workflow</option>
            <option value="docker">Module 2: Docker Build</option>
            <option value="k8s">Module 3: Kubernetes Deploy</option>
          </select>

                    <h2>{activeModule.title}</h2>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
              {activeModule.desc}
            </p>
          </div>

          {/* ADD THIS NEW BLOCK */}
          {activeModule.codeSnippet && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #334155', 
                borderRadius: '6px', 
                overflow: 'hidden' 
              }}>
                {/* Filename Header */}
                <div style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#1e293b', 
                  borderBottom: '1px solid #334155',
                  fontSize: '12px',
                  color: '#94a3b8',
                  fontFamily: 'monospace',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                  <span style={{ marginLeft: '8px' }}>{activeModule.codeSnippet.filename}</span>
                </div>
                
                {/* The Code */}
                <pre style={{ 
                  margin: 0, 
                  padding: '12px', 
                  fontSize: '12px', 
                  color: '#e2e8f0', 
                  fontFamily: 'monospace',
                  overflowX: 'auto',
                  lineHeight: '1.4'
                }}>
                  <code>{activeModule.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}
          {/* END OF NEW BLOCK */}
          
          <button 
            onClick={runAnimation} 
            disabled={isAnimating}
            style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: isAnimating ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', gap: '8px', fontWeight: 'bold' }}
          >
            <Play size={18} /> {isAnimating ? 'RUNNING...' : 'START MODULE'}
          </button>
        </aside>

        <div className="diagram-area">
          <div className="diagram-canvas">
            <ReactFlow
              key={currentModuleKey}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background color="#1e293b" gap={20} />
            </ReactFlow>
          </div>

          <div className="packet-panel">
            <div className="packet-header">TERMINAL & NETWORK LOG</div>
            <div className="packet-table-container">
              <table className="packet-table">
                <thead>
                  <tr>
                    <th>NO.</th><th>TIME</th><th>SOURCE</th><th>DESTINATION</th><th>PROTOCOL</th><th>COMMAND / ACTION</th><th>SIZE</th>
                  </tr>
                </thead>
                <tbody>
                  {packets.length === 0 ? (
                    <tr><td colSpan="7" style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>Ready to execute. Click "Start Module".</td></tr>
                  ) : (
                    packets.map((pkt) => (
                      <tr key={pkt.id}>
                        <td>{pkt.id}</td><td>{pkt.time}</td><td>{pkt.src}</td><td>{pkt.dst}</td><td style={{ color: '#60a5fa' }}>{pkt.proto}</td><td>{pkt.info}</td><td>{pkt.size}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showQuiz && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Knowledge Check 🧠</h3>
            <p>{activeModule.quiz.question}</p>
            
            <div style={{ marginTop: '20px' }}>
              {activeModule.quiz.options.map((opt, index) => {
                let btnClass = "quiz-option";
                if (selectedAnswer !== null) {
                  if (index === activeModule.quiz.correctIndex) btnClass += " correct";
                  else if (index === selectedAnswer) btnClass += " wrong";
                }
                return (
                  <button key={index} className={btnClass} onClick={() => handleAnswerClick(index)}>
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div style={{ marginTop: '20px', padding: '15px', background: '#0f172a', borderRadius: '6px', borderLeft: '4px solid #3b82f6' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1' }}>
                  <strong>{selectedAnswer === activeModule.quiz.correctIndex ? "Correct! " : "Incorrect. "}</strong>
                  {activeModule.quiz.explanation}
                </p>
              </div>
            )}

            <button className="modal-close-btn" onClick={() => setShowQuiz(false)}>
              Close & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}