import { useState } from 'react';
import ReactFlow, { Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import DevOpsNode from './ArgocdNode'; // We kept the filename, but the component is now DevOpsNode
import { Play } from 'lucide-react';
import './index.css';

const nodeTypes = { custom: DevOpsNode };

const initialNodes = [
  { id: 'local', type: 'custom', position: { x: 50, y: 100 }, data: { label: 'Local Repo', type: 'local', active: false } },
  { id: 'remote', type: 'custom', position: { x: 350, y: 100 }, data: { label: 'GitHub (Remote)', type: 'git', active: false } },
  { id: 'cicd', type: 'custom', position: { x: 650, y: 100 }, data: { label: 'CI/CD Pipeline', type: 'server', active: false } },
];

const initialEdges = [
  { id: 'e-local-remote', source: 'local', target: 'remote', animated: false, style: { stroke: '#475569', strokeWidth: 2 } },
  { id: 'e-remote-cicd', source: 'remote', target: 'cicd', animated: false, style: { stroke: '#475569', strokeWidth: 2 } },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [packets, setPackets] = useState([]);

  const runAnimation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPackets([]);

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

    // 1. Developer commits locally
    setCurrentStep(1);
    setNodeActive('local', true);
    addPacket({ time: "0.000s", src: "Developer", dst: "Local Repo", proto: "Git", info: "git commit -m 'Update code'", size: "2 KB" });
    await wait(1200);

    // 2. Developer pushes to Remote
    setNodeActive('local', false);
    setEdgeActive('e-local-remote', true);
    setNodeActive('remote', true);
    addPacket({ time: "0.850s", src: "Local Repo", dst: "GitHub", proto: "HTTPS/SSH", info: "git push origin main", size: "45 KB" });
    await wait(1500);

    // 3. GitHub triggers CI/CD
    setEdgeActive('e-local-remote', false);
    setNodeActive('remote', false);
    setEdgeActive('e-remote-cicd', true);
    setNodeActive('cicd', true);
    setCurrentStep(2);
    addPacket({ time: "1.200s", src: "GitHub", dst: "CI/CD", proto: "Webhook", info: "POST /trigger-build", size: "1 KB" });
    await wait(1500);

    // 4. CI/CD Builds and Deploys
    addPacket({ time: "3.500s", src: "CI/CD", dst: "Production", proto: "Docker", info: "Deploy image v1.0.2", size: "150 MB" });
    await wait(1500);

    // Reset
    setEdgeActive('e-remote-cicd', false);
    setNodeActive('cicd', false);
    setCurrentStep(0);
    setIsAnimating(false);
  };

  return (
    <div className="app-container">
      <header className="top-header">
        <h1>DEVOPS EXPLORER</h1>
        <div className="header-progress">MODULE: GIT FUNDAMENTALS</div>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <h2>Lesson: The Git Workflow</h2>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
              Git is a distributed version control system. The standard workflow involves committing code locally, pushing it to a remote server (like GitHub), and triggering an automated CI/CD pipeline.
            </p>
          </div>
          
          <table className="overview-table">
            <tbody>
              <tr><td>Step</td><td>{currentStep === 0 ? "Ready" : `Step ${currentStep} of 2`}</td></tr>
              <tr><td>Current Action</td><td>{currentStep === 1 ? "Committing & Pushing" : currentStep === 2 ? "Triggering CI/CD" : "Idle"}</td></tr>
              <tr><td>Core Command</td><td>git push</td></tr>
            </tbody>
          </table>

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={runAnimation} 
              disabled={isAnimating}
              style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: isAnimating ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', gap: '8px', fontWeight: 'bold' }}
            >
              <Play size={18} /> {isAnimating ? 'RUNNING...' : 'START WORKFLOW'}
            </button>
          </div>
        </aside>

        <div className="diagram-area">
          <div className="diagram-canvas">
            <ReactFlow
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
            <div className="packet-header">
              TERMINAL & NETWORK LOG
            </div>
            <div className="packet-table-container">
              <table className="packet-table">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>TIME</th>
                    <th>SOURCE</th>
                    <th>DESTINATION</th>
                    <th>PROTOCOL</th>
                    <th>COMMAND / ACTION</th>
                    <th>SIZE</th>
                  </tr>
                </thead>
                <tbody>
                  {packets.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>
                        Ready to execute. Click "Start Workflow".
                      </td>
                    </tr>
                  ) : (
                    packets.map((pkt) => (
                      <tr key={pkt.id}>
                        <td>{pkt.id}</td>
                        <td>{pkt.time}</td>
                        <td>{pkt.src}</td>
                        <td>{pkt.dst}</td>
                        <td style={{ color: '#60a5fa' }}>{pkt.proto}</td>
                        <td>{pkt.info}</td>
                        <td>{pkt.size}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}