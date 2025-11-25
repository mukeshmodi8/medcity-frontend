import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaUpload,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";

const PRIMARY_COLOR = "#21CDC0";
const SECONDARY_COLOR = "#283B6A";
const API_BASE = "https://medcity-backend-t66f.onrender.com";


const GALLERY_LS_KEY = "galleryImages";

const addLocalIds = (arr) =>
  (arr || []).map((img, idx) => ({
    ...img,
    _localId: img._localId || img._id || Date.now() + idx,
  }));

const GalleryItemEditor = ({
  image,
  onDelete,
  onChange,
  onImageFileChange,
}) => (
  <div
    className="bg-white p-4 rounded-xl shadow-lg border-l-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    style={{ borderColor: PRIMARY_COLOR }}
  >
    <div className="flex items-center gap-4 w-full sm:w-2/3">
      <img
        src={image.src || "https://via.placeholder.com/80x80?text=Img"}
        alt={image.alt}
        className="w-16 h-16 object-cover rounded-lg border border-gray-300 flex-shrink-0"
      />
      <div className="flex-1 min-w-0 space-y-2">
        <input
          type="text"
          value={image.alt || ""}
          onChange={(e) => onChange(image._localId, "alt", e.target.value)}
          placeholder="Image Alt Text / Description"
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        />
        <input
          type="text"
          value={image.src || ""}
          onChange={(e) => onChange(image._localId, "src", e.target.value)}
          placeholder="Image URL / Path"
          className="w-full p-2 border border-gray-300 rounded-md text-xs text-gray-700"
        />

        {/* ✅ File upload input + button */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <input
            id={`gallery-file-${image._localId}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              onImageFileChange(image._localId, e.target.files?.[0] || null)
            }
          />
          <label
            htmlFor={`gallery-file-${image._localId}`}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
          >
            <FaUpload /> Upload Image
          </label>
          <span className="text-[10px] text-gray-400">
            (base64 ke रूप me DB me save hogi)
          </span>
        </div>
      </div>
    </div>

    {/* Actions */}
    <div className="flex gap-2 w-full sm:w-auto sm:flex-shrink-0">
      <button
        className="flex-1 sm:flex-none px-3 py-2 text-sm text-gray-700 rounded-md bg-gray-100 hover:bg-gray-200"
        title="View"
        type="button"
        onClick={() => {
          if (image.src) window.open(image.src, "_blank");
        }}
      >
        <FaEye className="inline mr-1" /> View
      </button>
      <button
        className="flex-1 sm:flex-none px-3 py-2 text-sm text-white rounded-md bg-red-500 hover:bg-red-600 transition"
        onClick={() => onDelete(image._localId)}
        type="button"
      >
        <FaTrashAlt className="inline mr-1" /> Delete
      </button>
    </div>
  </div>
);

export default function AdminGalleryEditor() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔹 Backend se gallery load
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/gallery`);
        const data = await res.json();

        console.log("📥 LOADED GALLERY:", data);

        if (ignore) return;

        if (Array.isArray(data.images)) {
          const withIds = addLocalIds(data.images);
          setImages(withIds);

          // ⭐ Admin panel se jo gallery load hui, use localStorage me bhi save karo
          try {
            localStorage.setItem(
              GALLERY_LS_KEY,
              JSON.stringify(data.images || [])
            );
          } catch (e) {
            console.error("Failed to save gallery to localStorage:", e);
          }
        } else {
          setImages([]);
        }
      } catch (err) {
        console.error("Gallery load error:", err);
        if (!ignore) setImages([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleAddImage = () => {
    const newImg = {
      _localId: Date.now(),
      src: "",
      alt: "New Image Title",
    };
    setImages((prev) => [...prev, newImg]);
  };

  const handleDeleteImage = (localId) => {
    if (!window.confirm("Do you really want to delete this image?")) return;
    setImages((prev) => prev.filter((img) => img._localId !== localId));
  };

  const handleImageChange = (localId, field, value) => {
    setImages((prev) =>
      prev.map((img) =>
        img._localId === localId ? { ...img, [field]: value } : img
      )
    );
  };

  // ✅ File se base64 me convert
  const handleImageFileChange = (localId, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;

      setImages((prev) =>
        prev.map((img) =>
          img._localId === localId ? { ...img, src: base64 } : img
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const saveGalleryToDB = async () => {
    try {
      setSaving(true);

      const payloadImages = images.map(({ _localId, _id, ...rest }) => rest);

      const res = await fetch(`${API_BASE}/gallery`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: payloadImages }),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Save error body:", txt);
        throw new Error("Request failed");
      }

      const data = await res.json();
      console.log("💾 Gallery save response:", data);

      // ✅ DB se aayi latest list ko state me daalo
      const withIds = addLocalIds(data.images || []);
      setImages(withIds);

      // ⭐ Yahi latest gallery ko localStorage me bhi save karo
      try {
        const toStore = data.images && data.images.length > 0
          ? data.images
          : payloadImages;

        localStorage.setItem(GALLERY_LS_KEY, JSON.stringify(toStore));
      } catch (e) {
        console.error("Failed to update localStorage after save:", e);
      }

      alert("✅ Gallery saved to database!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save gallery");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="p-4 md:p-8 min-h-screen"
      style={{ backgroundColor: "#f4f7f9" }}
    >
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h1
            className="text-3xl font-extrabold mb-2"
            style={{ color: SECONDARY_COLOR }}
          >
            Gallery Management
          </h1>
          <p className="text-gray-500">
            Manage the photo gallery. Add new images, edit descriptions, or
            remove existing photos.
          </p>
        </div>

        <button
          onClick={saveGalleryToDB}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 shadow-md"
          style={{ backgroundColor: PRIMARY_COLOR, opacity: saving ? 0.7 : 1 }}
          type="button"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FaCheckCircle />
          )}
          {saving ? "Saving..." : "Save Gallery"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={handleAddImage}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 shadow-md"
          style={{ backgroundColor: PRIMARY_COLOR }}
          type="button"
        >
          <FaPlus /> Add New Image
        </button>

        <button
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 shadow-md"
          style={{ backgroundColor: SECONDARY_COLOR }}
          type="button"
        >
          <FaUpload /> Upload Multiple Photos
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading gallery...</div>
      ) : (
        <div className="space-y-6">
          {images.map((image) => (
            <GalleryItemEditor
              key={image._localId}
              image={image}
              onDelete={handleDeleteImage}
              onChange={handleImageChange}
              onImageFileChange={handleImageFileChange}
            />
          ))}

          {images.length === 0 && (
            <div className="text-gray-400 italic">No images added yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
