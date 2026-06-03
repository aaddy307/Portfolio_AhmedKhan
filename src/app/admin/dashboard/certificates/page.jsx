"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const emptyForm = {
  title: "",
  type: "",
  issuer: "",
  description: "",
  date: "",
  duration: "",
  imageUrl: "",
  certificateUrl: "",
};

const typeOptions = ["Course", "Program", "Webinar", "Recognition"];

export default function CertificatesAdmin() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchCertificates = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/certificates");
      if (res.ok) {
        const data = await res.json();
        setCertificates(data);
      }
    } catch {
      toast.error("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      title: form.title,
      type: form.type,
      issuer: form.issuer,
      description: form.description,
      date: form.date,
      duration: form.duration,
      imageUrl: form.imageUrl,
      certificateUrl: form.certificateUrl,
    };

    try {
      const url = editingId
        ? `/api/admin/certificates/${editingId}`
        : "/api/admin/certificates";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(editingId ? "Certificate updated" : "Certificate created");
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(false);
        fetchCertificates();
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

  const handleEdit = (cert) => {
    setForm({
      title: cert.title || "",
      type: cert.type || "",
      issuer: cert.issuer || "",
      description: cert.description || "",
      date: cert.date || "",
      duration: cert.duration || "",
      imageUrl: cert.imageUrl || "",
      certificateUrl: cert.certificateUrl || "",
    });
    setEditingId(cert._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    try {
      const res = await fetch(`/api/admin/certificates/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Certificate deleted");
        fetchCertificates();
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
        <h1 className="text-2xl font-bold text-white"><span aria-hidden="true">🏆</span> Certificates</h1>
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
          {showForm ? "Cancel" : "+ Add Certificate"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 mb-8 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">
            {editingId ? "Edit Certificate" : "New Certificate"}
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
              <label className="block text-sm text-zinc-400 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">Select type</option>
                {typeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">Issuer / Organization</label>
              <input
                type="text"
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">Date</label>
              <input
                type="text"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g. Nov 07, 2024"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">Duration</label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g. 1 Hour"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">Certificate Link URL</label>
              <input
                type="url"
                value={form.certificateUrl}
                onChange={(e) => setForm({ ...form, certificateUrl: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
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

            <div className="md:col-span-2">
              <label className="block text-sm text-zinc-400 mb-1">Certificate Image</label>
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

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
            >
              {saving ? "Saving..." : editingId ? "Update Certificate" : "Create Certificate"}
            </button>
          </div>
        </form>
      )}

      {/* Certificates grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          <p className="text-4xl mb-3" aria-hidden="true">🏆</p>
          <p>No certificates yet. Click "Add Certificate" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <div key={cert._id} className="bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden group">
              <div className="relative h-40 overflow-hidden">
                {cert.imageUrl ? (
                  <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                    <span className="text-3xl">🏆</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3">
                  <p className="text-white font-medium text-sm line-clamp-1">{cert.title}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-zinc-500 mb-1">{cert.issuer}</p>
                <p className="text-xs text-zinc-600 mb-3">{cert.date}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cert)}
                    className="flex-1 px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cert._id)}
                    className="flex-1 px-3 py-1.5 text-xs font-medium bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
