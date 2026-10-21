// Sintetizador de audio web nativo para efectos mágicos
function reproducirEfectoSonoro(tipo) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (tipo === 'crecer') {
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3);
    } else {
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
    }

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {}
}

function procesarHongo() {
  const inputEstatura = document.getElementById('estatura');
  const modoSelect = document.getElementById('accionMano').value;
  const avatar = document.getElementById('aliciaAvatar');
  const textoResultado = document.getElementById('textoOruga');

  let estaturaActual = Number(inputEstatura.value);

  if (!inputEstatura.value || estaturaActual <= 0) {
    textoResultado.innerText = "¡La Oruga frunce el ceño! Ingresa un número válido.";
    return;
  }

  let nuevaEstatura = estaturaActual;
  let mensaje = "";

  if (modoSelect === 'izq') {
    nuevaEstatura = estaturaActual * 2;
    mensaje = `Diste un bocado a la izquierda. ¡Has crecido a ${nuevaEstatura} cm!`;
    reproducirEfectoSonoro('crecer');
  } else if (modoSelect === 'der') {
    nuevaEstatura = Math.max(1, Math.round(estaturaActual / 2));
    mensaje = `Diste un bocado a la derecha. Te has reducido a ${nuevaEstatura} cm.`;
    reproducirEfectoSonoro('encoger');
  } else {
    if (estaturaActual === 7) {
      mensaje = "¡Es exactamente 7 cm! La Oruga asiente con aprobación.";
    } else {
      mensaje = `Mides ${estaturaActual} cm. Para la Oruga, sólo 7 cm es perfecto.`;
    }
  }

  // Actualizar el avatar con escala dinámica en el DOM
  let escala = Math.min(Math.max(nuevaEstatura / 50, 0.4), 2.2);
  avatar.style.transform = `scale(${escala})`;

  // Actualizar campo de texto
  inputEstatura.value = nuevaEstatura;
  textoResultado.innerText = mensaje;
}

document.getElementById('btnOruga').addEventListener('click', procesarHongo);