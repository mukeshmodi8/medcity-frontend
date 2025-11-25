// mock-server.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// sample home page data (Frontend expects /api/pages/home)
app.get("/api/pages/home", (req, res) => {
  res.json({
    hero: {
      title: "Quality Health Care For Family",
      subtitle: "Caring For The Health And Well Being Of Family.",
      cta: "Learn More"
    },
    sections: [
      { id: 1, h1: "Our Services", p: "Best medical services in town" },
      { id: 2, h1: "Meet Doctors", p: "Experienced practitioners" }
    ]
  });
});

// generic pages endpoint for admin/editor testing
app.get("/api/pages/:slug", (req, res) => {
  const slug = req.params.slug;
  res.json({
    slug,
    data: {
      title: `Demo ${slug}`,
      hero: { title: `Demo hero for ${slug}`, subtitle: "Mock subtitle" },
      content: `<p>This comes from mock server for ${slug}</p>`
    }
  });
});

app.put("/api/pages/:slug", (req, res) => {
  console.log("Saved page", req.params.slug, req.body);
  // in mock we just echo back
  res.json({ ok: true, saved: req.body });
});

app.listen(PORT, () => {
  console.log("Mock backend running on http://localhost:" + PORT);
});
