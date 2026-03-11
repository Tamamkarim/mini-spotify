import React from "react";

export default function Upload() {
  return (
    <div className="card" style={{ maxWidth: 420, margin: "40px auto", padding: 32 }}>
      <div className="section-title" style={{ textAlign: "center", marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
        Lisää uusi kappale
      </div>
      <form style={{ display: "grid", gap: 16 }}>
        <label style={{ fontWeight: 500 }}>
          Kappaleen nimi
          <input type="text" placeholder="Syötä kappaleen nimi" style={{ width: "100%", marginTop: 4 }} />
        </label>
        <label style={{ fontWeight: 500 }}>
          Artisti
          <input type="text" placeholder="Syötä artistin nimi" style={{ width: "100%", marginTop: 4 }} />
        </label>
        <label style={{ fontWeight: 500 }}>
          Tiedosto
          <input type="file" style={{ width: "100%", marginTop: 4 }} />
        </label>
        <button className="primary-btn" style={{ justifySelf: "end", marginTop: 12 }} type="submit">
          Lataa
        </button>
      </form>
    </div>
  );
}
