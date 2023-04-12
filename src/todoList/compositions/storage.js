import { reactive, toRefs } from "vue";

// Composition API로 만들어진 모듈의 이름은 일반적으로 use를 앞에 붙인다. 이는 Composition API로 만들어진 모듈을 compositions 폴더에 넣는 것과 비슷(강제는 아님)
export const useStorage = () => {
  const KEY = 'my-todo-list';
  const storage_obj = reactive({ storage_id: 0 });

  const loadTodos = (initTodos) => {
    let temp_todos = JSON.parse(localStorage.getItem(KEY) || '[]');
    
    temp_todos.forEach((todo, idx) => {
      todo.id = idx;
    });

    storage_obj.storage_id = temp_todos.length;
    initTodos(temp_todos);
  }

  const saveTodos = (todos) => {
    localStorage.setItem(KEY, JSON.stringify(todos.value));
  }

  return {
    // toRefs(): 반응형 객체를 일반 객체로 변환하고, 변환된 일반 객체의 각 속성은 원본 객체(반응형 객체)의 속성이 ref된 것 입니다. 각 개별 ref는 toRef()를 사용하여 생성됩니다.
    // Vue는 선언적 방식으로 데이터의 변화를 감지하는데, 이를 위해서는 객체가 반응성을 가져야 한다. 이러한 반응성을 주기 위해서 사용하는 것이 reactive 함수다.
    ...toRefs(storage_obj),
    loadTodos,
    saveTodos
  }
}