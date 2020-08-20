<!DOCTYPE html>
<html lang="en" class="h-full">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="assets/css/tailwind.public.css?t=<?= time(); ?>">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="assets/css/prism.css" rel="stylesheet">

  <style>
    .chess {
      background-image: linear-gradient(45deg, rgb(160, 174, 192) 25%, transparent 25%),
        linear-gradient(-45deg, rgb(160, 174, 192) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgb(160, 174, 192) 75%),
        linear-gradient(-45deg, transparent 75%, rgb(160, 174, 192) 75%);
      background-size: 12px 12px;
      background-position: 0 0,
        0 6px,
        6px -6px,
        -6px 0px;
    }

    .close {
      height: calc(150% - 6px);
      width: calc(150% - 6px);
    }

    .close:before,
    .close:after {
      position: absolute;
      left: calc(50% - 1px);
      content: ' ';
      height: 100%;
      width: 2px;
      background-color: #718096;
    }

    .close:before {
      transform: rotate(45deg);
    }

    .close:after {
      transform: rotate(-45deg);
    }

    .close-active:before,
    .close-active:after {
      background-color: #f56565;
    }
  </style>

  <?php
  $shades = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
  $colors = [
    [
      'color' => 'none',
      'classes' => 'border',
      'dot-color' => 'bg-red-700',
      'shades' => false
    ],
    [
      'color' => 'transparent',
      'classes' => 'chess border',
      'dot-color' => 'bg-black',
      'shades' => false,
    ],
    [
      'color' => 'current',
      'classes' => 'border',
      'dot-color' => 'bg-black',
      'shades' => false,
    ],
    [
      'color' => 'black',
      'shades' => false,
    ],
    [
      'color' => 'white',
      'classes' => 'border',
      'dot-color' => 'bg-black',
      'shades' => false,
    ],
    ['color' => 'gray'],
    ['color' => 'red'],
    ['color' => 'yellow'],
    ['color' => 'orange'],
    ['color' => 'green'],
    ['color' => 'teal'],
    ['color' => 'blue',],
    ['color' => 'indigo'],
    ['color' => 'purple',],
    ['color' => 'pink']
  ];
  $root = 'http://localhost/tools/tailwind-gradient-generator/';
  /*
  DIRECTION
    Hjul html med buttons
    Klicka för att toggla runt
    Till HTML
    Till classes
    Till preview
  PREVIEW
    Fixa stilen på gradient preview
    Lägg till korrekta klasser
      Disabled
      Med eller utan shade
  HTML
    Disabled color
  */
  ?>
</head>

<body class="flex flex-col h-full text-gray-800 bg-gray-100 font-body">
  <div class="flex flex-col flex-1 gap-8 px-4 pb-8 sm:px-8">
    <div class="relative pt-4">
      <div class="max-w-screen-sm mx-auto">
        <a href="<?= $root; ?>" class="flex flex-col items-center gap-3 sm:flex-row">
          <div class="text-2xl font-bold leading-none">Tailwind</div>
          <div class="text-xl leading-none text-gray-500">Gradient Generator</div>
        </a>
      </div>
    </div>
    <div class="flex flex-col items-center w-full max-w-screen-sm gap-4 mx-auto sm:items-start sm:flex-row">
      <?php $sections = ['from', 'via', 'to'];
      foreach ($sections as $section) : ?>
        <section data-section="<?= $section; ?>" class="flex flex-col items-start gap-2 p-4 bg-white rounded-lg shadow-lg">
          <h2 class="inline-flex items-center justify-between">
            <div class="text-xl leading-none text-gray-800"><?= ucfirst($section); ?></div>
          </h2>

          <!-- Colors wrap -->
          <div data-type="colors" class="flex flex-col gap-2">
            <h2 class="flex w-full gap-2 mt-2 text-sm font-bold text-gray-800 uppercase">
              Color:
              <div data-name class="font-normal text-gray-500">none</div>
            </h2>

            <!-- Colors -->
            <div class="grid max-w-sm grid-flow-row grid-cols-5 gap-1">
              <?php foreach ($colors as $group) :
                $shades_bool = isset($group['shades']) && $group['shades'] === false ? false : true;
                $dot_color = isset($group['dot-color']) ? $group['dot-color'] : 'bg-white';
                $has_shades = $shades_bool ? "true" : "false";
                $classes = isset($group['classes']) ? $group['classes'] : '';
                $class_color = $shades_bool ? 'bg-' . $group['color'] . '-500' : 'bg-' . $group['color'];
                $dot_class = $group['color'] == 'none' ? '' : 'hidden';
              ?>
                <button data-has-shades="<?= $has_shades; ?>" data-type="color" data-step="<?= $section; ?>" data-color="<?= $group['color']; ?>" class="<?= $classes; ?> flex rounded justify-center items-center focus:outline-none relative w-8 h-8 <?= $class_color; ?>" title="<?= $group['color']; ?>">
                  <?php if ($group['color'] == 'current') : ?>
                    <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full text-3xl text-gray-400">C</div>
                  <?php endif; ?>
                  <?php if ($group['color'] == 'none') : ?>
                    <div class="absolute w-full h-full opacity-25 close"></div>
                  <?php endif; ?>
                  <?php if ($group['color'] == 'none') : ?>
                    <div data-dot class="absolute w-full h-full close close-active"></div>
                  <?php else : ?>
                    <div data-dot class="z-10 <?= $dot_class; ?> w-3 h-3 <?= $dot_color; ?> rounded-full"></div>
                  <?php endif; ?>
                </button>
              <?php endforeach; ?>
            </div>
          </div>

          <!-- Shades wrap -->
          <div data-type="shades" class="hidden contents">
            <h2 class="flex gap-2 mt-2 text-sm font-bold text-gray-800 uppercase">
              Shade:
              <div data-name class="font-normal text-gray-500">500</div>
            </h2>

            <!-- Shades -->
            <div class="">
              <?php foreach ($colors as $group) :
                if (isset($group['shades']) && $group['shades'] === false) continue;
                $color = $group['color'];
              ?>
                <div class="inline-grid hidden grid-flow-row grid-cols-5 gap-1" data-color="<?= $color; ?>">
                  <?php foreach ($shades as $key => $shade) :
                    $dot = ((int)$shade) < 500 ? 800 : 200;
                  ?>
                    <button data-type="shade" data-step="<?= $section; ?>" data-shade="<?= $shade; ?>" class="w-8 h-8 flex items-center rounded focus:outline-none justify-center bg-<?= $color . '-' . $shade; ?>">
                      <div data-dot class="bg-<?= $color; ?>-<?= $dot; ?> h-3 w-3 rounded-full hidden"></div>
                    </button>
                  <?php endforeach; ?>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        </section>
      <?php endforeach; ?>
    </div>

    <!-- Code classes -->
    <div data-code="classes" id="code-classes" class="flex justify-center hidden">
      <div class="flex flex-col w-full max-w-screen-sm">
        <div class="flex items-center justify-between">
          <h2 class="px-3 py-2 leading-none text-white bg-gray-800 rounded-t-md">Classes</h2>
          <div data-select class="px-3 py-2 leading-none bg-gray-300 cursor-default select-none rounded-t-md">Select code</div>
        </div>
        <div class="bg-white rounded-lg shadow-xl">
          <pre><code class="language-html"></code></pre>
        </div>
      </div>
    </div>

    <div data-code="html" id="code" class="flex justify-center hidden">
      <div class="flex flex-col w-full max-w-screen-sm">
        <div class="flex items-center justify-between">
          <h2 class="inline-block px-3 py-2 leading-none text-white bg-gray-800 rounded-t-md">HTML</h2>
          <div data-select class="px-3 py-2 leading-none bg-gray-300 cursor-default select-none rounded-t-md">Select code</div>
        </div>
        <div class="bg-white rounded-lg shadow-xl">
          <pre><code class="language-html"></code></pre>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <div class="flex flex-col items-center justify-center gap-8 px-8 py-8 bg-gray-700 sm:flex-row">
    <div class="flex flex-col items-center gap-3">
      <div class="text-4xl font-bold leading-none text-white">Tailwind</div>
      <div class="text-xl leading-none text-gray-500">Gradient Generator</div>
    </div>

    <div class="flex flex-col gap-4 px-8 py-6 text-sm text-gray-500 rounded shadow-2xl">
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
    groups['from'] = {
      shade: "500"
    };
    groups['via'] = {
      shade: "500"
    };
    groups['to'] = {
      shade: "500"
    };

    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-type="color"]').forEach(item => {
        item.addEventListener('click', (e) => {
          const current = e.currentTarget;
          const datasets = e.currentTarget.dataset;
          const colors = item.closest('[data-type="colors"]');
          const section = item.closest('section');

          groups[datasets.step].color = datasets.color;

          if (typeof groups[datasets.step].class == 'undefined') {
            groups[datasets.step].class = `${datasets.step}-${groups[datasets.step].color}-500`;
          } else {
            groups[datasets.step].class = `${datasets.step}-${groups[datasets.step].color}-${groups[datasets.step].shade}`;
          }

          if (item.dataset.hasShades == "true") {
            section.querySelector('[data-type="shades"]').classList.remove('hidden');
          } else {
            section.querySelector('[data-type="shades"]').classList.add('hidden');
          }

          colors.querySelector('[data-name]').innerHTML = groups[datasets.step].color;

          activeColors();
          activeShades();
          setCode();
        })
      });

      document.querySelectorAll('[data-type="shade"]').forEach(item => {
        item.addEventListener('click', (e) => {
          const current = e.currentTarget;
          const datasets = e.currentTarget.dataset;

          groups[datasets.step].shade = current.dataset.shade;
          groups[datasets.step].class = `${datasets.step}-${groups[datasets.step].color}-${groups[datasets.step].shade}`;

          item.closest('[data-type="shades"]').querySelector('[data-name]').innerHTML = groups[datasets.step].shade;

          activeShades();
          setCode();
        })
      });

      document.querySelectorAll('[data-code]').forEach(group => {
        group.querySelector('[data-select]').addEventListener('click', (e) => {
          selectText(group.querySelector('pre'));
        });
      });
    });

    function activeColors() {
      document.querySelectorAll('section').forEach(section => {
        const color = groups[section.dataset.section].color;

        if (typeof color !== 'undefined') {
          // Activate shade groups
          section.querySelectorAll('[data-type="shades"] [data-color]').forEach(shade => {
            if (shade.dataset.color == color) {
              shade.classList.remove('hidden');
            } else {
              shade.classList.add('hidden');
            }
          });

          // Activate colors
          section.querySelectorAll('[data-type="color"]').forEach(item => {
            const child = item.querySelector('[data-dot]');
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
          const child = item.querySelector('[data-dot]');
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
        const color = groups[key].color;
        if (typeof groups[key].class !== 'undefined' && color !== 'none') {
          html += ' ' + groups[key].class;
        }
      };
      html = html.substring(1, html.length);
      document.querySelector('#code code').innerHTML = `&lt;div class="${html}"&gt;
  Gradient
&lt;/div&gt;`;
      document.querySelector('#code-classes code').innerHTML = html;
      Prism.highlightAll();

      if (html == "") {
        document.querySelectorAll('[data-code]').forEach(el => {
          el.classList.add('hidden');
        });
      } else {
        document.querySelectorAll('[data-code]').forEach(el => {
          el.classList.remove('hidden');
        });
      }
    }

    function selectText(el) {
      const range = document.createRange();
      range.selectNode(el);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  </script>
</body>

</html>