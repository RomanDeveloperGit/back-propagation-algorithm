// Количество входных значений
const inputCount = 3;

// Скорость обучения
const lr = 0.1;

// Количество нейронов на скрытом слое
const hiddenLayerNeuronCount = 2;

// Веса от входного слоя к скрытому.
// Массив из {hiddenLayerNeuronCount} массивов длиной в {inputCount} элементов.
// Матрицы, можно сказать
// Заполняются рандомно при инициализации сети
const hiddenLayerNeuronWeights = [];

// Сигмоидальная функция активации для скрытых слоев
const getProcessedValueByHiddenActivation = (value) => {
  return 1 / (1 + Math.exp(-value));
};

// Линейная функция активации для выходного слоя
const getProcessedValueByOutputActivation = (value) => {
  return value;
};

// Далее для обучения код:

const getRandomNumber = () => {
  return Math.random().toFixed(3);
};

const initWeights = () => {
  for (
    let hiddenLayer = 0;
    hiddenLayer < hiddenLayerNeuronCount;
    hiddenLayer++
  ) {
    for (let neuron = 0; neuron < inputCount; neuron++) {
      if (!Array.isArray(hiddenLayerNeuronWeights[hiddenLayer]))
        hiddenLayerNeuronWeights[hiddenLayer] = [];

      hiddenLayerNeuronWeights[hiddenLayer][neuron] = getRandomNumber();
    }
  }
};

console.log(hiddenLayerNeuronWeights);
initWeights();
console.log(hiddenLayerNeuronWeights);
