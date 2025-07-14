document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  cursos.forEach(curso => {
    curso.addEventListener("click", (e) => {
      e.preventDefault();
      curso.classList.toggle("completed");
      console.log(`Clicked: ${curso.dataset.id}`);
      actualizarCursos();
    });
  });

  function actualizarCursos() {
    const completados = new Set(
      [...document.querySelectorAll(".curso.completed")].map(c => c.dataset.id).filter(Boolean)
    );

    console.log("Cursos completados:", [...completados]);

    cursos.forEach(curso => {
      const prereqs = curso.dataset.prereq ? curso.dataset.prereq.split(',').map(s => s.trim()) : [];
      const desbloqueado = prereqs.every(p => completados.has(p));
      console.log(`Curso ${curso.dataset.id} desbloqueado: ${desbloqueado}`);

      if (!curso.classList.contains("completed") && desbloqueado) {
        curso.classList.add("unlocked");
      } else {
        curso.classList.remove("unlocked");
      }
    });
  }

  actualizarCursos();
});
