export function renderEmployeeCard(tpl, emp)
{
    const node = tpl.content.cloneNode(true);

    const photo = node.querySelector('[data-photo]');
    const name = node.querySelector('[data-name]');
    const role = node.querySelector('[data-role]');
    const cta = node.querySelector('[data-cta]');

    photo.src = emp.photo;
    photo.alt = `Photo of ${emp.name}`;

    name.textContent = emp.name;
    role.textContent = emp.role;

    cta.href = emp.profile;

    return node;
}