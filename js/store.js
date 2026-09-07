/* =========================================================
   Moses Benz Auto Care — Inventory data layer
   ---------------------------------------------------------
   This is the single source of truth for "cars for sale",
   shared by index.html (teaser), inventory.html (full list)
   and admin.html (add / mark sold / delete).

   HOW PERSISTENCE WORKS (read this before you deploy):
   - There is no backend/database here — it's a static site.
   - Car data lives in the browser's localStorage, seeded from
     CARS_SEED below the first time the site is opened.
   - When the admin adds/edits/deletes a car in admin.html, that
     change is saved to localStorage IN THAT BROWSER ONLY. It
     will not appear for visitors using a different browser or
     device, because there is no server to sync it to.
   - To actually publish changes for every visitor, use the
     "Export data" button on admin.html to download an updated
     cars-seed.js file, then replace this file with it and
     re-deploy the site. That makes your edits the new default
     for everyone.
   - If you outgrow this (e.g. multiple admins, real-time
     updates), swap this file out for calls to a real backend
     (a small API + database, or a headless CMS) — every place
     that calls MBStore.getCars() etc. would keep working the
     same way.
   ========================================================= */

(function (global) {
  const STORAGE_KEY = 'mbac_cars_v1';

  // ---- Seed data (used the first time, or after "Reset to defaults") ----
  const CARS_SEED = [
    {
      id: 'car-g63-amg',
      name: 'G 63 AMG',
      year: 2023,
      priceNGN: 185000000,
      mileageKm: 8200,
      specTag: '4.0L V8 Biturbo',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1590326794974-f7aa897f04a8?fm=jpg&q=80&w=1400&auto=format&fit=crop',
      description: 'One owner, full Moses Benz service history, ceramic-coated and inspected bumper to bumper.'
    },
    {
      id: 'car-c63s-amg',
      name: 'C 63 S AMG',
      year: 2021,
      priceNGN: 92000000,
      mileageKm: 34500,
      specTag: '4.0L V8 Biturbo',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?fm=jpg&q=80&w=1400&auto=format&fit=crop',
      description: 'Track-inspected brakes, fresh tyres, and a full diagnostic report included at handover.'
    },
    {
      id: 'car-amg-gtr',
      name: 'AMG GT R',
      year: 2022,
      priceNGN: 164900000,
      mileageKm: 6100,
      specTag: '4.0L V8',
      status: 'sold',
      image: 'https://images.unsplash.com/photo-1617814076231-2c58846db944?fm=jpg&q=80&w=1400&auto=format&fit=crop',
      description: 'Sold last month — a similar car is expected in stock. Ask us to notify you.'
    },
    {
      id: 'car-e350',
      name: 'E 350',
      year: 2020,
      priceNGN: 45000000,
      mileageKm: 61000,
      specTag: '2.0L Turbo I4',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1559167628-9394a8576f33?fm=jpg&q=80&w=1400&auto=format&fit=crop',
      description: 'Well-maintained executive saloon, recently serviced, new tyres all round.'
    },
    {
      id: 'car-gle450',
      name: 'GLE 450',
      year: 2021,
      priceNGN: 68000000,
      mileageKm: 45300,
      specTag: '3.0L Turbo I6',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1559511206-f5ade67b8484?fm=jpg&q=80&w=1400&auto=format&fit=crop',
      description: 'Family SUV, AIRMATIC suspension inspected and calibrated, clean interior throughout.'
    }
  ];

  // ---- Storage helpers ----
  function readRaw() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('MBStore: could not read localStorage, using seed data.', e);
      return null;
    }
  }

  function writeRaw(cars) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
      return true;
    } catch (e) {
      console.warn('MBStore: could not write to localStorage.', e);
      return false;
    }
  }

  function getCars() {
    const stored = readRaw();
    if (stored && Array.isArray(stored)) return stored;
    // First run: seed localStorage so admin edits have something to work from
    writeRaw(CARS_SEED);
    return CARS_SEED.slice();
  }

  function saveCars(cars) {
    writeRaw(cars);
  }

  function addCar(car) {
    const cars = getCars();
    const id = 'car-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
    cars.unshift(Object.assign({ id, status: 'available' }, car));
    saveCars(cars);
    return id;
  }

  function updateCar(id, patch) {
    const cars = getCars();
    const idx = cars.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    cars[idx] = Object.assign({}, cars[idx], patch);
    saveCars(cars);
    return true;
  }

  function deleteCar(id) {
    const cars = getCars().filter((c) => c.id !== id);
    saveCars(cars);
  }

  function markSold(id) {
    return updateCar(id, { status: 'sold' });
  }

  function markAvailable(id) {
    return updateCar(id, { status: 'available' });
  }

  function resetToDefaults() {
    saveCars(CARS_SEED.slice());
  }

  // ---- Formatting ----
  function formatNGN(amount) {
    try {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
      }).format(amount);
    } catch (e) {
      return '₦' + Number(amount || 0).toLocaleString('en-NG');
    }
  }

  function formatKm(km) {
    return Number(km || 0).toLocaleString('en-NG') + ' km';
  }

  // ---- Export / Import (the "make it live for everyone" workflow) ----
  function exportAsSeedFile() {
    const cars = getCars();
    const fileBody =
      '/* Generated by admin.html — replace the CARS_SEED array in js/store.js\n' +
      '   with this array, then re-deploy the site to publish these changes\n' +
      '   for every visitor. */\n\n' +
      'const CARS_SEED = ' + JSON.stringify(cars, null, 2) + ';\n';
    const blob = new Blob([fileBody], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cars-seed-export.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function exportAsJSON() {
    const cars = getCars();
    const blob = new Blob([JSON.stringify(cars, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cars.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importFromJSONText(jsonText) {
    const parsed = JSON.parse(jsonText);
    if (!Array.isArray(parsed)) throw new Error('Expected a JSON array of cars.');
    saveCars(parsed);
  }

  global.MBStore = {
    getCars,
    saveCars,
    addCar,
    updateCar,
    deleteCar,
    markSold,
    markAvailable,
    resetToDefaults,
    formatNGN,
    formatKm,
    exportAsSeedFile,
    exportAsJSON,
    importFromJSONText
  };
})(window);
