(function () {
  function firstTopicId(course) {
    for (const phase of course.phases || []) {
      const cells = phase.grid?.cells || [];
      for (const id of cells) {
        if (id && phase.topics?.[id]) return id;
      }
    }
    return null;
  }

  function init() {
    const course = window.COURSE_DATA;
    const sidebar = document.getElementById("courseSidebar");
    const panel = document.getElementById("topicPanel");

    if (!sidebar || !panel || !course) return;

    sidebar.setCourse(course);

    sidebar.addEventListener("course-topic-change", (e) => {
      panel.setTopic(e.detail.topic);
    });

    const first = firstTopicId(course);
    if (first) {
      sidebar.selectTopic(first);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
