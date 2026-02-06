'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  domain: string;
  createdAt: number;
}

interface Feedback {
  id: string;
  projectId: string;
  type: 'bug' | 'feature' | 'praise';
  message: string;
  email?: string;
  timestamp: number;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDomain, setNewProjectDomain] = useState('');

  // Load data from localStorage
  useEffect(() => {
    const storedProjects = localStorage.getItem('feedbackbox_projects');
    const storedFeedback = localStorage.getItem('feedbackbox_feedback');
    
    if (storedProjects) setProjects(JSON.parse(storedProjects));
    if (storedFeedback) setFeedback(JSON.parse(storedFeedback));
  }, []);

  // Save projects when they change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('feedbackbox_projects', JSON.stringify(projects));
    }
  }, [projects]);

  const createProject = () => {
    if (!newProjectName || !newProjectDomain) return;

    const newProject: Project = {
      id: `proj_${Date.now()}`,
      name: newProjectName,
      domain: newProjectDomain,
      createdAt: Date.now(),
    };

    setProjects([...projects, newProject]);
    setNewProjectName('');
    setNewProjectDomain('');
    setShowNewProject(false);
    setSelectedProject(newProject.id);
  };

  const deleteProject = (projectId: string) => {
    if (confirm('Delete this project? All feedback will be lost.')) {
      setProjects(projects.filter(p => p.id !== projectId));
      setFeedback(feedback.filter(f => f.projectId !== projectId));
      if (selectedProject === projectId) setSelectedProject(null);
    }
  };

  const filteredFeedback = feedback
    .filter(f => !selectedProject || f.projectId === selectedProject)
    .filter(f => filterType === 'all' || f.type === filterType)
    .sort((a, b) => b.timestamp - a.timestamp);

  const exportCSV = () => {
    const headers = ['Date', 'Type', 'Message', 'Email'];
    const rows = filteredFeedback.map(f => [
      new Date(f.timestamp).toLocaleString(),
      f.type,
      f.message.replace(/"/g, '""'),
      f.email || '',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedback-${Date.now()}.csv`;
    a.click();
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);
  const widgetCode = selectedProjectData ? `<script src="${window.location.origin}/widget.js?project=${selectedProjectData.id}"></script>` : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg" />
              <span className="text-xl font-bold text-white">FeedbackBox</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <button
            onClick={() => setShowNewProject(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-green-500/50"
          >
            + New Project
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Projects Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
              <h2 className="text-lg font-bold text-white mb-4">Projects</h2>
              {projects.length === 0 ? (
                <p className="text-gray-400 text-sm">No projects yet</p>
              ) : (
                <div className="space-y-2">
                  {projects.map(project => (
                    <div
                      key={project.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedProject === project.id
                          ? 'bg-green-500/20 border border-green-500/50'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{project.name}</p>
                          <p className="text-gray-400 text-xs truncate">{project.domain}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project.id);
                          }}
                          className="text-gray-400 hover:text-red-400 ml-2"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Widget Code */}
            {selectedProjectData && (
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 mt-6">
                <h2 className="text-lg font-bold text-white mb-4">Widget Code</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Add this to your website:
                </p>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                  <code className="text-green-400 text-xs break-all">
                    {widgetCode}
                  </code>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(widgetCode);
                    alert('Copied to clipboard!');
                  }}
                  className="mt-4 w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all border border-white/20"
                >
                  Copy Code
                </button>
              </div>
            )}
          </div>

          {/* Feedback List */}
          <div className="lg:col-span-3">
            {!selectedProject ? (
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-12 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Select a project</h3>
                <p className="text-gray-400">Choose a project from the left to view feedback</p>
              </div>
            ) : (
              <>
                {/* Filters & Actions */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex gap-2">
                      {['all', 'bug', 'feature', 'praise'].map(type => (
                        <button
                          key={type}
                          onClick={() => setFilterType(type)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            filterType === type
                              ? 'bg-green-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                    {filteredFeedback.length > 0 && (
                      <button
                        onClick={exportCSV}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all border border-white/20"
                      >
                        Export CSV
                      </button>
                    )}
                  </div>
                </div>

                {/* Feedback Items */}
                {filteredFeedback.length === 0 ? (
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-12 text-center">
                    <p className="text-gray-400">No feedback yet. Install the widget to start collecting!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFeedback.map(item => (
                      <div
                        key={item.id}
                        className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                item.type === 'bug'
                                  ? 'bg-red-500/20 text-red-400'
                                  : item.type === 'feature'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'bg-green-500/20 text-green-400'
                              }`}
                            >
                              {item.type}
                            </span>
                            {item.email && (
                              <span className="text-gray-400 text-sm">{item.email}</span>
                            )}
                          </div>
                          <span className="text-gray-500 text-sm">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-200">{item.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-white/10 p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Project</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Project Name</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="My Awesome App"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Domain</label>
                <input
                  type="text"
                  value={newProjectDomain}
                  onChange={(e) => setNewProjectDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowNewProject(false)}
                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all border border-white/20"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                disabled={!newProjectName || !newProjectDomain}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/50"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
