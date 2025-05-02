import { useState, useEffect } from "react";
import { createRendererLogger } from '../utils/logger.js'

const log = createRendererLogger('useKanban')

export function useKanban(fileContent) {
    const [kanban, setKanban] = useState([]);

    useEffect(() => {
        const lines = fileContent.split(/\r?\n/);
        const newKanban = [];
        let listId = 0;
        let currentList = null
        const regex = new RegExp("^(-|\\*|\\+) \\[ \\] ");

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('## ')) {
                const listName = lines[i].split('## ')[1];
                listId++
                const newList = { id: listId, listName, markCompleted: false, tasks: [] }
                newKanban.push(newList);
                currentList = newList
            } else if (regex.test(lines[i]) && currentList) {
                currentList.tasks.push({ status: false, text: '', priority: '', due: '', done: '', created: '' })
            }
        }
        setKanban(newKanban);
    }, [fileContent]);

    log.verbose(`Kanban is ${JSON.stringify(kanban)}`)
    return kanban;
}

function parseHeadingLine() {

}

function parseTaskLine(line) {

    return {
        status: '',
        text: '',
        priority: '',
        due: '',
        done: '',
        created: ''
    }
}