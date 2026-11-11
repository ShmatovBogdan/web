import { loadEmployees } from '../api/employees.js';
import { renderEmployeeCard } from '../ui/employeeCard.js';

const EMPLOYEE_COUNT = 10;

export function initAbout() 
{
    const list = document.querySelector('.team__list');
    const tpl = document.querySelector('#employee-card-tpl');

    if (!list || !tpl) return () => {};

    const controller = new AbortController();

    async function load() 
    {
        try {
            const employees = await loadEmployees(EMPLOYEE_COUNT, { signal: controller.signal });

            if (controller.signal.aborted) return;

            const frag = document.createDocumentFragment();

            for (const emp of employees)
                frag.append(renderEmployeeCard(tpl, emp));

            list.replaceChildren(frag);

        } catch (error) {
            if (error.name === 'AbortError') return;
            console.error('Failed to initialize About page:', error);
        }
    }

    load();
    return () => controller.abort();
}