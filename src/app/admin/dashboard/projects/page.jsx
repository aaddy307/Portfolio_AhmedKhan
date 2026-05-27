"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const emptyForm = {
  title: "",
  description: "",
  tags: "",
  category: [],
  githubUrl: "",
  figmaUrl: "",
  liveUrl: "",
  imageUrl: "",
};

const categoryOptions = ["CSS", "HTML", "Tailwind CSS", "Figma", "Client Work", "React", "Next.js"];

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok) {
        setForm((prev) => ({ ...prev, imageUrl: data.url }));
        toast.success("Image uploaded");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleCategoryToggle = (cat) => {
    setForm((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      title: form.title,
      description: form.description,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      category: form.category,
      githubUrl: form.githubUrl,
      figmaUrl: form.figmaUrl,
      liveUrl: form.liveUrl,
      imageUrl: form.imageUrl,
    };

    try {
      const url = editingId
        ? `/api/admin/projects/${editingId}`
        : "/api/admin/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(editingId ? "Project updated" : "Project created");
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(false);
        fetchProjects();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save");
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title || "",
      description: project.description || "",
      tags: (project.tags || []).join(", "),
      category: project.category || [],
      githubUrl: project.githubUrl || "",
      figmaUrl: project.figmaUrl || "",
      liveUrl: project.liveUrl || "",
      imageUrl: project.imageUrl || "",
    });
    setEditingId(project._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted");
        fetchProjects();
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">📁 Projects</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) {
              setForm(emptyForm);
              setEditingId(null);
            }
          }}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Project"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 mb-8 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">
            {editingId ? "Edit Project" : "New Project"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                placeholder="HTML, CSS, React"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-zinc-400 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">GitHub URL</label>
              <input
                type="url"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">Figma URL</label>
              <input
                type="url"
                value={form.figmaUrl}
                onChange={(e) => setForm({ ...form, figmaUrl: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">Live URL</label>
              <input
                type="url"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">Image</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-zinc-800 file:text-cyan-400 hover:file:bg-zinc-700"
                />
                {uploading && <div className="h-5 w-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />}
              </div>
              {form.imageUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={form.imageUrl} alt="preview" className="h-10 w-10 rounded object-cover" />
                  <span className="text-xs text-zinc-500 truncate">{form.imageUrl}</span>
                </div>
              )}
            </div>
          </div>

          {/* Category checkboxes */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Categories</label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    form.category.includes(cat)
                      ? "bg-cyan-600 border-cyan-500 text-white"
                      : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
            >
              {saving ? "Saving..." : editingId ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      )}

      {/* Projects table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          <p className="text-4xl mb-3">📁</p>
          <p>No projects yet. Click "Add Project" to create one.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Image</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Title</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium hidden md:table-cell">Tags</th>
                <th className="text-right py-3 px-4 text-zinc-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                  <td className="py-3 px-4">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt="" className="h-10 w-14 rounded object-cover" />
                    ) : (
                      <div className="h-10 w-14 rounded bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs">No img</div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-white font-medium">{project.title}</td>
                  <td className="py-3 px-4 text-zinc-400 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(project.tags || []).slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-zinc-800 rounded text-xs">{tag}</span>
                      ))}
                      {project.tags?.length > 3 && (
                        <span className="px-2 py-0.5 text-xs text-zinc-500">+{project.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="px-3 py-1.5 text-xs font-medium bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
