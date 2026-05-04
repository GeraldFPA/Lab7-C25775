/**
 * Menú lateral con rejilla tipo “skill tree / SF selector” por fases.
 * API: setCourse(course), getTopicById(id), selectedTopicId
 */
class CourseSkillSidebar extends HTMLElement {
  constructor() {
    super();
    this._course = null;
    this._selectedTopicId = null;
    this._topicIndex = new Map();
  }

  connectedCallback() {
    this.classList.add("course-skill-sidebar");
    if (!this._course && window.COURSE_DATA) {
      this.setCourse(window.COURSE_DATA);
    }
  }

  setCourse(course) {
    this._course = course;
    this._topicIndex.clear();
    if (!course?.phases) {
      this.innerHTML = "";
      return;
    }
    for (const phase of course.phases) {
      for (const tid of Object.keys(phase.topics || {})) {
        this._topicIndex.set(tid, { topic: phase.topics[tid], phase });
      }
    }
    this.render();
  }

  getTopicById(id) {
    return this._topicIndex.get(id)?.topic || null;
  }

  get selectedTopicId() {
    return this._selectedTopicId;
  }

  set selectedTopicId(id) {
    this._selectedTopicId = id;
    this.updateSelectionUI();
  }

  render() {
    const course = this._course;
    if (!course) return;

    this.innerHTML = `
      <div class="sidebar-inner">
        <header class="sidebar-head">
          <p class="sidebar-kicker">Curso</p>
          <h2 class="sidebar-title"></h2>
        </header>
        <div class="phases-wrap"></div>
      </div>
    `;

    const titleEl = this.querySelector(".sidebar-title");
    titleEl.textContent = course.name;

    const wrap = this.querySelector(".phases-wrap");
    let phaseIndex = 0;

    for (const phase of course.phases) {
      const accent = phaseIndex % 2 === 0 ? "indigo" : "pink";
      const section = document.createElement("section");
      section.className = "phase-block";
      section.dataset.phaseId = phase.id;

      const head = document.createElement("div");
      head.className = "phase-head";
      const dot = document.createElement("span");
      dot.className = "phase-dot";
      dot.dataset.accent = accent;
      const name = document.createElement("span");
      name.className = "phase-name";
      name.textContent = phase.name;
      head.appendChild(dot);
      head.appendChild(name);

      const grid = document.createElement("div");
      grid.className = "skill-grid";
      grid.style.setProperty("--cols", String(phase.grid?.columns || 4));
      grid.setAttribute("role", "grid");
      grid.setAttribute("aria-label", `Temas: ${phase.name}`);

      const cells = phase.grid?.cells || [];
      cells.forEach((topicId, i) => {
        const cell = document.createElement("div");
        cell.className = "skill-cell";
        cell.setAttribute("role", "gridcell");
        if (!topicId) {
          cell.classList.add("skill-cell--empty");
          cell.setAttribute("aria-hidden", "true");
        } else {
          const topic = phase.topics[topicId];
          if (!topic) {
            cell.classList.add("skill-cell--empty");
          } else {
            const cube = document.createElement("topic-cube");
            cube.dataset.topicId = topic.id;
            cube.setAttribute("label", topic.shortLabel || topic.title?.slice(0, 8) || topic.id);
            cube.setAttribute("accent", accent);
            cube.addEventListener("cube-select", () => this.selectTopic(topic.id));
            cell.appendChild(cube);
          }
        }
        grid.appendChild(cell);
      });

      section.appendChild(head);
      section.appendChild(grid);
      wrap.appendChild(section);
      phaseIndex++;
    }

    this.updateSelectionUI();
  }

  selectTopic(topicId) {
    const topic = this.getTopicById(topicId);
    if (!topic) return;
    if (this._selectedTopicId === topicId) return;
    this._selectedTopicId = topicId;
    this.updateSelectionUI();
    this.dispatchEvent(
      new CustomEvent("course-topic-change", {
        bubbles: true,
        composed: true,
        detail: { topicId, topic },
      })
    );
  }

  updateSelectionUI() {
    this.querySelectorAll("topic-cube").forEach((cube) => {
      const id = cube.dataset.topicId;
      if (id === this._selectedTopicId) cube.setAttribute("selected", "");
      else cube.removeAttribute("selected");
    });
  }

}

customElements.define("course-skill-sidebar", CourseSkillSidebar);
