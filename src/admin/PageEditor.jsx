import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePageContent from "../hooks/usePageContent";
import { uploadFileToApi } from "../api/uploads";
import api from "../api/client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function PageEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = usePageContent(slug);
  const [local, setLocal] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && data) setLocal(data);
    if (!loading && !data) setLocal({ title: "", subtitle: "", heroImageUrl: "", sectionsHtml: "" });
  }, [data, loading]);

  if (!slug) return <div>Select page</div>;
  if (loading && !local) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">Error loading page: {error.message}</div>;

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    try {
      setSaving(true);
      const payload = { ...local };

      if (file) {
        const res = await uploadFileToApi(file, (p) => setUploadProgress(p));
        payload.heroImageUrl = res.url;
      }
      await api.put(`/api/pages/${encodeURIComponent(slug)}`, payload);
      alert("Saved successfully");
      setFile(null);
      setUploadProgress(null);
    } catch (err) {
      console.error(err);
      alert("Save failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Editing: {slug}</h1>
        <button onClick={() => navigate("/admin")} className="text-sm text-gray-600">Back</button>
      </div>

      <form onSubmit={handleSave} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium">Title (H1)</label>
          <input className="w-full mt-1 border rounded px-3 py-2" value={local.title || ""} onChange={(e) => setLocal({ ...local, title: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium">Subtitle (H2)</label>
          <input className="w-full mt-1 border rounded px-3 py-2" value={local.subtitle || ""} onChange={(e) => setLocal({ ...local, subtitle: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium">Hero Image</label>
          <div className="flex items-center gap-4 mt-2">
            <input type="file" onChange={handleFileChange} />
            {local.heroImageUrl && !file && <img src={local.heroImageUrl} alt="hero" className="w-36 h-20 object-cover rounded" />}
            {file && <div>Selected: {file.name} {uploadProgress ? ` - ${uploadProgress}%` : ""}</div>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <ReactQuill theme="snow" value={local.sectionsHtml || ""} onChange={(v) => setLocal({ ...local, sectionsHtml: v })} />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded">
            {saving ? "Saving..." : "Save Page"}
          </button>
          <button type="button" onClick={() => { setLocal({ title: "", subtitle: "", sectionsHtml: "", heroImageUrl: "" }); setFile(null); }} className="px-3 py-2 border rounded">Reset</button>
        </div>
      </form>
    </div>
  );
}
