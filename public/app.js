const resultList = document.querySelector('#resultList');
const generateBtn = document.querySelector('#generate');
const countInput = document.querySelector('#count');
const startsWithInput = document.querySelector('#startsWith');
const lengthInput = document.querySelector('#length');
const errorBox = document.querySelector('#errorBox');
const copyAllBtn = document.querySelector('#copyAll');

const setError = (message) => {
  if (!message) {
    errorBox.classList.add('d-none');
    errorBox.textContent = '';
    return;
  }
  errorBox.textContent = message;
  errorBox.classList.remove('d-none');
};

const renderNames = (names) => {
  resultList.innerHTML = '';
  names.forEach((name) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${name}</span>`;
    resultList.appendChild(li);
  });
};

const buildQuery = () => {
  const count = Number(countInput.value || 5);
  const startsWith = startsWithInput.value.trim();
  const length = Number(lengthInput.value || 0);

  const params = new URLSearchParams();
  params.set('count', Math.min(Math.max(count, 1), 20));
  if (startsWith) params.set('startsWith', startsWith);
  if (length > 0) params.set('length', length);
  return params.toString();
};

const loadRandomName = async () => {
  setError('');
  const query = buildQuery();

  try {
    const response = await fetch(`/random-name?${query}`);
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Something went wrong.');
      renderNames([]);
      return;
    }

    const names = data.results.map((item) => `${item.first_name} ${item.last_name}`);
    renderNames(names);
  } catch (error) {
    setError('Unable to reach the server. Try again.');
  }
};

const copyAll = async () => {
  const names = Array.from(resultList.querySelectorAll('li')).map((li) => li.innerText);
  if (!names.length) return;

  try {
    await navigator.clipboard.writeText(names.join('\n'));
    setError('Copied to clipboard!');
  } catch (error) {
    setError('Copy failed.');
  }
};

generateBtn.addEventListener('click', loadRandomName);
copyAllBtn.addEventListener('click', copyAll);
