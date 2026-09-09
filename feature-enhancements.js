const algorithmDetails = {
  bubble: {
    description: 'Bubble Sort repeatedly compares neighboring values and swaps them when they are out of order. It is easy to understand and stable, but usually slow for large arrays.',
    applications: ['Teaching comparison sorting', 'Small or nearly sorted lists', 'Stable ordering of records'],
    video: 'https://www.youtube.com/results?search_query=bubble+sort+time+complexity'
  },
  selection: {
    description: 'Selection Sort repeatedly selects the smallest remaining value and places it at the next sorted position. It uses very little extra memory.',
    applications: ['Memory-constrained systems', 'Small lists', 'Simple embedded implementations'],
    video: 'https://www.youtube.com/results?search_query=selection+sort+time+complexity'
  },
  insertion: {
    description: 'Insertion Sort grows a sorted prefix by inserting each new value into its correct position. It performs well when data is already almost sorted.',
    applications: ['Live or streaming data', 'Small collections', 'Maintaining sorted lists'],
    video: 'https://www.youtube.com/results?search_query=insertion+sort+time+complexity'
  },
  shell: {
    description: 'Shell Sort improves insertion sort by comparing values that are far apart first, then progressively reducing the gap until the array is sorted.',
    applications: ['Medium-sized in-memory lists', 'Embedded systems', 'Situations needing low extra memory'],
    video: 'https://www.youtube.com/results?search_query=shell+sort+time+complexity'
  },
  merge: {
    description: 'Merge Sort divides the input, sorts each half, then merges the sorted halves. Its predictable runtime makes it useful for larger data sets.',
    applications: ['External file sorting', 'Stable database ordering', 'Parallel sorting pipelines'],
    video: 'https://www.youtube.com/results?search_query=merge+sort+time+complexity'
  },
  quick: {
    description: 'Quick Sort partitions values around a pivot and recursively sorts the partitions. Good pivot choices make it fast in practice.',
    applications: ['In-memory general-purpose sorting', 'Searching and partitioning data', 'Systems where average speed matters'],
    video: 'https://www.youtube.com/results?search_query=quick+sort+time+complexity'
  },
  heap: {
    description: 'Heap Sort builds a heap and repeatedly removes the highest-priority value. It offers reliable O(n log n) performance with constant extra space.',
    applications: ['Priority queues', 'Scheduling systems', 'Memory-sensitive sorting'],
    video: 'https://www.youtube.com/results?search_query=heap+sort+time+complexity'
  },
  radix: {
    description: 'Radix Sort orders values digit by digit rather than comparing them directly. Its performance depends on the number of digits and the chosen base.',
    applications: ['Integer identifiers', 'Fixed-width strings', 'Large batches of numeric keys'],
    video: 'https://www.youtube.com/results?search_query=radix+sort+time+complexity'
  },
  bfs: {
    description: 'Breadth-First Search explores a graph level by level, visiting all nearby nodes before moving farther away.',
    applications: ['Shortest paths in unweighted graphs', 'Network broadcasting', 'Web crawlers and social graphs'],
    video: 'https://www.youtube.com/results?search_query=breadth+first+search+time+complexity'
  },
  dfs: {
    description: 'Depth-First Search follows one branch as far as possible before backtracking to explore the next branch.',
    applications: ['Maze solving', 'Dependency analysis', 'Cycle and component detection'],
    video: 'https://www.youtube.com/results?search_query=depth+first+search+time+complexity'
  },
  dijkstra: {
    description: "Dijkstra's algorithm expands the closest known node and relaxes its outgoing edges to find minimum-cost paths.",
    applications: ['GPS route planning', 'Network routing', 'Transportation maps'],
    video: 'https://www.youtube.com/results?search_query=dijkstra+algorithm+time+complexity'
  },
  astar: {
    description: 'A* combines the cost already travelled with a heuristic estimate to focus its search toward the target.',
    applications: ['Game pathfinding', 'Robot navigation', 'Grid and map routing'],
    video: 'https://www.youtube.com/results?search_query=a+star+algorithm+time+complexity'
  },
  queens: {
    description: 'The N-Queens backtracking algorithm places queens row by row and reverses choices whenever a placement conflicts.',
    applications: ['Constraint solving', 'Puzzle generation', 'Search and scheduling problems'],
    video: 'https://www.youtube.com/results?search_query=n+queens+backtracking+time+complexity'
  }
};

let lastAlgorithm = '';

function getAlgorithm() {
  const title = document.querySelector('.view__title')?.textContent?.trim().toLowerCase() || '';
  const aliases = {
    'a*': 'astar',
    'a star': 'astar',
    'breadth-first': 'bfs',
    'breadth first': 'bfs',
    'depth-first': 'dfs',
    'depth first': 'dfs',
    'n queens': 'queens',
    'n-queens': 'queens'
  };
  const alias = Object.entries(aliases).find(([name]) => title.includes(name));
  const key = alias?.[1] || Object.keys(algorithmDetails).find((name) => title.includes(name));
  return key ? { key, title, ...algorithmDetails[key] } : null;
}

function showError(message) {
  const existing = document.querySelector('.feature-error-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'feature-error-toast';
  toast.setAttribute('role', 'alert');
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 4500);
}

function applySpitLogo() {
  const mark = document.querySelector('.sidebar__mark, .sidebar img, .sidebar svg');
  if (!mark || mark.dataset.spitLogoReady === 'true') return;
  mark.dataset.spitLogoReady = 'true';
  if (mark instanceof HTMLImageElement) {
    mark.src = './spit_logo.png';
    mark.alt = 'Sardar Patel Institute of Technology logo';
    mark.classList.add('spit-logo');
    mark.width = 42;
    mark.height = 42;
    return;
  }
  const logo = document.createElement('img');
  logo.src = './spit_logo.png';
  logo.alt = 'Sardar Patel Institute of Technology logo';
  logo.className = 'spit-logo';
  logo.width = 42;
  logo.height = 42;
  mark.replaceWith(logo);
}

function applySpitBranding() {
  document.title = 'SPIT Algo Visualizer';
  const title = document.querySelector('.sidebar__title');
  if (title && title.textContent !== 'SPIT Algo Visualizer') title.textContent = 'SPIT Algo Visualizer';

  const subtitle = document.querySelector('.sidebar__subtitle');
  if (subtitle && subtitle.textContent !== 'Interactive algorithm laboratory') {
    subtitle.textContent = 'Interactive algorithm laboratory';
  }

  const note = document.querySelector('.sidebar__note');
  if (note && note.textContent !== 'Understand the pattern. Master the logic.') {
    note.textContent = 'Understand the pattern. Master the logic.';
  }

  const topbar = document.querySelector('.app__topbar');
  const topbarLabel = topbar?.querySelector(':scope > div:last-child, :scope > span:last-child');
  if (topbarLabel && !topbarLabel.querySelector('button') && topbarLabel.textContent !== 'SPIT Algo Visualizer') {
    topbarLabel.textContent = 'SPIT Algo Visualizer';
  }
}

function renderAlgorithmInfo() {
  const details = getAlgorithm();
  const header = document.querySelector('.view__header');
  if (!details || !header || details.key === lastAlgorithm) return;
  lastAlgorithm = details.key;
  document.querySelector('.feature-info-grid')?.remove();
  const grid = document.createElement('section');
  grid.className = 'feature-info-grid';
  grid.innerHTML = `
    <article class="feature-info-card">
      <h3>Description</h3>
      <p>${details.description}</p>
    </article>
    <article class="feature-info-card">
      <h3>Applications</h3>
      <ul>${details.applications.map((item) => `<li>${item}</li>`).join('')}</ul>
    </article>
    <article class="feature-info-card">
      <h3>Time complexity</h3>
      <p>Watch a short visual explanation of ${details.title} and its Big O behavior.</p>
      <a class="feature-video-link" href="${details.video}" target="_blank" rel="noreferrer">Watch video</a>
    </article>`;
  header.insertAdjacentElement('afterend', grid);
}

function setupArraySizeInput() {
  const range = document.querySelector('.view__size-control input[type="range"]');
  if (!range || range.dataset.textInputReady === 'true') return;
  range.dataset.textInputReady = 'true';
  const parent = range.closest('.view__size-control') || range.parentElement;
  const wrap = document.createElement('label');
  wrap.className = 'array-size-input-wrap';
  wrap.textContent = 'Type size';
  const input = document.createElement('input');
  input.className = 'array-size-input';
  input.type = 'number';
  input.min = range.min || '2';
  input.max = range.max || '100';
  input.value = range.value;
  input.setAttribute('aria-label', 'Array size');
  input.addEventListener('change', () => {
    const value = Math.max(Number(input.min), Math.min(Number(input.max), Number(input.value)));
    if (!Number.isInteger(value)) {
      showError('Array size must be a whole number.');
      return;
    }
    input.value = value;
    range.value = value;
    range.dispatchEvent(new Event('input', { bubbles: true }));
    range.dispatchEvent(new Event('change', { bubbles: true }));
  });
  wrap.appendChild(input);
  parent?.appendChild(wrap);
}

function watchExistingErrors() {
  document.querySelectorAll('.sort-practice__error, .gb-error, .gdp-feedback--err').forEach((error) => {
    if (error.textContent.trim() && error.dataset.promptShown !== 'true') {
      error.dataset.promptShown = 'true';
      showError(error.textContent.trim());
    }
  });
}

function setupInteractionPrompts() {
  if (document.body.dataset.interactionPromptsReady === 'true') return;
  document.body.dataset.interactionPromptsReady = 'true';

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    if (target.closest('button[disabled]')) {
      showError('That move is not available yet. Complete the current step and try again.');
      return;
    }

    const graph = target.closest('.graph-canvas');
    if (graph && !target.closest('.graph-node')) {
      showError('Select a valid graph node as the target.');
      return;
    }

    if (target.closest('.sort-practice__btn-row, .sort-practice__stage')) {
      window.setTimeout(() => {
        const error = document.querySelector('.sort-practice__error');
        if (error?.textContent?.trim()) showError(error.textContent.trim());
      }, 0);
    }

    if (target.closest('.quiz-option, .quiz-next, .gdp-choice-btn, .queens-cell')) {
      window.setTimeout(() => {
        const error = document.querySelector('.quiz-card__result-blurb, .gdp-feedback--err, .queens-trying');
        if (error?.classList.contains('gdp-feedback--err') || error?.textContent?.toLowerCase().includes('incorrect')) {
          showError(error.textContent.trim() || 'That answer is incorrect. Try again.');
        }
      }, 0);
    }
  }, true);
}

window.addEventListener('error', (event) => {
  if (/target|node|edge|gamif|practice/i.test(event.message || '')) {
    showError('Something went wrong with that action. Please select a valid target and try again.');
  }
});

const observer = new MutationObserver(() => {
  applySpitLogo();
  applySpitBranding();
  renderAlgorithmInfo();
  setupArraySizeInput();
  watchExistingErrors();
});

window.addEventListener('DOMContentLoaded', () => {
  applySpitLogo();
  applySpitBranding();
  renderAlgorithmInfo();
  setupArraySizeInput();
  setupInteractionPrompts();
  observer.observe(document.body, { childList: true, subtree: true });
});