let corpus = `<s> john read moby dick </s>
<s> mary read a different book </s>
<s> she read a book by cher </s>`.split(/\s+/);

// unigram
let cts = {};
for (const c of corpus) {
  if (!(c in cts)) cts[c] = 0;
  cts[c] += 1;
}

console.log(
  Object.entries(cts)
    .sort((a, b) => b[1] - a[1])
    .map(([a, b]) => `${b} ${a}`)
    .join("\n")
);

// bigram
/**
 * Calculates bigram probability
 * @param {string} word current word
 * @param {string} given word that precedes the current
 * @param {string[]} corpus list of words in corpus (assumed its already broken up)
 * @returns
 */
function P2(word, given, corpus) {
  const cts = {};
  for (let i = 1; i < corpus.length; ++i) {
    if (corpus[i - 1] === given) {
      const w = corpus[i];
      if (!(w in cts)) cts[w] = 0;
      cts[w] += 1;
    }
  }
  let total = Object.values(cts).reduce((a, b) => a + b);
  console.log(
    Object.entries(cts)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${v} ${given} ${k}`)
      .join("\n")
  );
  console.log(`P(${word} | ${given}) = ${cts[word] || 0}/${total}`);
  return (cts[word] || 0) / total;
}

/**
 * Calcules sentence probability using bigrams
 * @param {string[]} sentence
 * @param {string[]} corpus
 */
function P2Sentence(sentence, corpus) {
  let ans = 1;
  const bigrams = [];
  for (let i = 0; i < sentence.length; ++i) {
    const w1 = sentence[i - 1] || "<s>";
    const w2 = sentence[i];
    ans *= P2(w2, w1, corpus);
    bigrams.push(`P(${w2}|${w1})`);
  }
  console.log(`P(${sentence.join(" ")})=${bigrams.join(" * ")}`);
  return ans;
}
P2Sentence("john read a book".split(/\s/), corpus);
