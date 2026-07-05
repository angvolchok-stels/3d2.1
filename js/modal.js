/**
 * Универсальное модальное окно
 * Использование:
 *   showModal({
 *     icon: 'ᗐ',
 *     title: 'Заявка отправлена!',
 *     message: 'Мы свяжемся с вами.',
 *     buttons: [
 *       { text: 'Каталог', link: 'index.html#catalog', class: 'btn-gold' },
 *       { text: 'На главную', link: 'index.html', class: 'btn-gold btn-outline' }
 *     ]
 *   });
 */

(function() {
  // Создаём контейнер для модалки (один раз)
  let modalContainer = null;

  function createModal() {
    if (modalContainer) return modalContainer;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'universalModal';

    const window = document.createElement('div');
    window.className = 'modal-window';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', 'Закрыть');

    // ===== НОВЫЙ КОНТЕЙНЕР ДЛЯ ПОДЛОЖКИ =====
    const innerWrap = document.createElement('div');
    innerWrap.className = 'modal-content-inner';

    const icon = document.createElement('div');
    icon.className = 'modal-icon';

    const title = document.createElement('h2');
    title.className = 'modal-title';

    const message = document.createElement('p');
    message.className = 'modal-message';

    const buttonsWrap = document.createElement('div');
    buttonsWrap.className = 'modal-buttons';

    // Собираем innerWrap
    innerWrap.appendChild(icon);
    innerWrap.appendChild(title);
    innerWrap.appendChild(message);

    // Собираем окно
    window.appendChild(closeBtn);
    window.appendChild(innerWrap);
    window.appendChild(buttonsWrap);
    overlay.appendChild(window);
    document.body.appendChild(overlay);

    // Закрытие по крестику
    closeBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне окна
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal();
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal();
      }
    });

    modalContainer = overlay;
    return overlay;
  }

  function closeModal() {
    if (modalContainer) {
      modalContainer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  window.showModal = function(options) {
    const defaults = {
      icon: 'ᗐ',
      title: 'Готово!',
      message: '',
      buttons: []
    };

    const config = { ...defaults, ...options };
    const overlay = createModal();

    // Заполняем контент
    const iconEl = overlay.querySelector('.modal-icon');
    const titleEl = overlay.querySelector('.modal-title');
    const messageEl = overlay.querySelector('.modal-message');
    const buttonsEl = overlay.querySelector('.modal-buttons');

    // ИКОНКА: символ ᗐ с цветом #2E6228 и тенью
    iconEl.innerHTML = `<span style="font-size: 56px; color: #2E6228; text-shadow: 0 6px 9px rgba(0, 0, 0, 0.6); display: inline-block; line-height: 1;">${config.icon}</span>`;

    titleEl.textContent = config.title || 'Готово!';
    messageEl.textContent = config.message || '';

    // Очищаем старые кнопки
    buttonsEl.innerHTML = '';

    // Добавляем новые кнопки
    if (config.buttons && config.buttons.length) {
      config.buttons.forEach(btn => {
        const a = document.createElement('a');
        a.textContent = btn.text || 'Кнопка';
        a.className = btn.class || 'btn-gold';

        if (btn.link) {
          a.href = btn.link;
        } else if (btn.onClick) {
          a.href = '#';
          a.addEventListener('click', function(e) {
            e.preventDefault();
            if (btn.onClick) btn.onClick();
          });
        } else {
          a.href = '#';
        }

        buttonsEl.appendChild(a);
      });
    }

    // Показываем окно
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Добавляем глобальную функцию закрытия
  window.closeModal = closeModal;
})();