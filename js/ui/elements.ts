
function pegarElemento<T extends Element>(seletor: string): T {
    const elemento = document.querySelector<T>(seletor);
    if (!elemento) {
        throw new Error("Elemento não encontrado: " + seletor);
    }
    return elemento;
}

export const form = pegarElemento<HTMLFormElement>(".task-form");
export const input = pegarElemento<HTMLInputElement>(".task-input");
export const taskList = pegarElemento<HTMLUListElement>(".task-list");