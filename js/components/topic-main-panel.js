/**
 * Panel principal del tema: vídeo largo, capítulos opcionales, highlights siempre.
 */
class TopicMainPanel extends HTMLElement {
  constructor() {
    super();
    this._topic = null;
    this._mainYoutubeId = "";
    this._mainStart = 0;
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.renderShell();
  }

  setTopic(topic) {
    this._topic = topic;
    this._mainStart = 0;
    if (topic?.fullVideo?.youtubeId) {
      this._mainYoutubeId = topic.fullVideo.youtubeId;
    } else {
      this._mainYoutubeId = "";
    }
    this.renderContent();
  }

  embedUrl(youtubeId, startSeconds = 0) {
    if (!youtubeId) return "";
    const start = Math.max(0, Math.floor(startSeconds || 0));
    const base = `https://www.youtube-nocookie.com/embed/${youtubeId}`;
    const q = start > 0 ? `?start=${start}&rel=0` : "?rel=0";
    return base + q;
  }

  formatTime(totalSeconds) {
    const s = Math.floor(totalSeconds);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  renderShell() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --panel-bg: #12121a;
          --panel-border: rgba(99, 102, 241, 0.22);
          --text: #e8e8ef;
          --muted: #9898a8;
          --indigo: #6366f1;
          --pink: #ec4899;
          font-family: "DM Sans", system-ui, sans-serif;
          color: var(--text);
        }
        .panel {
          background: var(--panel-bg);
          border: 1px solid var(--panel-border);
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35), 0 16px 48px rgba(0, 0, 0, 0.35);
        }
        .hero {
          padding: 1rem 1.15rem 0.85rem;
          border-bottom: 1px solid var(--panel-border);
          background: linear-gradient(125deg, rgba(99, 102, 241, 0.08), rgba(236, 72, 153, 0.05));
        }
        h2 {
          margin: 0 0 0.35rem;
          font-size: 1.35rem;
          letter-spacing: -0.02em;
        }
        .desc {
          margin: 0;
          font-size: 0.9rem;
          color: var(--muted);
          max-width: 72ch;
        }
        .video-block {
          position: relative;
          aspect-ratio: 16 / 9;
          background: #000;
        }
        iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .section {
          padding: 1rem 1.15rem 1.15rem;
        }
        .section + .section {
          border-top: 1px solid var(--panel-border);
        }
        .section-title {
          margin: 0 0 0.65rem;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .section-title span.tag {
          font-size: 0.65rem;
          padding: 0.15rem 0.45rem;
          border: 1px solid var(--panel-border);
          color: var(--text);
          letter-spacing: 0.05em;
        }
        .section-title span.tag--pink {
          border-color: rgba(236, 72, 153, 0.45);
          color: var(--pink);
        }
        .section-title span.tag--indigo {
          border-color: rgba(99, 102, 241, 0.45);
          color: var(--indigo);
        }
        .chapters {
          display: grid;
          gap: 0.65rem;
        }
        @media (min-width: 640px) {
          .chapters {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          }
        }
        .chapter-card {
          border: 1px solid var(--panel-border);
          background: rgba(26, 26, 38, 0.85);
          padding: 0.65rem 0.75rem;
          text-align: left;
          cursor: pointer;
          color: inherit;
          font: inherit;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
        }
        .chapter-card:hover {
          border-color: rgba(236, 72, 153, 0.45);
          box-shadow: 0 0 0 1px rgba(236, 72, 153, 0.12);
        }
        .chapter-card h4 {
          margin: 0 0 0.25rem;
          font-size: 0.9rem;
        }
        .chapter-card p {
          margin: 0;
          font-size: 0.78rem;
          color: var(--muted);
        }
        .highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .hl-btn {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 0.72rem;
          padding: 0.4rem 0.65rem;
          border: 1px solid rgba(99, 102, 241, 0.4);
          background: rgba(99, 102, 241, 0.12);
          color: var(--text);
          cursor: pointer;
          border-radius: 0;
          clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .hl-btn:hover {
          background: rgba(99, 102, 241, 0.22);
          border-color: rgba(236, 72, 153, 0.55);
        }
        .hl-btn .time {
          opacity: 0.75;
          margin-left: 0.35rem;
          color: var(--pink);
        }
        .empty {
          padding: 2rem;
          text-align: center;
          color: var(--muted);
        }
        .video-caption {
          margin: 0.5rem 1.15rem 0.75rem;
          font-size: 0.8rem;
          color: var(--muted);
        }
      </style>
      <div class="panel" part="panel">
        <div class="empty">Selecciona un tema en la rejilla.</div>
      </div>
    `;
  }

  renderContent() {
    const root = this.shadowRoot.querySelector(".panel");
    if (!root) return;

    const topic = this._topic;
    if (!topic) {
      root.innerHTML = `<div class="empty">Selecciona un tema en la rejilla.</div>`;
      return;
    }

    const chapters = Array.isArray(topic.chapters) ? topic.chapters : [];
    const highlights = Array.isArray(topic.highlights) ? topic.highlights : [];
    const mainTitle = topic.fullVideo?.title || "Vídeo del tema";

    root.innerHTML = `
      <div class="hero">
        <h2>${this._esc(topic.title)}</h2>
        <p class="desc">${this._esc(topic.description || "")}</p>
      </div>
      <div class="video-block" part="video">
        <iframe
          title="${this._esc(mainTitle)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          src="${this._esc(this.embedUrl(this._mainYoutubeId, this._mainStart))}"
        ></iframe>
      </div>
      <p class="video-caption" part="caption">${this._esc(mainTitle)} · sesión completa</p>
      ${
        chapters.length
          ? `
      <div class="section" part="chapters">
        <h3 class="section-title">
          Capítulos resumidos
          <span class="tag tag--pink">opcional</span>
        </h3>
        <div class="chapters"></div>
      </div>`
          : ""
      }
      <div class="section" part="highlights">
        <h3 class="section-title">
          Highlights
          <span class="tag tag--indigo">siempre</span>
        </h3>
        <div class="highlights"></div>
      </div>
    `;

    const hlWrap = root.querySelector(".highlights");
    const captionEl = root.querySelector(".video-caption");

    highlights.forEach((h) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hl-btn";
      btn.innerHTML = `${this._esc(h.label)}<span class="time">${this._esc(this.formatTime(h.startSeconds || 0))}</span>`;
      btn.addEventListener("click", () => {
        this._mainYoutubeId = topic.fullVideo.youtubeId;
        this._mainStart = h.startSeconds || 0;
        const iframe = root.querySelector(".video-block iframe");
        if (iframe) {
          iframe.src = this.embedUrl(this._mainYoutubeId, this._mainStart);
        }
        if (captionEl) {
          captionEl.textContent = `Highlight: ${h.label} · ${mainTitle}`;
        }
      });
      hlWrap.appendChild(btn);
    });

    if (!highlights.length && hlWrap) {
      hlWrap.innerHTML = `<span style="color:var(--muted);font-size:0.85rem;">Sin marcas de tiempo en este tema.</span>`;
    }

    if (chapters.length) {
      const chWrap = root.querySelector(".chapters");
      chapters.forEach((ch) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "chapter-card";
        card.innerHTML = `
          <h4>${this._esc(ch.title)}</h4>
          <p>${this._esc(ch.description || "")}</p>
        `;
        card.addEventListener("click", () => {
          this._mainYoutubeId = ch.youtubeId;
          this._mainStart = 0;
          const iframe = root.querySelector(".video-block iframe");
          if (iframe) {
            iframe.src = this.embedUrl(this._mainYoutubeId, 0);
            iframe.title = ch.title;
          }
          const cap = root.querySelector(".video-caption");
          if (cap) {
            cap.textContent = `Capítulo: ${ch.title}`;
          }
        });
        chWrap.appendChild(card);
      });
    }
  }

  _esc(s) {
    const d = document.createElement("span");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }
}

customElements.define("topic-main-panel", TopicMainPanel);
