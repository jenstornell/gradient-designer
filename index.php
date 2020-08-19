<!DOCTYPE html>
<html lang="en" class="h-full">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="assets/css/tailwind.public.css?t=<?= time(); ?>">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="assets/css/prism.css" rel="stylesheet">

  <?php
  $shades = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
  /*
  Preview
    Fixa stilen på gradient preview
  Code output
    Copy code buttons
    Visa inte kod om inget har klickats i
  Fyll ut sections till screen-sm
    Låt färgerna strecha
  Sätt nyans 500 om ingen klickats i som default
  LOCK
      toggle
      opacity section
      block click
      Ta bort ur gradient
    COLORS - Koppla in
    COLORS - Svart punkt på alla utom black
    COLORS
      black
      white
      transparent
      current
  */
  ?>
</head>

<body class="font-body bg-gray-100 h-full flex flex-col">
  <div class="flex-1 flex flex-col gap-8 py-8">
    <div class="h-32 bg-red-500"></div>

    <div class="from-orange-400 via-indigo-400 to-pink-300">
      Gradient
    </div>

    <div class="flex gap-4 justify-center">
      <?php $sections = ['from', 'via', 'to'];
      foreach ($sections as $section) : ?>
        <section data-section="<?= $section; ?>" class="bg-white shadow-lg p-4 rounded-lg flex flex-col gap-2">
          <h2 class="inline-flex items-center justify-between">
            <div class="text-gray-800 leading-none text-xl"><?= ucfirst($section); ?></div>
            <div class="fill-current text-gray-400">
              <div data-unlock class="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M7 10h13a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 0 1 13.262-3.131l-1.789.894A5 5 0 0 0 7 9v1zm-2 2v8h14v-8H5zm5 3h4v2h-4v-2z" /></svg>
              </div>
              <div data-lock class="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 1 1 14 0v1zM5 12v8h14v-8H5zm6 2h2v4h-2v-4zm6-4V9A5 5 0 0 0 7 9v1h10z" /></svg>
              </div>
            </div>
          </h2>

          <h2 class="text-sm font-bold uppercase text-gray-800 mt-2">Colors</h2>

          <!-- Colors -->
          <div class="inline-grid grid-flow-row grid-cols-5 text-white max-w-sm gap-1">
            <?php
            $static_colors = ['transparent', 'current', 'black', 'white'];
            $colors_variations = [
              'gray', 'red', 'yellow', 'orange', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'
            ];
            ?>
            <?php foreach ($colors_variations as $color) :
              $name = $color;
              $color = in_array($color, ['black', 'white']) ? $color : $color . '-500';
            ?>
              <button data-type="color" data-step="<?= $section; ?>" data-color="<?= $name; ?>" class="flex rounded justify-center items-center focus:outline-none w-8 h-8 bg-<?= $color; ?>">
                <div class="bg-white h-3 w-3 rounded-full hidden"></div>
              </button>
            <?php endforeach; ?>
          </div>

          <div data-type="shades" class="contents hidden">
            <h2 class="text-sm font-bold uppercase text-gray-800 mt-2">Shades</h2>

            <!-- Shades -->
            <div class="">
              <?php foreach ($colors_variations as $color) : ?>
                <div class="hidden inline-grid grid-flow-row grid-cols-5 gap-1" data-color="<?= $color; ?>">
                  <?php foreach ($shades as $key => $shade) :
                    $dot = ((int)$shade) < 500 ? 800 : 200;
                  ?>
                    <button data-type="shade" data-step="<?= $section; ?>" data-shade="<?= $shade; ?>" class="w-8 h-8 flex items-center rounded focus:outline-none justify-center bg-<?= $color . '-' . $shade; ?>">
                      <div class="bg-<?= $color; ?>-<?= $dot; ?> h-3 w-3 rounded-full hidden"></div>
                    </button>
                  <?php endforeach; ?>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        </section>
      <?php endforeach; ?>
    </div>

    <div id="code-classes" class="flex justify-center">
      <div class="max-w-screen-sm w-full flex flex-col">
        <div>
          <h2 class="leading-none bg-gray-800 inline-block px-3 py-2 rounded-t-md text-white">Classes</h2>
        </div>
        <div class="bg-white shadow-xl rounded-lg shadow-xl">
          <pre><code class="language-html"></code></pre>
        </div>
      </div>
    </div>

    <div id="code" class="flex justify-center">
      <div class="max-w-screen-sm w-full flex flex-col">
        <div>
          <h2 class="leading-none bg-gray-800 inline-block px-3 py-2 rounded-t-md text-white">HTML</h2>
        </div>
        <div class="bg-white shadow-xl rounded-lg shadow-xl">
          <pre><code class="language-html"></code></pre>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <div class="items-center justify-center px-8 py-8 bg-gray-700 flex gap-12">
    <div class="flex gap-3 flex-col items-center">
      <div class="text-white font-bold text-4xl leading-none">Tailwind</div>
      <div class="text-gray-500 leading-none text-xl">Gradient Generator</div>
    </div>

    <div class="text-sm gap-4 text-gray-500 flex flex-col px-8 py-6 shadow-2xl rounded">
      Please make<br>
      a donation.
      <div class="flex justify-center">
        <a href="https://www.paypal.me/devoneraab" class="inline-block p-2 bg-gray-300 rounded shadow" style="vertical-align: top;">
          <img src="http://localhost/sites/halsokartan/assets/images/paypal.svg" class="w-24">
        </a>
      </div>
    </div>
  </div>
  <div class="p-4 text-sm text-center text-gray-300 bg-gray-800">
    <div class="text-gray-400">
      <span class="text-gray-600">Built with</span>
      <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>,
      <a href="https://remixicon.com/" class="hover:underline">Remixicons</a>
    </div>
  </div>
  <script src="assets/js/prism.js"></script>
  <script>
    var color = null;
    var shade = null;
    var step = null;
    var groups = {};
    groups['from'] = {};
    groups['via'] = {};
    groups['to'] = {};

    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-type="color"]').forEach(item => {
        item.addEventListener('click', (e) => {
          const current = e.currentTarget;
          const datasets = e.currentTarget.dataset;
          groups[datasets.step].color = datasets.color;

          activeColors();
          setCode();
        })
      });

      document.querySelectorAll('[data-type="shade"]').forEach(item => {
        item.addEventListener('click', (e) => {
          const current = e.currentTarget;
          const datasets = e.currentTarget.dataset;
          groups[datasets.step].shade = current.dataset.shade;
          groups[datasets.step].class = `${datasets.step}-${groups[datasets.step].color}-${groups[datasets.step].shade}`;

          activeShades();
          setCode();
        })
      });
    });

    function activeColors() {
      document.querySelectorAll('section').forEach(section => {
        const color = groups[section.dataset.section].color;

        if (typeof color !== 'undefined') {
          // Activate shade groups
          section.querySelector('[data-type="shades"]').classList.remove('hidden');
          section.querySelectorAll('[data-type="shades"] [data-color]').forEach(shade => {
            if (shade.dataset.color == color) {
              shade.classList.remove('hidden');
            } else {
              shade.classList.add('hidden');
            }
          });

          // Activate colors
          section.querySelectorAll('[data-type="color"]').forEach(item => {
            const child = item.querySelector('div');
            if (item.dataset.color == color) {
              child.classList.remove('hidden');
            } else {
              child.classList.add('hidden');
            }
          });
        }
      });
    }

    function activeShades() {
      document.querySelectorAll('section').forEach(section => {
        const shade = groups[section.dataset.section].shade;

        section.querySelectorAll('[data-shade]').forEach(item => {
          const child = item.querySelector('div');
          if (item.dataset.shade == shade) {
            child.classList.remove('hidden');
          } else {
            child.classList.add('hidden');
          }
        });
      });
    }

    function setGradient() {

    }

    function setCode() {
      let html = "";
      for (const key in groups) {
        if (typeof groups[key].class !== 'undefined') {
          console.log(groups[key].class);
          html += ' ' + groups[key].class;
        }
      };
      document.querySelector('#code code').innerHTML = `&lt;div class="${html.substring(1, html.length)}"&gt;
  Gradient
&lt;/div&gt;`;
      document.querySelector('#code-classes code').innerHTML = html.substring(1, html.length);
      Prism.highlightAll();
    }

    function getSelectionText() {
      var selectedText = ""
      if (window.getSelection) { // all modern browsers and IE9+
        selectedText = window.getSelection().toString()
      }
      return selectedText
    }
  </script>
</body>

</html>