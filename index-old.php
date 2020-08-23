<!DOCTYPE html>
<html lang="en" class="h-full">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Gradient Designer</title>
  <link rel="stylesheet" href="assets/css/tailwind.purged.css?t=<?= time(); ?>">
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
      'dot-color' => 'bg-white',
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
  ?>
</head>

<body class="flex flex-col h-full text-gray-800 bg-gray-100 font-body">
  <div class="flex flex-col flex-1 gap-12 px-4 pb-12 sm:px-8">
    <div class="relative pt-4">
      <div class="flex items-center justify-between max-w-screen-sm mx-auto">
        <div class="flex flex-col items-center gap-3 sm:flex-row">
          <div class="text-2xl font-bold leading-none">Tailwind</div>
          <div class="text-xl leading-none text-gray-500">Gradient Designer</div>
        </div>
        <a href="https://github.com/jenstornell/tailwind-gradient-designer">
          <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" /></svg>
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
                    <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full text-sm text-gray-400">C</div>
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

      <!-- Direction -->
      <div data-direction class="flex justify-center">
        <div class="flex flex-col w-full max-w-screen-sm">
          <div class="flex items-center justify-between">
            <h2 class="px-3 py-2 leading-none text-white bg-gray-800 rounded-t-md">Direction</h2>
          </div>
          <div class="grid grid-flow-row p-4 text-gray-500 bg-white rounded-lg shadow-lg fill-current" style="grid-template-columns: repeat(3, minmax(0, min-content));">
            <button data-class="tl" class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M9.414 8l8.607 8.607-1.414 1.414L8 9.414V17H6V6h11v2z" /></svg>
            </button>
            <button data-class="t" class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z" /></svg>
            </button>
            <button data-class="tr" class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z" /></svg>
            </button>
            <button data-class="l" class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" /></svg>
            </button>
            <div></div>
            <button data-class="r" class="text-gray-800 bg-gray-300 border border-transparent rounded focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" /></svg>
            </button>
            <button data-class="bl" class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M9 13.59l8.607-8.607 1.414 1.414-8.607 8.607H18v2H7v-11h2v7.585z" /></svg>
            </button>
            <button data-class="b" class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z" /></svg>
            </button>
            <button data-class="br" class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M14.59 16.004L5.982 7.397l1.414-1.414 8.607 8.606V7.004h2v11h-11v-2z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div data-code data-preview class="flex justify-center hidden">
      <div class="flex flex-col w-full max-w-screen-sm">
        <div class="flex items-center justify-between">
          <h2 class="px-3 py-2 leading-none text-white bg-gray-800 rounded-t-md">Preview</h2>
        </div>
        <div data-gradient class="h-16 bg-white rounded-b-lg shadow-xl"></div>
      </div>
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
      <div class="text-xl leading-none text-gray-500">Gradient Designer</div>
    </div>

    <div class="flex flex-col gap-4 px-8 py-6 text-sm text-gray-500 rounded shadow-2xl">
      Please make<br>
      a donation.
      <div class="flex justify-center">
        <a href="https://www.paypal.me/devoneraab" class="inline-block p-2 bg-gray-300 rounded shadow" style="vertical-align: top;">
          <img src="assets/images/paypal.svg" class="w-24">
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
    var direction = 'r';
    groups['from'] = {
      shade: "500",
      color: "none"
    };
    groups['via'] = {
      shade: "500",
      color: "none"
    };
    groups['to'] = {
      shade: "500",
      color: "none"
    };

    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-type="color"]').forEach(item => {
        item.addEventListener('click', (e) => {
          const current = e.currentTarget;
          const datasets = e.currentTarget.dataset;
          const colors = item.closest('[data-type="colors"]');
          const section = item.closest('section');
          const color = datasets.color;

          groups[datasets.step].color = color;

          if (['transparent', 'current', 'black', 'white'].includes(color)) {
            groups[datasets.step].class = `${datasets.step}-${color}`;
          } else if (typeof groups[datasets.step].class == 'undefined') {
            groups[datasets.step].class = `${datasets.step}-${color}-500`;
          } else {
            groups[datasets.step].class = `${datasets.step}-${color}-${groups[datasets.step].shade}`;
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
        const select = group.querySelector('[data-select]');
        if (select) {
          select.addEventListener('click', (e) => {
            selectText(group.querySelector('pre'));
          });
        }
      });

      document.querySelectorAll('[data-class]').forEach(el => {
        el.addEventListener('click', (e) => {
          const dataclass = e.currentTarget.dataset.class;
          direction = dataclass;

          document.querySelectorAll('[data-class]').forEach(item => {
            item.classList.add('hover:border-gray-500');
            item.classList.remove('text-gray-800', 'bg-gray-300');
          });

          e.currentTarget.classList.add('text-gray-800', 'bg-gray-300');
          e.currentTarget.classList.remove('hover:border-gray-500');
          //text-gray-800 bg-gray-300 border border-transparent rounded focus:outline-none

          setCode();
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

    function setCode() {
      let html = "";
      for (const key in groups) {
        const color = groups[key].color;
        if (typeof groups[key].class !== 'undefined' && color !== 'none') {
          html += ' ' + groups[key].class;
        }
      };

      html = html.substring(1, html.length);
      html_with_direction = `bg-gradient-to-${direction + ' ' + html}`;
      document.querySelector('#code code').innerHTML = `&lt;div class="${html_with_direction}"&gt;
  Gradient
&lt;/div&gt;`;
      document.querySelector('#code-classes code').innerHTML = html_with_direction;

      const default_classes = 'h-16 rounded-b-lg shadow-xl';
      document.querySelector('[data-gradient]').setAttribute('class', default_classes + ' ' + html_with_direction);

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