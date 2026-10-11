async function benchmarkSequential(writes, delayMs) {
  const start = performance.now();
  for (let i = 0; i < writes; i++) {
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  return performance.now() - start;
}

async function benchmarkConcurrent(writes, delayMs) {
  const start = performance.now();
  await Promise.all(
    Array.from({ length: writes }).map(() =>
      new Promise(resolve => setTimeout(resolve, delayMs))
    )
  );
  return performance.now() - start;
}

async function run() {
  console.log("Mocking 50ms network latency...");
  const writes = 3;
  const latency = 50;

  const seqTime = await benchmarkSequential(writes, latency);
  console.log(`Sequential time: ${seqTime.toFixed(2)}ms`);

  const conTime = await benchmarkConcurrent(writes, latency);
  console.log(`Concurrent time: ${conTime.toFixed(2)}ms`);

  const improvement = ((seqTime - conTime) / seqTime) * 100;
  console.log(`Improvement: ${improvement.toFixed(2)}%`);
}

run();
