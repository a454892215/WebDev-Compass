import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import type { Task } from './domain'
export const TaskButton = defineComponent({
  props: { task: { type: Object as PropType<Task>, required: true } },
  emits: { toggle: (id: number) => Number.isInteger(id) && id > 0 },
  setup(props, { emit }) {
    return () =>
      h(
        'button',
        {
          type: 'button',
          'aria-pressed': String(props.task.done),
          onClick: () => emit('toggle', props.task.id),
        },
        `${props.task.done ? '撤销' : '完成'}：${props.task.title}`,
      )
  },
})
