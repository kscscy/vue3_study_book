<template>
  <button v-bind="$attrs" :type="type" :class="classes" ref="button" v-on="type === 'switch' ? { click: onSwitchToggle } : {}">
    <slot></slot>
  </button>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
  props: {
    type: {
      default: 'button',
      validator: (value) => {
        const allowed = ['button', 'submit', 'reset', 'switch'];
        return allowed.includes(value);
      },
    },
    sm: Boolean,
    md: {
      type: Boolean,
      default: true,
    },
    lg: Boolean,
    pill: Boolean,
    active: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const classes = ref([]);
    const button = ref(null);
    const active = ref(props.active);

    if (props.sm) {
      classes.value.push('sm');
    } else if (props.lg) {
      classes.value.push('lg');
    } else {
      classes.value.push('md');
    }

    if (props.pill) {
      classes.value.push('pill');
    }

    const onSwitchToggle = () => {
      active.value = !active.value;
      if (props.type === 'switch') {
        if (!active.value) {
          classes.value.push('deactive');
        } else {
          classes.value = classes.value.filter(ele => ele !== 'deactive');
        }
      }
      context.emit('update:active', active.value);
    }

    onMounted(() => {
      // Non-props
      Object.keys(context.attrs).forEach((attr) => {
        if (attr.startsWith('text-')) {
          button.value.style.color = attr.substring(5);
        }
        if (attr.startsWith('background-')) {
          button.value.style.backgroundColor = attr.substring(11);
        }
      })
    });

    return {
      classes,
      button,
      onSwitchToggle
    }
  },
}
</script>

<style scoped>
button {
  outline: none;
}

.sm {
  height: 20px;
  font-size: 13px;
}

.md {
  height: 30px;
  font-style: 22px;
}

.lg {
  height: 400px;
  font-style: 31px;
}

.pill {
  border-radius: 16px;
}

.deactive {
  filter: brightness(50%);
}
</style>