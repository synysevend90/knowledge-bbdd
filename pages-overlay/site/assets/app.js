(() => {
  const input = document.querySelector('#doc-search');
  const box = document.querySelector('#search-results');
  if (!input || !box) return;
  let records = [];
  const normalize = value => value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  Promise.all([fetch('../assets/search.json').then(r => r.json()), fetch('../assets/search-ssms.json').then(r => r.json()).catch(() => [])])
    .then(([data, extra]) => { records = [...data, ...extra]; }).catch(() => {});
  input.addEventListener('input', () => {
    const query = normalize(input.value.trim());
    box.replaceChildren();
    if (query.length < 2) { box.hidden = true; return; }
    const terms = query.split(/\s+/).filter(Boolean);
    const matches = records.map(record => {
      const title = normalize(record.title), body = normalize(record.text);
      const score = terms.every(t => title.includes(t) || body.includes(t)) ? terms.reduce((n,t) => n + (title.includes(t) ? 10 : 1), 0) : 0;
      return {record,score};
    }).filter(x => x.score).sort((a,b) => b.score-a.score).slice(0,25);
    box.hidden = false;
    if (!matches.length) { const p=document.createElement('p'); p.textContent='Sin resultados en SQL Server.'; box.append(p); return; }
    for (const {record} of matches) {
      const a=document.createElement('a'); a.href='../'+record.url;
      const label=document.createElement('span'); label.textContent=record.title;
      const small=document.createElement('small'); small.textContent=record.group;
      a.append(label,small); box.append(a);
    }
  });
})();
