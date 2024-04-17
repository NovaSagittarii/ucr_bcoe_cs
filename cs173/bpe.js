/**
 * BPE
 * @param {string[]} a vocabulary (word list)
 * @param {number} it iterations to run for
 */
function f(a, it) {
  a = a.map((s) => [...s, "_"]);
  while (it--) {
    console.log(a.map((x) => x.join(" ")).join("\n"));
    let ct = {};
    for (let s of a) {
      for (let i = 0; i < s.length - 1; ++i) {
        const tk1 = s[i],
          tk2 = s[i + 1];
        var tk = tk1 + tk2;
        if (!(tk in ct)) ct[tk] = [0, tk1, tk2, tk];
        ct[tk][0] += 1;
      }
    }
    ct = Object.values(ct);
    ct.sort((a, b) => b[0] - a[0]);
    console.log(ct.map(([v, k1, k2, k3]) => `${v} ${k1} ${k2}`).join("\n"));
    const rule = ct[0];
    console.log(`${rule[1]} ${rule[2]} -> ${rule[3]}`);
    for (let i = 0; i < a.length; ++i) {
      const s = a[i];
      for (let j = s.length - 2; j >= 0; --j) {
        if (s[j] === rule[1] && s[j + 1] === rule[2]) {
          s.splice(j + 1, 1);
          s[j] += rule[2];
        }
      }
    }
  }
}

f(["low", "lower", "lowest", "new", "newer", "newest"], 5);
