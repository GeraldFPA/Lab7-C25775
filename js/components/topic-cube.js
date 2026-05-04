/**
 * Cubo compacto de tema — estilo selector tipo rejilla.
 * Atributos: label, selected (boolean), accent ("indigo" | "pink")
 */
class TopicCube extends HTMLElement {
  static get observedAttributes() {
    return ["label", "selected", "accent", "disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");
    if (!this.hasAttribute("tabindex") && !this.hasAttribute("disabled")) {
      this.setAttribute("tabindex", "0");
    }
  }

  attributeChangedCallback() {
    this.render();
  }

  get label() {
    return this.getAttribute("label") || "?";
  }

  get selected() {
    return this.hasAttribute("selected");
  }

  get accent() {
    return this.getAttribute("accent") || "indigo";
  }

  render() {
    const disabled = this.hasAttribute("disabled");
    if (disabled) {
      this.removeAttribute("tabindex");
      this.setAttribute("aria-disabled", "true");
    } else {
      this.removeAttribute("aria-disabled");
      if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
    }

    const accentVar =
      this.accent === "pink"
        ? "var(--cube-accent-pink, #ec4899)"
        : "var(--cube-accent-indigo, #6366f1)";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --cube-face: #1e1e2a;
          --cube-edge: #14141c;
          --cube-highlight: ${accentVar};
          --cube-text: #e8e8ef;
          --cube-muted: #7a7a8c;
        }
        :host([disabled]) {
          opacity: 0.35;
          pointer-events: none;
        }
        button {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 52px;
          max-height: 58px;
          padding: 0.35rem 0.25rem;
          position: relative;
          font-family: var(--cube-font, "JetBrains Mono", ui-monospace, monospace);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--cube-text);
          background: linear-gradient(145deg, #2a2a38 0%, var(--cube-face) 45%, var(--cube-edge) 100%);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 0;
          clip-path: polygon(6% 0, 100% 0, 100% 94%, 94% 100%, 0 100%, 0 6%);
          box-shadow:
            0 0 0 1px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -2px 0 rgba(0, 0, 0, 0.35),
            0 4px 0 var(--cube-edge),
            0 5px 12px rgba(0, 0, 0, 0.45);
          transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.15s ease;
        }
        button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(236, 72, 153, 0.08) 100%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s ease;
        }
        button:hover::before {
          opacity: 1;
        }
        button:hover {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--cube-highlight) 55%, transparent);
          box-shadow:
            0 0 0 1px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 0 0 1px color-mix(in srgb, var(--cube-highlight) 40%, transparent),
            0 6px 0 var(--cube-edge),
            0 8px 20px rgba(99, 102, 241, 0.2);
        }
        button:active {
          transform: translateY(1px);
          box-shadow:
            0 0 0 1px rgba(0, 0, 0, 0.5),
            inset 0 2px 6px rgba(0, 0, 0, 0.35),
            0 2px 0 var(--cube-edge);
        }
        button:focus-visible {
          outline: 2px solid var(--cube-highlight);
          outline-offset: 2px;
        }
        :host([selected]) button {
          border-color: color-mix(in srgb, var(--cube-highlight) 70%, white);
          box-shadow:
            0 0 0 1px color-mix(in srgb, var(--cube-highlight) 50%, transparent),
            inset 0 0 20px color-mix(in srgb, var(--cube-highlight) 18%, transparent),
            0 4px 0 var(--cube-edge),
            0 0 24px color-mix(in srgb, var(--cube-highlight) 35%, transparent);
        }
        .label {
          text-align: center;
          line-height: 1.15;
          word-break: break-word;
          max-width: 100%;
        }
      </style>
      <button type="button" part="face" aria-pressed="${this.selected}">
        <span class="label">${this.escape(this.label)}</span>
      </button>
    `;

    const btn = this.shadowRoot.querySelector("button");
    btn.addEventListener("click", () => {
      if (!disabled) this.dispatchEvent(new CustomEvent("cube-select", { bubbles: true, composed: true }));
    });
  }

  escape(text) {
    const d = document.createElement("span");
    d.textContent = text;
    return d.innerHTML;
  }
}

customElements.define("topic-cube", TopicCube);
