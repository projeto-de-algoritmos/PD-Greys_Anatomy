// Ordenacao com heap, do intervalo que termina primeiro ate o que termina por ultimo:
function swap(x, y, heap){
    let heapSwap = heap;
    const temp = heapSwap[x];
    heapSwap[x] = heapSwap[y];
    heapSwap[y] = temp;
    return heapSwap;
  }
  
  function shiftUp(indice, heap){
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
  
  function pegaMenor(heap){
    const menor = heap[0];
    const ultimo = heap.length - 1;
    heap[0] = heap[ultimo];
    heap.pop();
    heapify(0, heap);
    return menor;
  }
  
  function heapify(indice, heap) {
    const indEsq = parseInt(2 * indice + 1); // indice do filho do atual que esta na esquerda
    const indDir = parseInt(2 * indice + 2); // indice do filho do atual que esta na direita
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

// ===================================================================================

// funcao "p" que retorna o primeiro intervalo compativel acima no inserido:

function p(j, indiceHeap, heapResultado) { // POSSIVEL LOCAL DO BUG

    let intervalAtual = heapResultado[indiceHeap];
    let valorP;

    for (let i = indiceHeap-1; i >= 0; i--) {
        const intervalCompativel = heapResultado[i];
        // Verifica se o intervalo da tarefa atual é compativel com os que estiverem acima dele
        if (intervalAtual.start >= intervalCompativel.end) {
            valorP = M[j-1]; // valor do compativel ao atual
            j++;
            return valorP; // retorna o valor atualizado do primeiro compativel que encontrar 
        }
    }
    indiceProxCompat = 0;
    return 0; //retorna 0  pois não tem tarefa compativel
}

function m_compute_opt (j) {
    let indiceHeap = j-1;
    if (indiceHeap === 0) {
        M[j] = heapResultado[indiceHeap].weight; // porque o antecessor e 0, ou seja o melhor valor sempre sera o seu mesmo valor
    }
    if (M[j] === 0) {
        let resultP = p(j, indiceHeap, heapResultado); //encontrar compativel
        const opt1 = heapResultado[indiceHeap].weight + resultP; // leva a tarefa atual
        const opt2 = M[j-1]; // nao leva a tarefa atual
        M[j] = Math.max(opt1, opt2);
    }
    return M[j];
}

const M = [];

function intervalScheduling(intervals) {
    ordenaHeap(intervals);

    const n = intervals.length;
    let result = [];

    M[0] = 0;
    for (let i = 1; i <= n; i++) {
        M[i] = 0;
    }
    
    for (let j = 1; j <= n; j++) {
        result = m_compute_opt(j);
    }
    
    return M;
}

let tarefasPegadas = [];

//====================================== testes com find_Solution =========
let indicePrxCompat;

function find_Solution(j){
    let indiceHeap = j-1;
    let i = 0;

    if (j === 0 ) {
        return;
    }
    if (M[j] > M[j-1]) { 
        let resultP = p(j, indiceHeap, heapResultado); //encontrar compativel
        indiceProxCompat = M.indexOf(resultP); // indice do compativel
        tarefasPegadas[i] = heapResultado[indiceHeap];
        i++;
        return find_Solution(indiceProxCompat);
    }

    return;
}

let indiceProxCompat;

function find_SolutionNao(j){
    let indiceHeap = j-1;
    let i = 0;
    let resultP = p(j, indiceHeap, heapResultado); //encontrar compativel
    indiceProxCompat = M.indexOf(resultP); // indice do compativel
    const opt1 = heapResultado[indiceHeap].weight + resultP; // leva a tarefa atual
    const opt2 = M[j-1]; // nao leva a tarefa atual
    if (j === 0) {
        return;
    }
    else if (opt1 > opt2) { 
        tarefasPegadas[i] = heapResultado[indiceHeap];
        i++;
        return find_Solution(indiceProxCompat); // ir para o compativel do atual
    } 
    else {
        return find_Solution(j-1);
    }
}
//======================================

  // Exemplo de uso
  const intervals = [
    { start: 2, end: 5, weight: 15 },
    { start: 4, end: 6, weight: 20 },
    { start: 1, end: 7, weight: 25 },
    { start: 5, end: 8, weight: 30 },
    { start: 4, end: 9, weight: 35 },
    { start: 6, end: 10, weight: 40 },
    { start: 7, end: 11, weight: 45 },
    { start: 9, end: 12, weight: 50 },
  ];
// resposta correta: 0,15,20,25,45,45,60,70,95 (pega: tarefa 1,4 e 8)


//  { start: 1, end: 3, weight: 3 },
//  { start: 3, end: 4, weight: 5 },
//  { start: 5, end: 9, weight: 10 },
//  { start: 8, end: 12, weight: 2 }, 
 
intervalScheduling(intervals);
//find_Solution(intervals.length);
  
  console.log(intervalScheduling(intervals));
  //console.log(tarefasPegadas);
  