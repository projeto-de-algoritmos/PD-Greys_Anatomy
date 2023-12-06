export function swap(x, y, heap) {
  const heapSwap = heap;
  const temp = heapSwap[x];
  heapSwap[x] = heapSwap[y];
  heapSwap[y] = temp;
  return heapSwap;
};

export function shiftUp(indice, heap) {
  let ind = indice;
  let indPaiAtual = parseInt((ind - 1) / 2);
  let PaiAtual = heap[indPaiAtual].end;
  let atual = heap[ind].end;

  while (ind > 0 && atual < PaiAtual) {
    heap = swap(ind, indPaiAtual, heap);
    ind = indPaiAtual;
    indPaiAtual = parseInt((ind - 1) / 2);
    PaiAtual = heap[indPaiAtual].end;
    atual = heap[ind].end;
  }
};

export function pegaMenor(heap) {
  const menor = heap[0];
  const ultimo = heap.length - 1;
  heap[0] = heap[ultimo];
  heap.pop();
  heapify(0, heap);
  return menor;
};

export function heapify(indice, heap) {
  const indEsq = parseInt(2 * indice + 1);
  const indDir = parseInt(2 * indice + 2);
  let numMenor = indice;

  if (indEsq < heap.length && heap[indEsq].end < heap[numMenor].end) {
    numMenor = indEsq;
  }

  if (indDir < heap.length && heap[indDir].end < heap[numMenor].end) {
    numMenor = indDir;
  }

  if (numMenor !== indice) {
    heap = swap(indice, numMenor, heap);
    heapify(numMenor, heap);
  }
}

const heap = [];
const heapResultado = [];

export function ordenaHeap(intervals) {
  let tempoFinalMenor = 0;

  for (const intervalo of intervals) {
    heap.push(intervalo);
    shiftUp(heap.length - 1, heap);
  }

  while (heap.length > 0) {
    tempoFinalMenor = pegaMenor(heap);
    heapResultado.push(tempoFinalMenor);
    heapify(0, heap);
  }
}

const M = [];

export function intervalScheduling(intervals) {
  ordenaHeap(intervals);

  const n = intervals.length;

  M[0] = 0;
  for (let i = 1; i <= n; i++) {
    M[i] = 0;
  }

  for (let j = 1; j <= n; j++) {
    m_compute_opt(j);
  }

  return M;
}

export function p(j, indiceHeap, heapResultado) {
  let intervalAtual = heapResultado[indiceHeap];
  let valorP;

  for (let i = indiceHeap - 1; i >= 0; i--) {
    const intervalCompativel = heapResultado[i];
    if (intervalAtual.start >= intervalCompativel.end) {
      valorP = M[i + 1];
      return valorP;
    }
  }

  return 0;
}

export function m_compute_opt(j) {
  let indiceHeap = j - 1;
  if (indiceHeap === 0) {
    M[j] = heapResultado[indiceHeap].weight;
  }
  if (M[j] === 0) {
    let resultP = p(j, indiceHeap, heapResultado);
    const opt1 = heapResultado[indiceHeap].weight + resultP;
    const opt2 = M[j - 1];
    M[j] = Math.max(opt1, opt2);
  }
  return M[j];
}

let indiceProxCompat;
export let tarefasPegadas = [];

export function find_Solution(j) {
  let indiceHeap = j - 1;

  if (j === 0) {
    return;
  }
  if (M[j] > M[j - 1]) {
    let resultP = p(j, indiceHeap, heapResultado);
    indiceProxCompat = M.indexOf(resultP);
    tarefasPegadas.push(heapResultado[indiceHeap]);
    return find_Solution(indiceProxCompat);
  }

  return;
}
