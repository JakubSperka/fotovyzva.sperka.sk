(function () {
  'use strict';

  function initialiseChallenge() {
    const prefix = 'photo-challenge-2026-';
    const checkboxes = document.querySelectorAll('.day-checkbox');
    const notes = document.querySelectorAll('.day-notes');

    // localStorage may be blocked in private mode, embedded previews or file:// pages.
    // These wrappers keep navigation and controls functional even in that case.
    const storage = {
      get(key) {
        try { return window.localStorage.getItem(key); }
        catch (error) { return null; }
      },
      set(key, value) {
        try { window.localStorage.setItem(key, value); return true; }
        catch (error) { return false; }
      },
      remove(key) {
        try { window.localStorage.removeItem(key); return true; }
        catch (error) { return false; }
      }
    };

    checkboxes.forEach((checkbox) => {
      const key = prefix + 'day-' + checkbox.dataset.day;
      checkbox.checked = storage.get(key) === 'done';
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) storage.set(key, 'done');
        else storage.remove(key);
        updateProgress();
      });
    });

    notes.forEach((field) => {
      const key = prefix + 'notes-' + field.dataset.day;
      field.value = storage.get(key) || '';
      field.addEventListener('input', () => storage.set(key, field.value));
    });

    function completedCount() {
      let count = 0;
      for (let day = 1; day <= 30; day += 1) {
        if (storage.get(prefix + 'day-' + day) === 'done') count += 1;
      }
      return count;
    }

    function updateProgress() {
      const count = completedCount();
      const countNode = document.getElementById('progress-count');
      const bar = document.getElementById('progress-bar');
      if (countNode) countNode.textContent = count + ' / 30 dní';
      if (bar) {
        bar.style.width = ((count / 30) * 100) + '%';
        bar.setAttribute('aria-valuenow', String(count));
      }
    }

    const resetButton = document.getElementById('reset-progress');
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        const confirmed = window.confirm('Vynulovať označené dni a všetky lokálne poznámky?');
        if (!confirmed) return;

        for (let day = 1; day <= 30; day += 1) {
          storage.remove(prefix + 'day-' + day);
          storage.remove(prefix + 'notes-' + day);
        }

        checkboxes.forEach((checkbox) => { checkbox.checked = false; });
        notes.forEach((field) => { field.value = ''; });
        updateProgress();
      });
    }

    updateProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseChallenge, { once: true });
  } else {
    initialiseChallenge();
  }
})();
