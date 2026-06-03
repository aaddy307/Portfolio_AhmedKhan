"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState({ projects: 0, certificates: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then(r => r.ok ? r.json() : []),
      fetch("/api/certificates").then(r => r.ok ? r.json() : []),
    ]).then(([projects, certificates]) => {
      setStats({ projects: projects.length, certificates: certificates.length });
    }).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-1">Overview of your portfolio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href="/admin/dashboard/projects"
          className="group bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-200"
        >
          <div className="text-3xl mb-2" aria-hidden="true">📁</div>
          <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{stats.projects}</div>
          <div className="text-zinc-400 text-sm mt-1">Projects</div>
        </Link>

        <Link href="/admin/dashboard/certificates"
          className="group bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-200"
        >
          <div className="text-3xl mb-2" aria-hidden="true">🏆</div>
          <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{stats.certificates}</div>
          <div className="text-zinc-400 text-sm mt-1">Certificates</div>
        </Link>
      </div>
    </div>
  );
}
