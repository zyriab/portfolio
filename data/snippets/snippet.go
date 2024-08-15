package datastructure

type Deque[T any] struct {
	items []T
}

func (deque *Deque[T]) GetArray() *[]T {
	return &deque.items
}

func (deque *Deque[T]) PushBack(
	item T) {
	deque.items = append(deque.items, item)
}

func (deque *Deque[T]) PushFront(
	item T) {
	if len(deque.items) == 0 {
		deque.PushBack(item)
		return
	}

	deque.items = append([]T{item}, deque.items...)
}

func (deque *Deque[T]) PopBack() *T {
	if len(deque.items) == 0 {
		return nil
	}

	lastItem := deque.items[len(deque.items)-1]
	deque.items = deque.items[:len(deque.items)-1]

	return &lastItem
}

func (deque *Deque[T]) PopFront() *T {
	if len(deque.items) == 0 {
		return nil
	}

	firstItem := deque.items[0]
	deque.items = deque.items[1:]

	return &firstItem
}

func (deque *Deque[T]) Back() *T {
	if len(deque.items) == 0 {
		return nil
	}

	return &deque.items[len(deque.items)-1]
}

func (deque *Deque[T]) Front() *T {
	if len(deque.items) == 0 {
		return nil
	}

	return &deque.items[0]
}

func (deque *Deque[T]) Clear() {
	deque.items = []T{}
}

func (deque *Deque[T]) Size() int {
	return len(deque.items)
}
