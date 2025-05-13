# todo.md

todo.md is a simple way to manage todo lists using plain text files. It uses **_attributes_** to define information about tasks.

> ⚠️ **NOTE:** The format is not finalized and is subject to change.

# Example

```markdown

## todo

- [ ] this is a task
- [ ] a task can have attributes like this [due:: 2025-05-12]
- [ ] a task with all possible attributes [priority:: low] [start:: 2025-05-12] [due:: 2025-05-12] [done:: 2025-05-12] [created:: 2025-05-12]

## wip

- [/] tasks in progress can be marked with '/'
- [/] finalize the format [priority:: high]

## done

- [x] tasks completed can be marked with an 'x'
- [x] the list can be whatever you want, it is **not** necessary to use the same list name.
```

# Rules

1. List should always start with heading 2 (##)
2. Each task should be on its separate line.
3. A task can start with any one of the following
   1. `- [ ] this task starts with a hiffen`
   2. `* [ ] this task starts with an asterisk`
   3. `+ [ ] this task starts with a plus`
4. Attributes should be used **after** the task text.
