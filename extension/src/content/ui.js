// content/ui.js
/**
 * Создаёт и возвращает плавающую кнопку (не вставляет в DOM автоматически)
 * caller может затем appendChild и навесить события.
 */
export function createFloatingButton({ id, title = 'Open', iconPath }) {
    const btn = document.createElement('button');
    btn.id = id;
    btn.title = title;
    Object.assign(btn.style, {
        position: 'fixed',
        right: '18px',
        bottom: '80px',
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'rgba(66, 147, 228, 0.36) 0px 12px 36px, rgba(79, 70, 229, 0.12) 0px 2px 6px inset',
        cursor: 'pointer',
        zIndex: '2147483646',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform .18s ease, box-shadow .18s ease',
        padding: '0',
        userSelect: 'none'
    });

    const img = document.createElement('img');
    img.src = iconPath || '';
    img.alt = title;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.borderRadius = '50%';
    img.style.objectFit = 'cover';
    btn.appendChild(img);

    btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-6px) scale(1.04)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'none');

    return btn;
}
