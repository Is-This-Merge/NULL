count = 0
titleEl = document.getElementsByClassName("hero-title")[0]
titleEl.onclick = () => {
    count += 1
    if(count == 10000) {
        titleEl.innerHTML = "€A5TEЯE9g #nine<br> 설마 일일히 누르진 않았죠? (e)"
        document.getElementsByClassName("hero-content")[0].style = "background: linear-gradient(135deg, var(--secondary) 70%, var(--primary) 100%);"
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const elements = [
        document.getElementById('counter-x'), 
        document.getElementById('counter-y'), 
        document.getElementById('counter-z'), 
        document.getElementById('counter-w')  
    ]
    if (elements.includes(null)) return;
    const initialValues = elements.map(el => parseInt(el.getAttribute('data-purecounter-end'), 10) || 0)
    let values = [...initialValues];
    elements.forEach((el, index) => {
        el.onclick = () => {
            values[index] -= 1
            if (index > 0) values[index - 1] -= 1
            if (index < elements.length - 1) values[index + 1] -= 1
            const hasNegative = values.some(num => num < 0)
            if (hasNegative) {
                values = [...initialValues]
                elements.forEach((updateEl, i) => {
                    updateEl.innerHTML = values[i]
                    updateEl.classList.remove('purecounter')
                    updateEl.classList.add('shake-animation')
                    setTimeout(() => {
                        updateEl.classList.remove('shake-animation')
                    }, 200) 
                })
            } else {
                elements.forEach((updateEl, i) => {
                updateEl.innerHTML = values[i];
                updateEl.classList.remove('purecounter');
                })
            }

            const isAllZero = values.every(num => num === 0);
            if (isAllZero) {
                const counterContainer = document.getElementById("counter");
                const currentHeight = counterContainer.offsetHeight;
                counterContainer.style.height = `${currentHeight}px`;
                counterContainer.innerHTML = `
                    <div class="overlay-mf" style="
                        opacity: 1; 
                        background: linear-gradient(135deg, var(--secondary) 70%, var(--primary) 100%);
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        color: white;
                        font-size: 3rem;
                        font-weight: 600;
                    ">
                        €a5teЯe9g #넷 비버챌린지 (l)
                    </div>
                `;
            }
        }
    })
})

const now = new Date();
const hour = now.getHours();
if (hour >= 0 && hour < 2) {
    titleEl.innerHTML = "2스터에그 #2<br> 야행성 (u)"
    document.getElementsByClassName("hero-content")[0].style = "background: linear-gradient(135deg, var(--secondary) 70%, var(--primary) 100%);"
}

const dtoggleBtn = document.getElementById('darkToggle');
const THEME_KEY = 'site-theme';

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    dtoggleBtn.setAttribute('aria-pressed', 'true');
  } else {
    document.documentElement.removeAttribute('data-theme');
    dtoggleBtn.setAttribute('aria-pressed', 'false');
  }
  localStorage.setItem(THEME_KEY, theme);
}

dtoggleBtn.addEventListener('click', () => {
  const current = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});