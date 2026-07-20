(function () {
  'use strict';

  const STORAGE_PREFIX = 'photo-challenge-2026-';

  const DAYS = {
    1: { title: 'Jedno ohnisko', task: 'Nastav objektív na približne **35 mm** a počas celého fotografovania nepoužívaj zoom. Kompozíciu meň pohybom, výškou fotoaparátu a uhlom pohľadu.', goal: 'Vedomá práca s perspektívou a vzdialenosťou.' },
    2: { title: 'Pravidlo tretín', task: 'Hlavný objekt neumiestňuj automaticky do stredu. Skús ho položiť do jedného z priesečníkov tretín a ponechaj priestor v smere pohľadu alebo pohybu.', goal: 'Vyváženejšia a dynamickejšia kompozícia.' },
    3: { title: 'Symetria', task: 'Hľadaj dokonale alebo približne symetrické scény: priečelia, chodby, schodiská, mosty alebo odrazy.', goal: 'Vnímanie geometrie, rovnováhy a opakovania.' },
    4: { title: 'Vodiace línie', task: 'Použi cestu, koľajnice, zábradlie, tiene alebo hrany budov tak, aby viedli pohľad k hlavnému objektu.', goal: 'Usmernenie pozornosti diváka v obraze.' },
    5: { title: 'Rám v ráme', task: 'Fotografuj cez okno, dvere, oblúk, konáre alebo medzeru medzi objektmi. Rám musí podporiť hlavný motív, nie ho zakryť.', goal: 'Oddelenie hlavného objektu od okolia.' },
    6: { title: 'Negatívny priestor', task: 'Hlavný objekt nech zaberá iba malú časť fotografie. Zvyšok môže tvoriť obloha, stena, voda, hmla alebo iná pokojná plocha.', goal: 'Minimalizmus a vizuálna rovnováha.' },
    7: { title: 'Tri vrstvy obrazu', task: 'Vytvor záber s popredím, hlavným objektom a pozadím. Popredie môže tvoriť tráva, konár, zábradlie alebo rám dverí.', goal: 'Pocit hĺbky a priestorovosti.' },
    8: { title: 'Tiene', task: 'Fotografuj najmä tiene a tvary, ktoré vytvárajú. Samotný objekt nemusí byť v zábere viditeľný.', goal: 'Abstraktné myslenie a práca s tvarom.' },
    9: { title: 'Bočné svetlo', task: 'Vyhľadaj scénu osvetlenú zboku. Sleduj, ako svetlo zvýrazňuje textúru, povrch, objem a nerovnosti.', goal: 'Použitie svetla na modelovanie objektov.' },
    10: { title: 'Protisvetlo', task: 'Fotografuj proti zdroju svetla a vytvor siluetu, svetelný obrys alebo presvietený detail. Pri siluete exponuj podľa svetlého pozadia.', goal: 'Vedomá práca s vysokým kontrastom.' },
    11: { title: 'Jedna farba', task: 'Vyber si jednu dominantnú farbu a hľadaj scény, v ktorých sa opakuje alebo výrazne vyniká.', goal: 'Citlivosť na farby a vizuálna konzistentnosť série.' },
    12: { title: 'Farebný kontrast', task: 'Hľadaj kontrastné kombinácie, napríklad modrú so žltou, červenú so zelenou alebo teplé farby so studenými.', goal: 'Použitie farby ako kompozičného prvku.' },
    13: { title: 'Čiernobiele myslenie', task: 'Sústreď sa na svetlo, tiene, línie a textúru. Môžeš zapnúť čiernobiely náhľad, ale fotografuj do RAW + JPEG.', goal: 'Vnímanie tonality bez rozptyľovania farbami.' },
    14: { title: 'Zlatá hodina', task: 'Fotografuj krátko po východe alebo pred západom slnka. Hľadaj teplé svetlo, dlhé tiene a svetelný obrys.', goal: 'Plánovanie fotografovania podľa kvality svetla.' },
    15: { title: 'Pohľad od zeme', task: 'Všetky fotografie vytvor čo najnižšie nad zemou. Fotografuj cez trávu, pozdĺž chodníka alebo z úrovne malých predmetov.', goal: 'Objavenie nezvyčajnej perspektívy.' },
    16: { title: 'Pohľad zhora', task: 'Fotografuj objekty kolmo alebo takmer kolmo zhora. Hľadaj tvary, vzory a usporiadanie plôch.', goal: 'Zjednodušenie scény do geometrických prvkov.' },
    17: { title: 'Detail bez kontextu', task: 'Odfotografuj iba časť objektu tak, aby nebolo okamžite jasné, čo zobrazuje. Pracuj s textúrou, farbou a výrezom.', goal: 'Pozornosť k detailom a abstrakcia.' },
    18: { title: 'Stlačená perspektíva', task: 'Použi ohnisko približne **150–200 mm** a spoj vzdialené vrstvy scény tak, aby pôsobili bližšie pri sebe.', goal: 'Pochopenie vizuálneho účinku teleobjektívu.' },
    19: { title: 'Široká perspektíva', task: 'Použi približne **18 mm** a priblíž sa k hlavnému objektu. Zdôrazni rozdiel medzi popredím a pozadím.', goal: 'Práca s výraznou priestorovou perspektívou.' },
    20: { title: 'Malá hĺbka ostrosti', task: 'Použi 50 mm f/1,8, priblíž sa k objektu a zväčši vzdialenosť medzi objektom a pozadím. Zaostri presne na hlavný detail.', goal: 'Oddelenie objektu od pozadia.' },
    21: { title: 'Všetko ostré', task: 'Vytvor fotografiu s viacerými ostrými vrstvami. Použi približne f/8, vhodný bod zaostrenia a dostatočne stabilný fotoaparát.', goal: 'Vedomá práca s väčšou hĺbkou ostrosti.' },
    22: { title: 'Jeden predmet desaťkrát', task: 'Vyber jeden bežný predmet a odfotografuj ho aspoň desiatimi rozdielnymi spôsobmi. Meň uhol, výrez, svetlo, pozadie a vzdialenosť.', goal: 'Objavovanie viacerých vizuálnych možností v bežnom objekte.' },
    23: { title: 'Odrazy', task: 'Hľadaj odrazy vo vode, skle, zrkadle, automobile alebo kovovom povrchu. Skús spojiť skutočný objekt s jeho odrazom.', goal: 'Viacvrstvová a neobvyklá kompozícia.' },
    24: { title: 'Abstrakcia', task: 'Fotografuj tvary, farby, línie a textúry bez potreby jednoznačne ukázať konkrétny objekt. Použi tesný výrez alebo neobvyklý uhol.', goal: 'Vnímanie fotografie ako sústavy vizuálnych prvkov.' },
    25: { title: 'Minimalizmus', task: 'Použi maximálne dva alebo tri výrazné obrazové prvky. Odstráň zo záberu všetko, čo nepodporuje hlavnú myšlienku.', goal: 'Jednoduchá a jednoznačná fotografia.' },
    26: { title: 'Pohybová neostrosť', task: 'Použi expozičný čas približne **1/10 až 1/30 s**. Fotoaparát drž stabilne a pohybujúci sa objekt nechaj zámerne rozmazať.', goal: 'Pohybová neostrosť ako kreatívny prvok.' },
    27: { title: 'Panning', task: 'Sleduj fotoaparátom pohybujúci sa objekt počas expozície. Začni približne na 1/30 až 1/100 s podľa rýchlosti pohybu.', goal: 'Ostrý objekt na pohybovo rozmazanom pozadí.' },
    28: { title: 'Rozhodujúci moment', task: 'Priprav kompozíciu a počkaj, kým do nej vstúpi vhodný človek, bicykel, vozidlo, vták alebo tieň.', goal: 'Trpezlivosť, predvídanie a načasovanie.' },
    29: { title: 'Príbeh v piatich fotografiách', task: 'Vytvor sériu: úvod prostredia, hlavný objekt, detail, priebeh činnosti a záver. Fotografie majú dávať zmysel aj bez textu.', goal: 'Vizuálne rozprávanie a výber podstatných momentov.' },
    30: { title: 'Vlastná téma', task: 'Vytvor jednu výslednú fotografiu alebo krátku sériu, v ktorej spojíš aspoň tri techniky z predchádzajúcich dní.', goal: 'Samostatné kreatívne rozhodovanie a syntéza naučených postupov.' }
  };

  const storage = {
    get(key) {
      try { return window.localStorage.getItem(key); }
      catch (error) { return null; }
    }
  };

  function isoDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function escapeYaml(value) {
    return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }

  function slugify(value) {
    return String(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function dayDone(day) {
    return storage.get(STORAGE_PREFIX + 'day-' + day) === 'done';
  }

  function storedNotes(day) {
    return storage.get(STORAGE_PREFIX + 'notes-' + day) || '';
  }

  function markdownForDay(day, notesOverride) {
    const data = DAYS[day];
    const padded = String(day).padStart(2, '0');
    const notes = notesOverride === undefined ? storedNotes(day) : notesOverride;
    const status = dayDone(day) ? 'hotovo' : 'rozpracované';
    const noteBody = notes.trim() || '_Sem doplň poznámky k výslednej fotografii._';

    return [
      '---',
      'title: "' + escapeYaml('Deň ' + day + ' – ' + data.title) + '"',
      'date: ' + isoDate(),
      'tags:',
      '  - fotografia',
      '  - fotograficka-vyzva',
      '  - den-' + padded,
      'status: ' + status,
      '---',
      '',
      '# Deň ' + day + ' – ' + data.title,
      '',
      '> [!info] Zadanie',
      '> ' + data.task,
      '',
      '> [!tip] Cieľ cvičenia',
      '> ' + data.goal,
      '',
      '## Výsledná fotografia',
      '',
      '![[den-' + padded + '-fotografia.jpg]]',
      '',
      '## Nastavenie fotoaparátu',
      '',
      '- **Fotoaparát:** Sony A6300',
      '- **Objektív:**',
      '- **Ohnisková vzdialenosť:**',
      '- **Clona:**',
      '- **Expozičný čas:**',
      '- **ISO:**',
      '',
      '## Hodnotenie',
      '',
      '- **Hlavný objekt:**',
      '- **Kam smeruje pozornosť:**',
      '- **Čo funguje najlepšie:**',
      '- **Čo ruší:**',
      '- **Čo by som pri opakovaní zmenil:**',
      '- **Čo som sa naučil:**',
      '',
      '## Moje poznámky',
      '',
      noteBody,
      ''
    ].join('\n');
  }

  function combinedMarkdown(onlyFilled) {
    const blocks = [];
    for (let day = 1; day <= 30; day += 1) {
      const notes = storedNotes(day);
      if (onlyFilled && !notes.trim() && !dayDone(day)) continue;
      blocks.push(markdownForDay(day, notes).replace(/^---[\s\S]*?---\n\n/, ''));
    }

    const scope = onlyFilled ? 'Vyplnené dni a označené úlohy' : 'Všetkých 30 dní';
    return [
      '---',
      'title: "Poznámky – 30-dňová fotografická výzva"',
      'date: ' + isoDate(),
      'tags:',
      '  - fotografia',
      '  - fotograficka-vyzva',
      '---',
      '',
      '# Poznámky – 30-dňová fotografická výzva',
      '',
      '**Rozsah exportu:** ' + scope,
      '',
      blocks.length ? blocks.join('\n---\n\n') : '_Zatiaľ nie sú uložené žiadne poznámky ani dokončené dni._',
      ''
    ].join('\n');
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const temporary = document.createElement('textarea');
    temporary.value = text;
    temporary.setAttribute('readonly', '');
    temporary.style.position = 'fixed';
    temporary.style.opacity = '0';
    document.body.appendChild(temporary);
    temporary.select();
    const successful = document.execCommand('copy');
    temporary.remove();
    if (!successful) throw new Error('Kopírovanie nie je podporované.');
  }

  function downloadMarkdown(filename, content) {
    const blob = new Blob(['\ufeff', content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function flashStatus(node, message, isError) {
    if (!node) return;
    node.textContent = message;
    node.classList.toggle('is-error', Boolean(isError));
    window.clearTimeout(node._notesTimer);
    node._notesTimer = window.setTimeout(() => {
      node.textContent = '';
      node.classList.remove('is-error');
    }, 2800);
  }

  function createDayTools(field) {
    const day = Number(field.dataset.day);
    if (!Number.isInteger(day) || !DAYS[day]) return;
    if (field.parentElement.querySelector('.markdown-note-tools')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'markdown-note-tools';

    const heading = document.createElement('h4');
    heading.textContent = 'Markdown pre Obsidian';

    const intro = document.createElement('p');
    intro.className = 'small-note';
    intro.textContent = 'Šablóna sa aktualizuje podľa poznámok vyššie. Môžeš ju skopírovať do Obsidianu alebo uložiť ako samostatný súbor .md.';

    const actions = document.createElement('div');
    actions.className = 'notes-actions';

    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.className = 'notes-action-button';
    copyButton.textContent = 'Kopírovať Markdown';

    const exportButton = document.createElement('button');
    exportButton.type = 'button';
    exportButton.className = 'notes-action-button notes-action-secondary';
    exportButton.textContent = 'Stiahnuť tento deň (.md)';

    const status = document.createElement('span');
    status.className = 'notes-action-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');

    const pre = document.createElement('pre');
    pre.className = 'obsidian-template';
    const code = document.createElement('code');
    pre.appendChild(code);

    function refreshPreview() {
      code.textContent = markdownForDay(day, field.value);
    }

    copyButton.addEventListener('click', async () => {
      try {
        await copyText(markdownForDay(day, field.value));
        flashStatus(status, 'Markdown bol skopírovaný.');
      } catch (error) {
        flashStatus(status, 'Kopírovanie zlyhalo.', true);
      }
    });

    exportButton.addEventListener('click', () => {
      const filename = 'den-' + String(day).padStart(2, '0') + '-' + slugify(DAYS[day].title) + '.md';
      downloadMarkdown(filename, markdownForDay(day, field.value));
      flashStatus(status, 'Súbor bol pripravený na stiahnutie.');
    });

    field.addEventListener('input', refreshPreview);
    const checkbox = document.querySelector('.day-checkbox[data-day="' + day + '"]');
    if (checkbox) checkbox.addEventListener('change', refreshPreview);

    actions.append(copyButton, exportButton, status);
    wrapper.append(heading, intro, actions, pre);
    field.insertAdjacentElement('afterend', wrapper);
    refreshPreview();
  }

  function initialiseGlobalExport() {
    const allButton = document.getElementById('export-all-notes');
    const filledButton = document.getElementById('export-filled-notes');
    const status = document.getElementById('notes-export-status');

    if (allButton) {
      allButton.addEventListener('click', () => {
        downloadMarkdown('fotograficka-vyzva-vsetky-poznamky-' + isoDate() + '.md', combinedMarkdown(false));
        flashStatus(status, 'Export všetkých dní bol pripravený.');
      });
    }

    if (filledButton) {
      filledButton.addEventListener('click', () => {
        downloadMarkdown('fotograficka-vyzva-vyplnene-poznamky-' + isoDate() + '.md', combinedMarkdown(true));
        flashStatus(status, 'Export vyplnených dní bol pripravený.');
      });
    }
  }

  function initialiseNotesExport() {
    document.querySelectorAll('.day-notes').forEach(createDayTools);
    initialiseGlobalExport();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseNotesExport, { once: true });
  } else {
    initialiseNotesExport();
  }
})();
