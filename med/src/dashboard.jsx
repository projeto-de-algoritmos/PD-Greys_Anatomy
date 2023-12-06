import React, { useState } from 'react';
import './style/dashboard.css';
import med from './assets/blue_medical.mp4';
// Ordenacao com heap, do intervalo que termina primeiro ate o que termina por ultimo:
function swap(x, y, heap) {
  const heapSwap = heap;
  const temp = heapSwap[x];
  heapSwap[x] = heapSwap[y];
  heapSwap[y] = temp;
  return heapSwap;
}

function shiftUp(indice, heap) {
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
}

function pegaMenor(heap) {
  const menor = heap[0];
  const ultimo = heap.length - 1;
  heap[0] = heap[ultimo];
  heap.pop();
  heapify(0, heap);
  return menor;
}

function heapify(indice, heap) {
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

function ordenaHeap(intervals) {
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

function intervalScheduling(intervals) {
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

function p(j, indiceHeap, heapResultado) {
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

function m_compute_opt(j) {
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
let tarefasPegadas = [];

function find_Solution(j) {
  let indiceHeap = j - 1;

  if (j === 0) {
    return;
  }
  if (M[j] > M[j - 1]) {
    let resultP = p(j, indiceHeap, heapResultado);
    indiceProxCompat = M.indexOf(resultP);
    tarefasPegadas.push(heapResultado[indiceHeap]); // Usando push para adicionar ao final do array
    console.log(`Task ${intervals.indexOf(heapResultado[indiceHeap]) + 1} selected`);
    return find_Solution(indiceProxCompat);
  }

  return;
}

const intervals = [
  { start: 1, end: 4, weight: 15 },
  { start: 3, end: 5, weight: 20 },
  { start: 0, end: 6, weight: 25 },
  { start: 4, end: 7, weight: 30 },
  { start: 3, end: 8, weight: 35 },
  { start: 5, end: 9, weight: 40 },
  { start: 6, end: 10, weight: 45 },
  { start: 8, end: 11, weight: 50 },
];

intervalScheduling(intervals);
find_Solution(intervals.length);
console.log(intervalScheduling(intervals));
console.log("Maximum Weight:", M[intervals.length]);
console.log("Selected Tasks:");

// const selectedIntervals = tarefasPegadas.map(task => ({
//   start: task.start,
//   end: task.end
// }));
// console.log(selectedIntervals, "teste");
console.log(tarefasPegadas, "testando");
 

const Dashboard = () => {

  return (
    <div className="container">
          <h1>Algum Título</h1>
          <div className="videoTag">
            <video autoPlay loop muted>
              <source src={med} type='video/mp4' />
            </video>
            <div className="aplication-1">
              <h2>Agendamento</h2>
                <div className='options'>
                  <label htmlFor="petName">Médico Responsável:</label>
                  <input
                    className='form-field'
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="startTime">Nome do paciente:</label>
                  <input
                    className='form-field'
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="endTime">Nível de gravidade</label>
                  <select
                    placeholder='hora de fim'
                    className='form-field'
                    id="endTime"
                  >
                  </select>
                </div>
                <div>
                  <label htmlFor="endTime">Tempo estimado:</label>
                  <select
                    placeholder='hora de fim'
                    className='form-field'
                    id="endTime"
                  >
                  </select>
                </div>
            </div>
            <div className="aplication-2">
              <h2>Quadro de Cirurgias</h2>
                
                
        
            </div>
          </div>
        </div>
  );
};

export default Dashboard;
