<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="assets/css/tailwind.public.css">

  <?php
  $shades = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
  ?>
</head>

<body>
  <div class="h-32 bg-red-500"></div>

  <div class="flex gap-2">
    <?php $sections = ['from', 'via', 'to'];
    foreach ($sections as $section) : ?>
      <section data-section="<?= $section; ?>" class="p-4 border rounded flex flex-col gap-2">
        <h2 class="text-xs inline-flex items-center justify-between">
          <div class="text-xs p-1 bg-gray-200 text-gray-600 border leading-none rounded"><?= $section; ?></div>
          <div class="text-xs p-1 bg-gray-200 text-gray-600 border leading-none rounded">Pick color</div>
        </h2>

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
          <h2 class="text-xs font-bold uppercase text-gray-800">Shades</h2>

          <!-- Shades -->
          <div class="">
            <?php foreach ($colors_variations as $color) : ?>
              <div class="hidden inline-grid grid-flow-row grid-cols-5 gap-1" data-shade="<?= $color; ?>">
                <?php foreach ($shades as $shade) : ?>
                  <button data-type="shade" data-step="<?= $section; ?>" data-color="<?= $color; ?>" data-shade="<?= $shade; ?>" class="w-8 h-8 items-center justify-center bg-<?= $color . '-' . $shade; ?>">
                    <div class="bg-white h-3 w-3 rounded-full hidden"></div>
                  </button>
                <?php endforeach; ?>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </section>
    <?php endforeach; ?>
  </div>
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

          console.log(groups);

          const shades = current.closest('section').querySelector('[data-shade="' + datasets.color + '"]');
          console.log(shades);
          shades.classList.remove('hidden');
          const shadesRoot = current.closest('section').querySelector('[data-type="shades"]');
          shadesRoot.classList.remove('hidden');
        })
      });
    });

    function activeColors() {
      document.querySelectorAll('section').forEach(section => {
        const color = groups[section.dataset.section].color;
        section.querySelectorAll('[data-type="color"]').forEach(item => {
          const child = item.querySelector('div');
          if (item.dataset.color == color) {
            child.classList.remove('hidden');
          } else {
            child.classList.add('hidden');
          }
        });
      });
    }

    function activeShades() {

    }

    function setGradient() {

    }
  </script>
</body>

</html>