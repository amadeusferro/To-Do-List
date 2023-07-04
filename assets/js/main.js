function main() {
    let input = document.querySelector('.input');
    const ul = document.querySelector('.tasks');

    function liFactory(taskText) {
        let li = document.createElement('li');
        li.textContent = taskText;
        return li;
    }

    function btnFactory() {
        let btn = document.createElement('button');
        btn.textContent = 'Remove';
        btn.classList.add('btn-remove');
        return btn;
    }

    document.addEventListener('click', function (e) {
        let click = e.target;
        if (click.classList.contains('btn-add')) {
            if (!input.value) return;
            let li = liFactory(input.value);
            li.appendChild(btnFactory());
            ul.appendChild(li);
            input.value = '';
            input.focus();
            saveTasks();
        } else if (click.classList.contains('btn-remove')) {
            click.parentElement.remove();
            saveTasks();
        }
    });

    input.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            if (!input.value) return;
            let li = liFactory(input.value);
            li.appendChild(btnFactory());
            ul.appendChild(li);
            input.value = '';
            saveTasks();
        }
    });

    function saveTasks() {
        const liTasks = ul.querySelectorAll('li');
        const taskList = [];

        for (let task of liTasks) {
            let taskText = task.textContent.replace('Remove', '');
            taskList.push(taskText.trim());
        }

        const tasksJSON = JSON.stringify(taskList);
        localStorage.setItem('tasksss', tasksJSON);
    }

    function addSavedTasks() {
        const tasksssss = localStorage.getItem('tasksss');
        if (tasksssss) {
            const taskList = JSON.parse(tasksssss);
            for (let taskText of taskList) {
                let li = liFactory(taskText);
                li.appendChild(btnFactory());
                ul.appendChild(li);
            }
        }
    }

    addSavedTasks();
}

main();
