// Количество входных значений
const inputCount = 5;

// Скорость обучения
const lr = 0.1;

// Количество нейронов на скрытом слое
const hiddenLayerNeuronCount = 2;

// Веса от входного слоя к скрытому.
// Массив из {hiddenLayerNeuronCount} массивов длиной в {inputCount} элементов.
// Матрицы, можно сказать
// Заполняются рандомно при инициализации сети
const hiddenLayerNeuronWeights = [];

// Веса от скрытого слоя к выходному.
// Массив длиной в {hiddenLayerNeuronCount} элементов.
// Заполняются рандомно при инициализации сети
const outputLayerNeuronWeights = [];

// Сигмоидальная функция активации для слоев
const getProcessedValueByActivation = (value) => {
  return 1 / (1 + Math.exp(-value));
};

// Утилитки:

const getRandomNumber = () => {
  return Math.random().toFixed(3);
};

// Далее для обучения код:

const initWeights = () => {
  for (
    let hiddenLayer = 0;
    hiddenLayer < hiddenLayerNeuronCount;
    hiddenLayer++
  ) {
    for (let neuron = 0; neuron < inputCount; neuron++) {
      if (!Array.isArray(hiddenLayerNeuronWeights[hiddenLayer])) {
        hiddenLayerNeuronWeights[hiddenLayer] = [];
      }

      hiddenLayerNeuronWeights[hiddenLayer][neuron] = getRandomNumber();
    }

    outputLayerNeuronWeights[hiddenLayer] = getRandomNumber();
  }
};

// Прямое распространение: прогоняем данные, замеряем ошибку
const forwardPropagation = (data) => {
  const hiddenLayerReport = [];

  hiddenLayerNeuronWeights.forEach((hiddenNeuronWeights) => {
    const sumWeights = hiddenNeuronWeights.reduce(
      (acc, weight, index) => acc + weight * data.input[index],
      0
    );

    hiddenLayerReport.push({
      value: sumWeights,
      activatedValue: getProcessedValueByActivation(sumWeights),
    });
  });

  const outputLayerReport = {
    value: outputLayerNeuronWeights.reduce(
      (acc, weight, index) =>
        acc + weight * hiddenLayerReport[index].activatedValue,
      0
    ),
  };

  outputLayerReport.activatedValue = getProcessedValueByActivation(
    outputLayerReport.value
  );

  outputLayerReport.error =
    data.expectedOutput - outputLayerReport.activatedValue;

  return {
    hiddenLayerReport,
    outputLayerReport,
  };
};

console.log({ hiddenLayerNeuronWeights, outputLayerNeuronWeights });
initWeights();
console.log({ hiddenLayerNeuronWeights, outputLayerNeuronWeights });

// Пусть учится выдавать 1, если на входе больше единиц, чем нулей
// Но если всё заполнено как 0.5, то выдавать 0.
const dataset = [
  { input: [1, 0, 0, 0, 0], expectedOutput: 0 },
  { input: [1, 1, 1, 1, 1], expectedOutput: 1 },
  { input: [0, 0, 0, 0, 0], expectedOutput: 0 },
  { input: [1, 0, 1, 0, 1], expectedOutput: 1 },
  { input: [1, 0, 1, 0, 0], expectedOutput: 0 },
  { input: [0, 0, 0, 1, 0], expectedOutput: 0 },
  { input: [0.5, 0.5, 0.5, 0.5, 0.5], expectedOutput: 0 }
];
// Ожидаем, что для [1, 1, 0, 1, 1] = 1

console.log(forwardPropagation(dataset[1]).outputLayerReport.activatedValue)

