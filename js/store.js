/* =========================================================
   Moses Benz Auto Care — Inventory data layer
   ---------------------------------------------------------
   This is the single source of truth for "cars for sale",
   shared by index.html (teaser), inventory.html (full list)
   and admin.html (add / mark sold / delete).

   HOW PERSISTENCE WORKS (read this before you deploy):
   - Inventory is currently kept in browser storage in this HTML build.
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
        "id": "car-g-63-amg",
        "name": "G 63 AMG",
        "year": 2023,
        "priceNGN": 185000000,
        "mileageKm": 8200,
        "specTag": "4.0L V8 Biturbo",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "One owner, inspected and prepared for sale."
    },
    {
        "id": "car-c-63-s-amg",
        "name": "C 63 S AMG",
        "year": 2021,
        "priceNGN": 92000000,
        "mileageKm": 34500,
        "specTag": "4.0L V8 Biturbo",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Performance saloon with a full inspection and service review."
    },
    {
        "id": "car-amg-gt-r",
        "name": "AMG GT R",
        "year": 2022,
        "priceNGN": 164900000,
        "mileageKm": 6100,
        "specTag": "4.0L V8",
        "status": "sold",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Sold example — contact us for similar AMG stock."
    },
    {
        "id": "car-e-350",
        "name": "E 350",
        "year": 2020,
        "priceNGN": 45000000,
        "mileageKm": 61000,
        "specTag": "2.0L Turbo I4",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Well-maintained executive saloon, recently serviced."
    },
    {
        "id": "car-gle-450",
        "name": "GLE 450",
        "year": 2021,
        "priceNGN": 68000000,
        "mileageKm": 45300,
        "specTag": "3.0L Turbo I6",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Family SUV with AIRMATIC inspection and clean interior."
    },
    {
        "id": "car-c-200",
        "name": "C 200",
        "year": 2021,
        "priceNGN": 42000000,
        "mileageKm": 52000,
        "specTag": "1.5L Turbo I4",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Comfortable C-Class with a clean service history."
    },
    {
        "id": "car-c-300",
        "name": "C 300",
        "year": 2022,
        "priceNGN": 58500000,
        "mileageKm": 38200,
        "specTag": "2.0L Turbo I4",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Modern C-Class with premium trim and complete inspection."
    },
    {
        "id": "car-e-300",
        "name": "E 300",
        "year": 2021,
        "priceNGN": 52000000,
        "mileageKm": 48800,
        "specTag": "2.0L Turbo I4",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Executive E-Class, inspected and ready for viewing."
    },
    {
        "id": "car-e-450-4matic",
        "name": "E 450 4MATIC",
        "year": 2022,
        "priceNGN": 73500000,
        "mileageKm": 29400,
        "specTag": "3.0L Turbo I6",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Four-wheel-drive E-Class with strong specification."
    },
    {
        "id": "car-s-450",
        "name": "S 450",
        "year": 2021,
        "priceNGN": 118000000,
        "mileageKm": 36500,
        "specTag": "3.0L Turbo I6",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Luxury saloon with detailed mechanical and electronic inspection."
    },
    {
        "id": "car-s-580",
        "name": "S 580",
        "year": 2022,
        "priceNGN": 168000000,
        "mileageKm": 21400,
        "specTag": "4.0L V8 Biturbo",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "High-spec S-Class prepared for discerning buyers."
    },
    {
        "id": "car-glc-300",
        "name": "GLC 300",
        "year": 2022,
        "priceNGN": 64500000,
        "mileageKm": 41100,
        "specTag": "2.0L Turbo I4",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Popular compact luxury SUV, inspected in-house."
    },
    {
        "id": "car-glc-43-amg",
        "name": "GLC 43 AMG",
        "year": 2021,
        "priceNGN": 79000000,
        "mileageKm": 33700,
        "specTag": "3.0L V6 Biturbo",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "AMG performance SUV with workshop inspection."
    },
    {
        "id": "car-gle-350",
        "name": "GLE 350",
        "year": 2020,
        "priceNGN": 58500000,
        "mileageKm": 58200,
        "specTag": "2.0L Turbo I4",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Practical premium SUV with service checks completed."
    },
    {
        "id": "car-gle-53-amg",
        "name": "GLE 53 AMG",
        "year": 2022,
        "priceNGN": 98000000,
        "mileageKm": 27600,
        "specTag": "3.0L Turbo I6",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "AMG SUV with performance-focused specification."
    },
    {
        "id": "car-gls-450",
        "name": "GLS 450",
        "year": 2021,
        "priceNGN": 92000000,
        "mileageKm": 49700,
        "specTag": "3.0L Turbo I6",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Three-row luxury SUV, inspected and serviced."
    },
    {
        "id": "car-gls-580",
        "name": "GLS 580",
        "year": 2022,
        "priceNGN": 139000000,
        "mileageKm": 31200,
        "specTag": "4.0L V8 Biturbo",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Large luxury SUV with premium V8 specification."
    },
    {
        "id": "car-gla-250",
        "name": "GLA 250",
        "year": 2021,
        "priceNGN": 48000000,
        "mileageKm": 43800,
        "specTag": "2.0L Turbo I4",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Compact SUV, clean and workshop-inspected."
    },
    {
        "id": "car-glb-250",
        "name": "GLB 250",
        "year": 2022,
        "priceNGN": 53500000,
        "mileageKm": 35100,
        "specTag": "2.0L Turbo I4",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Practical compact SUV with flexible cabin space."
    },
    {
        "id": "car-a-200",
        "name": "A 200",
        "year": 2021,
        "priceNGN": 39000000,
        "mileageKm": 46700,
        "specTag": "1.3L Turbo I4",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Compact Mercedes with economical turbo petrol engine."
    },
    {
        "id": "car-a-250",
        "name": "A 250",
        "year": 2022,
        "priceNGN": 47500000,
        "mileageKm": 29900,
        "specTag": "2.0L Turbo I4",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Sporty compact hatchback with a clean inspection."
    },
    {
        "id": "car-cla-250",
        "name": "CLA 250",
        "year": 2021,
        "priceNGN": 49500000,
        "mileageKm": 40200,
        "specTag": "2.0L Turbo I4",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Sleek compact saloon with premium interior."
    },
    {
        "id": "car-cls-450",
        "name": "CLS 450",
        "year": 2020,
        "priceNGN": 62000000,
        "mileageKm": 55800,
        "specTag": "3.0L Turbo I6",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Elegant four-door coupe with full inspection."
    },
    {
        "id": "car-gle-400d",
        "name": "GLE 400d",
        "year": 2021,
        "priceNGN": 72000000,
        "mileageKm": 61000,
        "specTag": "2.9L Turbo Diesel I6",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Diesel GLE with strong torque and service checks."
    },
    {
        "id": "car-v-220d",
        "name": "V 220d",
        "year": 2020,
        "priceNGN": 56000000,
        "mileageKm": 72000,
        "specTag": "2.0L Turbo Diesel",
        "status": "available",
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?fm=jpg&q=75&w=1400&auto=format&fit=crop",
        "description": "Premium people carrier, suitable for family or executive use."
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
