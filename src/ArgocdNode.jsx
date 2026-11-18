import { Handle, Position } from 'reactflow';
import { Laptop, GitBranch, Server } from 'lucide-react';

export default function DevOpsNode({ data }) {
  let Icon = Laptop;
  if (data.type === 'git') Icon = GitBranch;
  if (data.type === 'server') Icon = Server;

  // Define colors based on node type
  const getBorderColor = () => {
    if (data.active) return '#3b82f6'; // Blue when active
    if (data.type === 'git') return '#f97316'; // Git Orange
    if (data.type === 'server') return '#10b981'; // Server Green
    return '#334155';
  };

  return (
    <div style={{
      background: '#1e293b',
      border: `2px solid ${getBorderColor()}`,
      borderRadius: '8px',
      padding: '12px 20px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: data.active ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none',
      transition: 'all 0.3s ease',
      minWidth: '150px'
    }}>
      <Handle type="target" position={Position.Left} style={{ background: '#64748b' }} />
      
      <Icon size={20} color={getBorderColor()} />
      <div style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '14px' }}>
        {data.label}
      </div>
      
      <Handle type="source" position={Position.Right} style={{ background: '#64748b' }} />
    </div>
  );
}